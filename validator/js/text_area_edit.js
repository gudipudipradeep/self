(function () {
	$("#chose_container").hide();
	$("#pencil").click(function (e) {
		e.preventDefault();
		$("#chose_container").show();
		$("#main_container").show();
		$("#chose_container").css({"border":"1px solid black"});
		$("#main_container").css({"border":"1px solid black"});
		$("#main_container").attr("contenteditable","true");
		
	});
	$("#floppy").click(function () {
		$("#main_container").attr("contenteditable","false");
		$("#chose_container").hide();
		$("#chose_container").css({"border":""});
		$("#main_container").css({"border":""});
		$("#main_container").attr("contenteditable","false");
		var edited_text = $( "#main_container" ).html();
		alert(edited_text);
		edited_text = edited_text.replace(/<div>/g, "<p>").replace("</div>", "</p>").replace(/<br>/g, "</p>");
		$( "#main_container").empty();
		$( "#main_container").append(edited_text);		
	});
})();