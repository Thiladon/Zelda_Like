// Variable global :

var x = 0,
	y = 0;

var tilesetpath = "";
var	season_id 	= 1,
	time_id		= 1,
	layout_id	= 1;
var levelEditor = {};
var images = {};

(function() {
	window.onload = function() {
		tilesetpath = "/Zelda/img/leveleditor/tileset/" + document.getElementById("tileset-choice").childNodes[1].childNodes[1].value + ".png";
		
		document.getElementById("third").childNodes[1].childNodes[1].src = tilesetpath;

		var sources = {
			tileset : tilesetpath
		};

		loadImages(sources, function(images)
		{
			console.log(
				"Images are loaded [...]",
				"\n\nStarting Editor Class."
			);

			canvas = document.getElementById('level-editor');
			canvas.width = (14 * 16) + 15;
			canvas.height = (12 * 16) + 13;

			levelEditor = new Editor();
			levelEditor.init(canvas, images.tileset.src);
		});

		function loadImages(sources, callback) {
			var loadedImages = 0;
			var numImages = 0;
			// get num of sources
			for(var src in sources) {
				numImages++;
			}

			for(var src in sources) {
				images[src] = new Image();
				images[src].onload = function() {
					if(++loadedImages >= numImages) {
						callback(images);
					}
				}
				images[src].src = sources[src];
			}
		}
	}
	//$(".input_container div select").
}());

$('#time li a').on("click", function(){
	if(!$(this).hasClass("active"))
	{
		id = this.href;
		i = 0;

		$("#time li a").each(function() {
			i++;
			if(this.href === id)
				time_id = i;
		})
	}
	console.log("time_id : " + time_id);
})

$('#layout li a').on("click", function(){
	if(!$(this).hasClass("active"))
	{
		id = this.href;
		i = 0;

		$("#layout li a").each(function() {
			i++;
			if(this.href === id)
				layout_id = i;
		})
	}
	console.log("layout_id = " + layout_id);
})

$("#seasons div").on("click", function(){
	if(!$(this).hasClass("active"))
	{
		$("#seasons div.active").removeClass("active");
		$(this).addClass("active");
		i = 0;
		$("#seasons div").each(function() {
			i++;
			if($(this).hasClass("active")) {
				season_id = i;
			}
		})
	}
	console.log(season_id);
})

$('#tileset').on("click", function(e){
	x = Math.floor(e.offsetX/16);
	y = Math.floor(e.offsetY/16);

	console.log("Vous êtes à la case : " + x + "," + y);
})
