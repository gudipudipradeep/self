(function () {
	//
	$("#json_validate_status,#file_upload_status").hide();
	$( "#json_validate_status" ).removeClass("alert-danger").removeClass("alert-success");
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
		  	$( "#json_validate_status" ).removeClass("alert-danger").addClass("alert-success");
		  	$( "#json_validate_status" ).html( "JSON Validated Successfully!" );
		  	$( "#json_validate_status" ).show();
		}
		catch (err) {
			var error = err.toString();
			var error_line_number = Number(error.match(/\d+/)[0]);
			var error_line_details = "";
			var lines = $('textarea#json_validate').val().split('\n');
			error_line_dec = error_line_number - Number(3);
			error_line_inc = error_line_number;
			while (error_line_dec < lines.length) {
				error_line_details = error_line_details + lines[error_line_dec]+"<br/>"
				error_line_dec =error_line_dec + 1;
				if(error_line_dec == error_line_inc){
					break;
				}
			}
			$( "#json_validate_status" ).html( err.toString()+"<br/>"+error_line_details );
			$( "#json_validate_status" ).addClass( "alert-danger" );
			$( "#json_validate_status" ).show();
		}
	});
	$("#json_btn_format").click(function(){
		$("#json_btn_validate").click();
		$( "#json_validate_status" ).hide();
		var format_obj = JSON.parse($('textarea#json_validate').val());
		$("textarea#json_validate").val(JSON.stringify(format_obj, null, 4));
	});
	$("#json_btn_minify").click(function(){
		$("#json_btn_validate").click();
		$( "#json_validate_status" ).hide();
		var format_obj = JSON.parse($('textarea#json_validate').val());
		$("textarea#json_validate").val(JSON.stringify(format_obj));
	});
	$("#json_textarea").click(function(){
		$("#validator_name").html( "Validate Json" );
	});
	$("#yaml_btn_validate").click(function(){
		var yaml_data = $('textarea#yaml_validate').val();
		$.ajax({
			  type: 'POST',
			  url: "/yamlvalidate",
			  data: jQuery.param({"yaml_text": yaml_data}),
		        success: function (data) {
		        	if(data.hasOwnProperty("success")){
		    		  	$( "#yaml_validate_status" ).removeClass("alert-danger").addClass("alert-success");
		    		  	$( "#yaml_validate_status" ).html( "YAML Validated Successfully!" );
		    		  	$( "#yaml_validate_status" ).show();
		    		  }
		        	if(data.hasOwnProperty("failure")){
		        		var error = data["failure"];
		        		var error_line_number = Number(error.match(/\d+/)[0]);
		        		var error_line_details = "";
		        		var lines = $('textarea#yaml_validate').val().split('\n');
		    			error_line_dec = error_line_number - Number(2);
		    			error_line_inc = error_line_number;
		    			while (error_line_dec < lines.length) {
		    				error_line_details = error_line_details + lines[error_line_dec]+"<br/>"
		    				error_line_dec =error_line_dec + 1;
		    				if(error_line_dec == error_line_inc){
		    					break;
		    				}
		    			}
		    			$( "#yaml_validate_status" ).html("YAML Validated ERROR: <br/>"+error_line_details );
		    			$( "#yaml_validate_status" ).addClass( "alert-danger" );
		    			$( "#yaml_validate_status" ).show();
		        	}
		        },
		        error: function(e) { 
		        	alert("Status: " + e.responseText);
		        },
		        cache: false,
		        contentType: false,
		        processData: false,
			});
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
	        url: '/upload',
	        type: 'POST',
	        enctype: 'multipart/form-data',
	        xhr: function() {
	            var myXhr = $.ajaxSettings.xhr();
	            return myXhr;
	        },
	        success: function (data) {
//	            alert(window.location.hostname+data["Hashcode"]);
//	            alert(JSON.stringify(data));
	            $("#remove_a").remove();
	            $("#file_upload_status").show();
	            $("#file_upload_status").append("<b id = \"remove_a\"> You can access you are files using this link:  <a href="+data["Hashcode"]+">"+window.location.hostname+data["Hashcode"]+"</a></b>");
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

	//cert generate uploading js
	var certgenerate = document.getElementById('cert_convert');
	certgenerate.addEventListener('submit', function (evnt) {
		
	  	evnt.preventDefault();
	  	var form = $("#cert_convert")[0];
	  	var formData = new FormData(form);
	  	
		var single_file = document.getElementById('single_file');
		
		if ((single_file.files.length > 0)) {
			console.log("Files are selected");
		}else{
			alert("please select file before upload");
			return false;
		}
		

	
	    $.ajax({
	        url: '/upload',
	        type: 'POST',
	        enctype: 'multipart/form-data',
	        xhr: function() {
	            var myXhr = $.ajaxSettings.xhr();
	            return myXhr;
	        },
	        success: function (data) {
//	            alert(window.location.hostname+data["Hashcode"]);
//	            alert(JSON.stringify(data));
	            $("#remove_a").remove();
	            $("#file_upload_status").show();
	            $("#file_upload_status").append("<b id = \"remove_a\"> You can access you are files using this link:  <a href="+data["Hashcode"]+">"+window.location.hostname+data["Hashcode"]+"</a></b>");
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
	    return false;
	});
  
})();