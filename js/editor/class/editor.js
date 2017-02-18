var req = "",
	debug = 0;

/**
 *
 *		@_Class : Editor
 *
 **/

function Editor() {}

/**
 *
 * 		@_Class : Editor.
 * 		@_Type : function.
 *		@_Description : Défini la function d'animation à utilisé en fonction du navigateur.
 *
 **/

Editor.prototype._onEachFrame = (function() {
	var requestAnimationFrame = window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame;

	if (requestAnimationFrame) {
		return function(cb) {
			var _cb = function() { cb(); requestAnimationFrame(_cb); }
			_cb();
		};
	} else {
		return function(cb) {
			setInterval(cb, 1000 / this.fps);
		}
	}
})();

/**
 *
 * 		@_Class : Editor.
 * 		@_Type : function().
 *			@_param canvas object : Contexte du Canvas,
 *			@_param tileset img : Chemin relatif de l'image servant au graphisme de l'éditeur.
 *		
 *		@_Description : Initialise la classe Editor.
 *			@_param fps int : Determine la vitesse d'affichage propre à la classe.
 *			@_param tileHeight int : 
 *			@_param tileWidth int : 
 *			@_param width int : 
 *			@_param height int : 
 *			@_param undo array : 
 *			@_param redo array : 
 *			@_param ctx CanvasRenderingContext2D 
 *
 **/

Editor.prototype.init = function (canvas, tileset) {
	var $this 		= this;
	this.fps 		= 60;
	this.tileHeight = 16;
	this.tileWidth	= 16;
	this.width 		= 14;
	this.height 	= 12;
	this.undo		= [[[[],[]],[[],[]],[[],[]],[[],[]]],[[[],[]],[[],[]],[[],[]],[[],[]]]];
	this.redo		= [[[[],[]],[[],[]],[[],[]],[[],[]]],[[[],[]],[[],[]],[[],[]],[[],[]]]];


	this.ctx 		= canvas.getContext("2d");
	this.tileset 	= new Image();
	this.tileset.src = tileset;
	document.getElementById("level-editor").onclick = function(e){

		$this.x = Math.floor(e.offsetX/17);
		$this.y = Math.floor(e.offsetY/17);

		$this.clickedTile();
	}

	document.getElementById("create_map").onclick = function(){
		$this.verify(function(){
			console.log("Fichiers identiques");
		}, function(){
			console.log("Fichiers différents");
		});
	}

	document.getElementById("rename").onclick = function() {

	}

	// load file depending of cases name in editor.html.

	loadJSON("/Zelda/js/editor/maps/" + document.getElementById("file_name").value + ".json", this, function($this, data) {
		$this.data = data;
		// On lance l'instance.
			$this._onEachFrame($this.run($this));
	})
}

Editor.prototype.run = function($this)
{
	loops = 0, skipTicks = 1000 / this.fps,

	maxFrameSkip = 10,
	nextGameTick = (new Date).getTime();

	return function()
	{
		loops = 0;

		while ((new Date).getTime() > nextGameTick)
		{
			$this.update($this);
			// console.log("editor.update()");
			
			loops++;
			nextGameTick += skipTicks;
		}


		if(loops)
			$this.draw(); // Mise a jour des statistiques visuelles.
	}
}

Editor.prototype.update = function($this)
{
	// console.log($this);
}

Editor.prototype.draw = function()
{
	// clear the screen	

	this.ctx.fillStyle = '#000000';
	this.ctx.fillRect(0, 0, canvas.width, canvas.height);

	for(var x = 0; x < 14; x++)
	{
		for(var y=0; y < 12; y++)
		{	
			if(layout_id - 1 === 1)
			{
				// On rajoute les cases si y'a des events.
			}
			
			this.drawTile(this.data.map[time_id - 1][season_id - 1][0][y][x][0], x, y);
		}
	}
}

Editor.prototype.drawTile = function($case_x, x, y) {

	$case_y = 0;

	while($case_x >= 16){
		$case_x += -16;
		$case_y++;
	}

	this.ctx.drawImage(this.tileset,
		$case_x*this.tileWidth, $case_y*this.tileHeight,
		this.tileWidth, this.tileHeight,
		(x*this.tileWidth) + (x + 1) , (y*this.tileHeight) + (y + 1),
		this.tileWidth, this.tileHeight
	);
}

Editor.prototype.clickedTile = function() {
	if(layout_id - 1 === 0 && this.data.map[time_id - 1][season_id - 1][layout_id - 1][this.y][this.x][0] != x + (y*16))
	{
		this.addToUndo();

		this.data.map[time_id - 1][season_id - 1][layout_id - 1][this.y][this.x][0] = x + (y*16);
	}
}

Editor.prototype.addToUndo = function() {
	var _tempObject = {
		"value" : this.data.map[time_id - 1][season_id - 1][layout_id - 1][this.y][this.x][0],
		"x" : this.x,
		"y" : this.y
	}

	this.undo[time_id - 1][season_id - 1][layout_id - 1].push(_tempObject);
}

Editor.prototype.verify = function(success, error) {
	if(document.getElementById("file_name").value + ".json" != "new.json")
	{
		loadJSON("/Zelda/js/editor/maps/" + document.getElementById("file_name").value + ".json", this, function($this, data){
			console.log("yep");

			if(JSON.stringify(data) === JSON.stringify($this.data)) {
				if(success)
					return success();
			} else {
				if(error)
					return error();
			}

		}, function(xhr){
			console.log("Error " + xhr.status);
			console.log("Ici faudra demander si on veut enregistrez avant de create");
			$('#saveFile').modal('open');
		});
	} else {
		console.log("new.json");
	}
}

Editor.prototype.create = function(){
	console.log("I'm called");
}

function loadJSON(path, $this, success, error)
{
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function()
    {
        if (xhr.readyState === XMLHttpRequest.DONE) {
            if (xhr.status === 200) {
                if (success)
                    success($this, JSON.parse(xhr.responseText));
            } else {
                if (error)
                    error(xhr);
            }
        }
    };
    xhr.open("GET", path, true);
    xhr.send();
}