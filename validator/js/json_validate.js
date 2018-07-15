(function () {
$( "#json_validate_status" ).hide();
$('#side_nav').toggle(
function() {
  $('#body_node').css('left', '0');
},
function() {
  $('#body_node').css('left', '200px');
});
$("#json_btn_validate").click(function(){
	$( "#json_validate_status" ).hide();
	try {
	  	var json_obj = JSON.parse($('textarea#json_validate').val());
	  	$( "#json_validate_status" ).html( "JSON Validated Successfully!" );
	  	$( "#json_validate_status" ).show();
	}
	catch (err) {
		$( "#json_validate_status" ).html( err.toString() );
		$( "#json_validate_status" ).show();
		alert(err);
	}
});
$("#json_btn_format").click(function(){
	$( "#json_validate_status" ).hide();
	var format_obj = JSON.parse($('textarea#json_validate').val());
	$("textarea#json_validate").val(JSON.stringify(format_obj, null, 4));
});
$("#yaml_textarea").click(function(){
	$("#validator_name").html( "Validate YAML" );
});
$("#json_textarea").click(function(){
	$("#validator_name").html( "Validate Json" );
});

})();