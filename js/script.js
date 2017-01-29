window.onload = function()
{

	// La page html est chargée.
	// Partie Ajax, scroll horizontal d'un panel info sur le jeu.

	var sources = {};

	// Chargements des images sources relatives aux jeu et appel Callback du jeu.

	loadImages(sources, function(images)
	{
		var zelda = new Game();
	});
}

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