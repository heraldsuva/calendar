"use strict"; //enforce variable declarations - safer coding

//Makes sure the document is ready before executing scripts
jQuery(function($){
	// A quick check to make sure the script loaded properly
	// console.log("init.js loaded successfully.");

	var processFile = "assets/inc/ajax.inc.php";

	//Functions to manipulate the modal window
	var fx = {
		// Checks for a modal window and returns it, or else creates a new one and returns that
		"initModal": function(){
			// If no elements are matched, the length property will return 0
			if($(".modal-window").length == 0){
				//Creates a div, adds a class, and appends it to the body tag
				return $("<div>").hide().addClass("modal-window").appendTo("body");
			}
			else{
				// Returns the modal window if one already exists in the DOM
				return $(".modal-window");
			}
		},
		// Fades out the window and removes it from the DOM
		"boxout" : function(event){
			// If an event was triggered by the element that called this function, prevents the default action from firing
			if( event != undefined ){
				event.preventDefault();
			}

			//Removes he active class from all the links
			$("a").removeClass("active");

			//Fades out the modal window, then removes it from the DOM entirely
			$(".modal-window, .modal-overlay")
				.fadeOut("slow", function(){
					$(this).remove();
				}
			);
		},
		// Adds the window to the markup and fades it in
		"boxin" : function(data, modal) {
			// Creates an overlay for the site, adds a class and a click event handler, then appends it to the body element
			$("<div>")
				.hide()
				.addClass("modal-overlay")
				.click(function(event){
					fx.boxout(event);
				})
				.appendTo("body");

			//Loads data into the modal window and appends it to the body element
			modal
				.hide()
				.append(data)
				.appendTo("body");


			//Fades in the modal window and overlay
			$(".modal-window, .modal-overlay").fadeIn("slow");

		}
	};

	// Pulls up events ina modal window
	$("body").on("click", "li > a", function(event){
		// Stops the link from loading view.php
		event.preventDefault();

		// Adds an "active" class to the link
		$(this).addClass('active');

		// Gets the query string from the link href
		var data = $(this).attr("href").replace(/.+?\?(.*)$/, "$1");

		// Checks if the modal window exists and selects it, or creates a new one
		var modal = fx.initModal();

		// Creates a button to close the window
		$("<a>")
			.attr("href", "#")
			.addClass("modal-close-btn")
			.html("&times;")
			.click(function(event){
				fx.boxout(event);
			})
			.appendTo(modal);
		
		// Loads the event data from the DB
		$.ajax({
			type: "POST",
			url: processFile,
			data: "action=event_view&" + data,
			success: function(data){
				fx.boxin(data, modal);
			},
			error: function(msg){
				modal.append(msg);
			}
		});
	});

	$("body").on("click", '.admin', function(event){
		event.preventDefault();
		// console.log("add new event!");

		// Loads the action for the processing file
		var action = "edit_event";

		//Loads the editing form and display it
		$.ajax({
			type: "POST",
			url: processFile,
			data: "action="+action,
			success: function(data){
				//Hides the form
				var form = $(data).hide();

				//makes sure the modal window exists
				modal = fx.initModal();

				fx.boxin(null, modal);

				form
					.appendTo(modal)					
					.addClass("edit-form")
					.fadeIn("slow");
			},
			error: function(msg){
				alert(msg);
			}
		});
	});
})