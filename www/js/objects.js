/**
 * Objects created to support HelpApp
 * Author: David Franco
 */


var appConstants = {
	localPermanentStorageFolder: "/sdcard/eus.ehu.HelpApp/",
	serverURL: "http://u017633.ehu.eus:28080/HelpApp/",//PUBLIC
//	serverURL: "http://158.227.64.57:8080/HelpApp/",//EHU PUBLIC
//	serverURL: "http://10.107.18.188:8080/HelpApp/",//EHU WIFI
//	serverURL: "http://192.168.1.97:8080/HelpApp/",//home
	
	localPermanentStorageFolderAudio: function () {
		return this.localPermanentStorageFolder+"audio/";
	},
	requestQuestionsURL: function() {
	return this.serverURL+"rest/School/requestQuestions";
	},
	requestQuestionsByFieldURL: function() {
		return this.serverURL+"rest/School/requestQuestionsByAppField";
	},
	uploadSolutionURL: function() {
		return this.serverURL+"rest/School/uploadSolution";
	}
};


/**************************************************************************
 ******************* LOGIN RELATED OBJECTS START HERE *********************
 **************************************************************************/

// NO LO PONGO AQUI PORQUE SINO DESDE FUNCTIONS NO LO RECONOCE COMO OBJETO GLOBAL
var login = {
		id:null,
		name:"",
		gender:"",
		country:""
		
};


/**************************************************************************
 ******************* TEST RELATED OBJECTS START HERE **********************
 **************************************************************************/

var results = {
	appField: null,
	corrects: 0,
	answered: 0
};

var tests = {
		appField: null,
		total: 0,
		test: []
	};

var results = {
		login: null,
		corrects: 0,
		answered: 0
	};

var page = {
		
		createContentPage0: function() {
			var contentDiv=
				'<div id="appField" class="ui-field-contain ui-hide-label" style="margin:5px 5%;">'+
					//'<label for="text-1">Test Field:</label>'+
					//'<input name="text-1" id="app-field" data-clear-btn="true" value="" type="text" placeholder="Enter the test field" />'+
					'<div class="ui-field-contain">'+
					'<label for="app-field">Test Field:</label>'+
					'<select name="select-1" id="app-field" data-inline="true">'+
						'<option value="Geography" selected="selected">Geography</option>'+
						'<option value="Food">Food</option>'+
						'<option value="General">General</option>'+
					'</select>'+
				'</div>'+
					'<a href="" id="button-1" class="ui-btn ui-btn-inline ui-corner-all"	onclick="enterField()" >Start Test</a>'+
				'</div>'+
				'<h3 class="app-field"></h3>'+
				'<form id="form-0" style="display:none">'+
					'<fieldset data-role="controlgroup" data-iconpos="right">'+
					'<legend id="question-0"></legend>'+
					'<input name="radio-choice-0" id="radio-choice-0a" data-mini="true" value="0" type="radio"/>'+
					'<label for="radio-choice-0a" id="label-radio-choice-0-0"></label>'+
					'<input name="radio-choice-0" id="radio-choice-0b" data-mini="true" value="1" type="radio"/>'+
					'<label for="radio-choice-0b" id="label-radio-choice-0-1"></label>'+
					'<input name="radio-choice-0" id="radio-choice-0c" data-mini="true" value="2" type="radio"/>'+
					'<label for="radio-choice-0c" id="label-radio-choice-0-2"></label>'+
					'<input name="radio-choice-0" id="radio-choice-0d" data-mini="true" value="3" type="radio"/>'+
					'<label for="radio-choice-0d" id="label-radio-choice-0-3"></label>'+
					'</fieldset>'+
					'<div style="text-align:center;">'+
						'<a href="" id="button-test-0-1" class="ui-btn ui-btn-inline ui-corner-all" onclick="check(0)">CHECK</a>'+
						'<a href="" id="button-test-0-2" class="ui-btn ui-btn-inline ui-corner-all" style="display:none;" onclick="finishTest()">FINISH</a>'+						
					'</div>'+
				'</form>';
			return contentDiv;
		},
		
		create: function(i) {
			var pageDiv=$('<div data-role="page" id="page-test-'+i+'"></div>');
			var headerDiv=
				'<div data-role="header" data-position="fixed" >'+
					'<h1 style="margin-left:0;margin-right:0;white-space: nowrap;overflow: visible;">Test</h1>'+
				'</div>';
			
			var contentDiv=
				'<div data-role="content">'+
					'<h3 class="app-field"></h3>'+
					'<form id="form-'+i+'">'+
						'<fieldset data-role="controlgroup" data-iconpos="right">'+
						'<legend id="question-'+i+'"></legend>'+
						'<input name="radio-choice-'+i+'" id="radio-choice-'+i+'a" data-mini="true" value="0" type="radio"/>'+
						'<label for="radio-choice-'+i+'a" id="label-radio-choice-'+i+'-0"></label>'+
						'<input name="radio-choice-'+i+'" id="radio-choice-'+i+'b" data-mini="true" value="1" type="radio"/>'+
						'<label for="radio-choice-'+i+'b" id="label-radio-choice-'+i+'-1"></label>'+
						'<input name="radio-choice-'+i+'" id="radio-choice-'+i+'c" data-mini="true" value="2" type="radio"/>'+
						'<label for="radio-choice-'+i+'c" id="label-radio-choice-'+i+'-2"></label>'+
						'<input name="radio-choice-'+i+'" id="radio-choice-'+i+'d" data-mini="true" value="3" type="radio"/>'+
						'<label for="radio-choice-'+i+'d" id="label-radio-choice-'+i+'-3"></label>'+
						'</fieldset>'+
						'<div style="text-align:center;">'+
							'<a href="" id="button-test-'+i+'-1" class="ui-btn ui-btn-inline ui-corner-all" onclick="check('+i+')">CHECK</a>'+
							'<a href="" id="button-test-'+i+'-2" class="ui-btn ui-btn-inline ui-corner-all" style="display:none;" onclick="finishTest()">FINISH</a>'+						
						'</div>'+
					'</form>'+
				'</div>';
			
			var footerDiv=
				'<div data-role="footer" data-position="fixed">'+
					'<div class="ui-grid-b" style="width:80%; text-align:center; font-weight:normal;">'+
						'<div class="ui-block-a">RESULTS: </div>'+
						'<div class="ui-block-b res-1" id="res-'+i+'-1"></div>'+
						'<div class="ui-block-c res-2" id="res-'+i+'-2"></div>'+
					'</div>'+
					'<div class="ui-grid-a">'+
						'<div class="ui-block-a" align="left">'+
							'<a href="#" id="prev-test-'+i+'" class="ui-btn ui-mini ui-corner-all ui-icon-arrow-l ui-btn-icon-left" data-transition="turn">Prev</a>'+
							'<a href="#" id="next-test-'+i+'" class="ui-btn ui-mini ui-corner-all ui-icon-arrow-r ui-btn-icon-left" data-transition="turn">Next</a>'+
						'</div>'+
						'<div class="ui-block-b" align="right">'+
							'<img border="0" width="32px" src="img/HelpApp3.png"/>'+
						'</div>'+
					'</div>'+
				'</div>';
			
			pageDiv.append(headerDiv,contentDiv,footerDiv);
			
			return pageDiv;
		},
	 	
		load: function(i){
			
			//alert("load2: ");
			$(".app-field").text("TEST FIELD: "+tests.appField);
			$("#question-"+i).text("QUESTION "+i+": "+tests.test[i].wording);
			
			$("label[id='label-radio-choice-"+i+"-0'").text(tests.test[i].opt1);
			$("label[id='label-radio-choice-"+i+"-1'").text(tests.test[i].opt2);
			$("label[id='label-radio-choice-"+i+"-2'").text(tests.test[i].opt3);
			$("label[id='label-radio-choice-"+i+"-3'").text(tests.test[i].opt4);
			
			if(i!=0)
	     		$("#prev-test-"+i).attr("href","#page-test-"+(i-1));
	     	$("#next-test-"+i).attr("href","#page-test-"+(i+1));
	     	if(i==(tests.test.length-1)){
	     		$("#button-test-"+i+"-2").show();
	     	}
			
		}
	};

var solution = {
		question: 0,
		score: 0,
		date: ""
	
};

/**************************************************************************
 ****************** FILE UTILITIES OBJECTS START HERE *********************
 **************************************************************************/


var fileUtilities = {
		moveAsync: function (sourceFullPath,destFolder,destName,onSuccess){
			var url="file://"+sourceFullPath;
			var destFile=destFolder+destName;
			var fileTransfer = new FileTransfer();
			fileTransfer.download(
				url,
				destFile,
				function() {
					window.resolveLocalFileSystemURL(url,
		    				function(fileEntry) {
		    					fileEntry.remove(onSuccess);
		    				},
		    				function(error) {
		    					alert("Source file NOT removed");
		    				}
		    		);			
				},
				function (error) {
					alert('File not copied. '+'error.code: '+error.code+'\nerror.source: '+error.source+'\nerror.target: '+error.target+'\nerror.http_status: '+error.http_status);
				}
			);		
		}
};

/**************************************************************************
 ******************* AUDIO RECORD OBJECTS START HERE **********************
 **************************************************************************/

var audio = {
		media:null,
		fileFolder:null,
		fileName:null,
		create: function(fileFolder,fileName) {
			this.fileFolder=fileFolder;
			this.fileName=fileName;
			if(this.media)
				this.media.release();
			this.media = new Media(this.fileFolder+this.fileName);
		},

		doStartRecord: function() {

			this.create("","tmprecording.3gp");//Crear nuevo objeto para el atributo "media", asociado al fichero "tmprecording.3gp" de la carpeta por defecto
			if(this.media) {
				this.media.startRecord();//Comenzar a grabar con el objeto del atributo media
		    }
			else {
				alert("No media file to record");
			}
	
		},
		
		doStopRecordAsync: function(fileFolder,fileName,onSuccess) {

			if(this.media) {
				//alert("doStopRecord: "+this.fileName);
				this.media.stopRecord();//Dejar de grabar con el objeto del atributo media
		        
		        fileUtilities.moveAsync("/sdcard/tmprecording.3gp",fileFolder,fileName,
		        	function() {
		        		this.media.release();//Liberar el objeto del atributo media
			    		audio.fileFolder=fileFolder;
			    		audio.fileName=fileName;
						if(onSuccess!=false)
							onSuccess();
		        	}
		        );
		    }
			else {
				alert("No media file to stop");
			}		
		}		
};