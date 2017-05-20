$(document).ready(function() {

	var searchIcons = ['Family Guy','South Park','Rick and Morty','The Simpsons','Archer','Animaniacs','King of the Hill', 'Adventure Time']

	for (var i=0; i < searchIcons.length; i++) {
		
		var searchClick = searchIcons[i];
		var button = $("<button>");
		button.text(searchClick)
		      .attr("class", "btn btn-primary search")
		      .attr("data-search", searchClick)
		$("#buttonRender").append(button);
	}

	});

	$("#search-button").on("click", function() {

		initialSearch();
			
	});

	$("body").on("click",".search", function() {
		var searchClick = $(this).attr("data-search");
		giphySearch (searchClick);
	});


	$(document).keypress(function(e) {

		if(e.which == 10) {

			initialSearch();
		}
	});

	function initialSearch (searchParam) {

		var searchClick = searchParam || $("#search-param").val().trim();

		    var button = $("<button>");

		    button.text(searchClick)
		        .attr("class", "btn btn-primary search")
		        .attr("data-search", searchClick);

		    $("#buttonRender").append(button);
		 
		    giphySearch(searchClick);
	}

function giphySearch (searchID) {
    
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + searchID + "&api_key=dc6zaTOxFJmzC"
  
    $.ajax({
        url: queryURL,
        method: "GET"
    })

    .done(function(response) {

    $("#images").empty();

    for (var i = 0; i < 10; i++) {
    
      	var gifURL = response.data[i].images.fixed_height.url;
      	var stillURL = response.data[i].images.fixed_height_still.url;
      	var gifRating = response.data[i].rating;
      	var cartoonImage = $("<img>");
      	var imageHolder = $("<div>"); 
      	var ratingHolder = $("<p>");

      	ratingHolder.text("Rating: " + gifRating);
      
      	cartoonImage.attr("src", stillURL)
      				.attr("alt", "cartoon image")
      				.attr("class","cartoon-gif")
      				.attr("data-still",stillURL)
      				.attr("data-animate",gifURL)
      				.attr("data-state",'still');

    	imageHolder.attr("class","thumbnail")
      			   .append(cartoonImage)
      	           .append(ratingHolder);

    
        $("#images").prepend(imageHolder);
    }
  });
}

    $("body").on("click",".cartoon-gif" , function() {
     
    	var currentState = $(this).attr("data-state");
      	var animated = $(this).attr("data-animate");
      	var stilled = $(this).attr("data-still");
     
        if (currentState == 'still') {
            $(this).attr("data-state","animate");
            $(this).attr("src",animated);
        }
        else {
            $(this).attr("data-state","still");
            $(this).attr("src",stilled);
        }
});












