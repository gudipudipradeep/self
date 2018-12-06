(function () {
	$(".pencil").click(function (e) {
		var edit_current_post = $(this).parent().parent();
		edit_current_post.find(".edit_tools").show();
		edit_current_post.find(".note-editable").attr("contenteditable","true");
	});
	
	$(".floppy").click(function () {
		var edit_current_post = $(this).parent().parent();
		edit_current_post.find(".edit_tools").hide();
		edit_current_post.find(".note-editable").attr("contenteditable","flase");
		var data_article =  $(".note-editable").html();
	});
	$(".edit_tools").hide();
	$(".note-editable").attr("contenteditable","flase");
	
	$("#savehtml").click(function(){
		var url_name_file_name =  $("#url_name_file_name").val();
		var data_article =  $(".note-editable").html()
		var title =  $("#title").val()
		var description =  $("#description").val()
		var keywords =  $("#keywords").val()
		
		
		var save_request = $.ajax({
			  url: "/create-article",
			  method: "POST",
			  data: { "url_name" : url_name_file_name, "article_data": data_article, "title": title, "description": description, "keywords": keywords }
			});
			 
		save_request.done(function( msg ) {
		  $( "#log" ).html( msg );
		});
		 
		save_request.fail(function( jqXHR, textStatus ) {
		  alert( "Request failed: " + textStatus );
		});
		
	});
	
})();