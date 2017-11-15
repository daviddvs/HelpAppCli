
var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        app.receivedEvent('deviceready');
        
    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');
        checkPermissions();
        $.ajaxSetup({cache:false,contentType: "application/json"});
        $("body").enhanceWithin();

        console.log('Received Event: ' + id);
    }
};

app.initialize();

function checkPermissions(){
	var permissions = cordova.plugins.permissions;
	
	permissions.checkPermission(permissions.READ_EXTERNAL_STORAGE,
		permissions.requestPermission(
			permissions.READ_EXTERNAL_STORAGE,
			function(status) {
				if(!status.hasPermission)
					alert("Some features may not work the first time");
			},
			function() {
				alert("Some features may not work the first time if STORAGE permissions are not granted");
			}
		)
	);
}

function getFolderElements(){
	var myPath = cordova.file.externalRootDirectory; // We can use the default externalRootDirectory or use a path : file://my/custom/folder

	window.resolveLocalFileSystemURL(myPath, function (dirEntry) {
	     var directoryReader = dirEntry.createReader();
	     directoryReader.readEntries(onSuccessCallback,onFailCallback);
	});

	function onSuccessCallback(entries){
	  // The magic will happen here, check out entries with :
	  // console.log(entries);
	}

	function onFailCallback(){
	  // In case of error
	}
}