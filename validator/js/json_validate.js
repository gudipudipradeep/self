(function () {

// File Upload Code Changes
	var fileList = [];
	var input = document.getElementById('files');
	var single_file = document.getElementById('single_file');
	
	var table = document.getElementById("file_content_details");
	//folder upload
	input.onchange = function(e) {
	  var files = e.target.files; // FileList
	    for (var i = 0, f; f = files[i]; ++i){
	        console.debug(files[i].webkitRelativePath);
	        var row = table.insertRow(-1);
	        var cell1 = row.insertCell(0);
	        var cell2 = row.insertCell(1);

	        // Row With Data
	        cell1.innerHTML = files[i].webkitRelativePath;
	        cell2.innerHTML = files[i].size
	        
	        //append the file list
	        fileList.push(files[i]);
	        
	    }
	}
	//single file upload
	single_file.onchange = function(e) {
		var files = e.target.files; // FileList
	    for (var i = 0, f; f = files[i]; ++i){
	    	console.debug(files[i].name);
	        var row = table.insertRow(-1);
	        var cell1 = row.insertCell(0);
	        var cell2 = row.insertCell(1);

	        // Row With Data
	        cell1.innerHTML = files[i].name;
	        cell2.innerHTML = files[i].size
	        // Appending file information
	        fileList.push(files[i]);
	    }
	}
	
var control = $("#control");

$("#clear").click(function () {
	$("#file_content_details").find("tr:not(:first)").remove();
	$('#files').val("");
	fileList = []
});

//
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

//file uploading js
var fileCatcher = document.getElementById('file-catcher');
fileCatcher.addEventListener('submit', function (evnt) {
  	evnt.preventDefault();
    var formData = new FormData($(this).parents('form')[0]);

    $.ajax({
        url: 'http://localhost:8000/',
        type: 'GET',
        xhr: function() {
            var myXhr = $.ajaxSettings.xhr();
            return myXhr;
        },
        success: function (data) {
            alert("Data Uploaded: "+data);
        },
        error: function(XMLHttpRequest, textStatus, errorThrown) { 
            alert("Status: " + XMLHttpRequest);
        },
        data: formData,
        cache: false,
        contentType: false,
        processData: false
    });
    return false;
});
  
})();