(function () {
	$("#pencil").click(function (e) {
		$("#edit_tools").show();
		$(".note-editable").attr("contenteditable","true");
	});
	
	$("#floppy").click(function () {
		$("#edit_tools").hide();
		$(".note-editable").attr("contenteditable","flase");
	});
	$("#edit_tools").hide();
	$(".note-editable").attr("contenteditable","flase");
	$("#savehtml").click(function () {
		alert($(".note-editable").html());
	});
})();