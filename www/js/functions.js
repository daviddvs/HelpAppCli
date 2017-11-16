/**
 * Functions created to support HelpApp
 * Author: David Franco
 */



/**************************************************************************
 ******************* LOGIN RELATED FUNCTIONS START HERE ********************
 **************************************************************************/


function loginn() {
	
	var loginId = $("#loginId").val();
	var loginVar=JSON.parse(localStorage.getItem(loginId));
	//alert("Name: "+loginVar.name);
	if(loginVar == null) {
		alert("Not a valid login, try to sign up first");
	}
	else {
		loadLogin(loginVar);
	}
	
}


function signup() {
	login.id=$("#signupLoginId").val();
	if(JSON.parse(localStorage.getItem(login.id))==null) {
		login.name=$("#signupName").val();
		//login.gender=$("#gender").val();
		login.gender=$("#gender :radio:checked").val();
		login.country=$("#country").val();
		
		localStorage.setItem(login.id, JSON.stringify(login));// Se guarda un objeto con el nombre login.id y con los campos de login
		
		loadLogin(login);
	}
	else {
		alert("Login ID already exists");
	}

}

function loadLogin(loginVar) {
	$("#login-request").hide();
	$("#logged-view").show();
	$("#popup-signUp").popup("close");
	$("#logged-id").html(loginVar.id);
	$("#logged-name").html(loginVar.name);
	$("#logged-gender").html(loginVar.gender);
	$("#logged-country").html(loginVar.country);

	
}

function logout() {
	$("#login-request").show();
	$("#logged-view").hide();
}
/**************************************************************************
 ******************* TEST RELATED FUNCTIONS START HERE ********************
 **************************************************************************/

function enterField() {
	//var appField=$("#app-field").val();
	var appField = $("#app-field :selected").val();
	
	$(".app-field").text("TEST FIELD: "+appField);
	tests.appField=appField;
	results.appField=appField;
		
	$("#appField").hide();
	$("#form-0").show();
	
	queryQuestionsByField(appField);
		
	//loadPages();
}


function check(i) {
	
	results.answered++;
	
	var answer=$("input[name='radio-choice-"+i+"']:checked").val();//obtiene el valor seleccionado (0,1,2,3)
	
	if(answer==(tests.test[i].answer-1).toString()) {
		alert("CORRECT");
		results.corrects++;
	}
	else {
		alert("WRONG");
	}
	
	uploadSolution(answer,i);
	
	$(".res-1").text(""+results.corrects+"/"+results.answered);
	$(".res-2").text(""+(results.corrects*100/results.answered).toFixed(2)+"%");
	
	$("label[id|='label-radio-choice-"+i+"']").each(
		function(index) {
			if(index!=(tests.test[i].answer-1).toString()) {
				$(this).css("color","red");
			}
			else
				$(this).css({"color":"white","background-color":"green","font-size":"16px"});
		}
	);

	$("#button-test-"+i+"-1").attr("onclick","");
}




function getOwnTimestamp() {
    var currentdate = new Date();
	var datetime =  currentdate.getFullYear() + "/"
    			+ (currentdate.getMonth()+1) + "/"
                + currentdate.getDate() + "@"  
                + currentdate.getHours() + ":"  
                + currentdate.getMinutes() + ":" 
                + currentdate.getSeconds();
	return currentdate;
}


function loadPages() {
	
	page.load(0);
	
	var pageDiv;
	for(var i=1;i<tests.test.length;i++) {
		$("page-test-"+i).remove();
		pageDiv=page.create(i);
		$("body").append(pageDiv);
		page.load(i);
	}
}

function finishTest() {
	
	for(i=1;i<tests.test.length;i++){
		$("#page-test-"+i).remove();
	}
	
	$("#test-content-0").empty();
	$("#test-content-0").append(page.createContentPage0());
	$("#test-content-0").enhanceWithin();
	$.mobile.changePage("#page-test-0");//hay que ir a la pagina "page-test-0"
	
	results.correct=0;
	results.answered=0;
	$(".res-1").empty();
	$(".res-2").empty();
	
}

function shuffleTest(array){
    var array2 = array;
    var length = array.length;
    var newArray = [];
    for(var i = 0; i < length; i++){
      var j = Math.round(Math.random()*(array2.length-1));
      newArray.push(array2[j]);
      array2.splice(j,1);
    }
    return newArray;
  }

/********************* AJAX FUNCTIONS START HERE *************************/

function queryQuestionsByField(appFieldVar) {
	
	$.ajaxSetup({cache:false,contentType: "application/json"});
	$.getJSON(appConstants.requestQuestionsByFieldURL(),//Consultar en el Servidor la calificación
			{appField:appFieldVar},
			function(data,status) {
				if(status=="success"){//Si la HTTP-RESPONSE es OK
					tests.test=shuffleTest(data.questions);
					//alert("Q0: "+tests.test[0].wording);
					//return data.questions;
					loadPages(); //Tengo que llamar desde aqui porque sino no funciona
				}
				else {
					alert("NO RESPONSE FROM SERVER");
				}
			}
		)
		.fail(function(){//Esto se ejecuta cuando no existe en el servidor el field, que traducido a JS es cuando jetJSON tiene un fallo porque recibe un objeto que no es JSON
			alert("Not a valid field");
			$("#appField").show();
			$("#form-0").hide();
			$(".app-field").empty();
		});
}

function uploadSolution(answer,i) {
	
	solution.question=tests.test[i].idQuestion;
	
	if(answer=="0")
		solution.score=tests.test[i].weight1;
	if(answer=="1")
		solution.score=tests.test[i].weight2;
	if(answer=="2")
		solution.score=tests.test[i].weight3;
	if(answer=="3")
		solution.score=tests.test[i].weight4;
	
	solution.date=getOwnTimestamp();
	
	//$.ajaxSetup({cache:false,contentType: "application/json"});
	$.post(appConstants.uploadSolutionURL(),//Enviar al Servidor el objeto solution
			JSON.stringify(solution),
			function(data,status) {
				if(status=="success") {
					alert("Server: "+data);
				}
				else {
					alert("NO RESPONSE FROM SERVER");
				}			
			},
			"text" //la rpta del servidor se recibe en formato texto
		);

}
/**************************************************************************
 ******************* AUDIO RECORD FUNCTIONS START HERE ********************
 **************************************************************************/

function startAudioRecord(i) {
	$("#fileName-"+i+"-1").text("");	
	$("#audio-"+i+"-1").hide();
	$("#button-record-1").addClass("ui-disabled");
	$("#records-search").addClass("ui-disabled");
	audio.doStartRecord();
	$("#button-record-2").removeClass("ui-disabled");
	$("#speak-text").show();
}

function stopAudioRecord(i) {
	$("#button-record-1").blur();
	var fileFolder=appConstants.localPermanentStorageFolderAudio();
	var fileName=$("#record-name").val()+".3gp";
	audio.doStopRecordAsync(
		fileFolder,
		fileName,
		function() {
    		alert("Audio saved in:"+fileFolder+fileName);
			//$("#button-"+i+"-1-2").blur();    		
    		//$("#button-record-1").removeClass("ui-disabled");
    		//$("#button-record-2").addClass("ui-disabled");			
		}
	);
	$("#button-record-2").blur();
	$("#speak-text").hide();
	$("#button-record-1").removeClass("ui-disabled");
	$("#records-search").removeClass("ui-disabled");
	$("#button-record-2").addClass("ui-disabled");
	
}

/**
 * This function will extract all entries from a given path
 */
function listAudioPath(myPath){
  window.resolveLocalFileSystemURL(myPath, function (dirEntry) {
       var directoryReader = dirEntry.createReader();
       directoryReader.readEntries(onSuccessCallback,onFailCallback);
  });

  function onSuccessCallback(entries) {
	  $("#record-listview").empty();
	  $("#record-popup").empty();
      for (i=0; i<entries.length; i++) {
          var row = entries[i];
          /*if(row.isDirectory) {
              // We will draw the content of the clicked folder
        	  html = '<li onclick="listPath(' + "'" + row.nativeURL + "'" + ');">' + row.name + '</li>';
        	  $("#record-list").append(html);        	  
          }
          else {
        	  // alert the path of file
          html = '<audio id="audio-' +i+ '" ' + 'controls="controls"><source id="audioSrc-' +i+ '" ' + 'src="' +row.nativeURL+ '"/></audio>';
          $("#record-play").append(html);  */        
          href = 
        	  '<a href="#popupPlay-'+i+'" data-rel="popup" data-position-to="window"><strong>' +row.name+ '</strong></a>';
          popup = 
        	  '<div data-role="popup" id="popupPlay-' +i+ '">'+
        	  	'<form>'+
        	  	'<audio id="audio-' +i+ '" controls="controls">'+
				'<source id="audioSrc-' +i+ '" src="' +row.nativeURL+ '"/>'+
				'</audio>'+
				'</form>'+
			  '</div>';
          
          li = 
        	  '<li>' + href + '</li>' + popup;
          
          $("#record-listview").append(li);
          //}
      }
      $("#record-content").enhanceWithin();
      $("#record-listview").listview("refresh");
      
}

  function onFailCallback(e){
    console.error(e);
    // In case of error
  }
}

function getFilepath(thefilepath){
        alert(thefilepath);
}

/**************************************************************************
 ******************* GOOGLE MAPS FUNCTIONS START HERE *********************
 **************************************************************************/

function startMaps(location) {
	//var lat="40.765819";
	//var lon="-73.97586";
	//var url_map = "http://maps.google.com/maps?saddr=-33.9417, 150.9473&daddr=-33.92050, 151.04287&dirflg=d";
	//var url_map_dir = "https://www.google.com/maps/dir/?api=1&origin=Santurtzi&destination=Barakaldo";
	//var url_map_dir = "https://www.google.com/maps/dir/?api=1&destination=Barakaldo";
	//var url_map_dir3 = "https://www.google.com/maps/dir/?api=1&destination=hospitales";
	//var url_map_search = "https://www.google.com/maps/search/?api=1&query=hospitales";
	//window.location = "comgooglemaps://?center=40.765819,-73.975866";
	//window.location = "geo:"; //40.765819,-73.975866";
	if(location == "search") {
		alert("Open Maps");
		var url_map = "http://www.google.com/maps/search/?api=1";
	}
	else {
		alert("Find route to "+location);
		var url_map = "http://www.google.com/maps/dir/?api=1&destination="+location;
	}
	cordova.InAppBrowser.open(url_map, "_system", "location=yes");
}

