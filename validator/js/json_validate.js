(function () {
	//
	$("#json_validate_status,#file_upload_status").hide();
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
		$("#file_upload_status").hide();
		$("#file_content_details").find("tr:not(:first)").remove();
		$('#files').val("");
		fileList = []
	});
	

	//file uploading js
	var fileCatcher = document.getElementById('file-catcher');
	fileCatcher.addEventListener('submit', function (evnt) {
		
	  	evnt.preventDefault();
	  	var form = $("#file-catcher")[0];
	  	var formData = new FormData(form);
	  	
		var input = document.getElementById('files');
		var single_file = document.getElementById('single_file');
		
		if ((input.files.length > 0) || (single_file.files.length > 0)) {
			console.log("Files are selected");
		}else{
			alert("please select file before upload");
			return false;
		}
		

	
	    $.ajax({
	        url: 'http://127.0.0.1:8080/upload',
	        type: 'POST',
	        enctype: 'multipart/form-data',
	        xhr: function() {
	            var myXhr = $.ajaxSettings.xhr();
	            return myXhr;
	        },
	        success: function (data) {
	            alert("Data Uploaded: "+data);
	            alert(window.location.hostname+data["Hashcode"])
	            alert(JSON.stringify(data))
	            $("#file_upload_status").show();
	            $("#file_upload_status").append("You can access you are files using this link:  <a href="+data["Hashcode"]+">"+window.location.hostname+data["Hashcode"]+"</a>");
	        },
	        error: function(e) { 
	            alert("Status: " + e.responseText);
	        },
	        data: formData,
	        cache: false,
	        contentType: false,
	        processData: false,
	        timeout: 600000,
	    });
	    
	    $('#single_file').val("");
		$('#files').val("");
	    return false;
	});

  
})();