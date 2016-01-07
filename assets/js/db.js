$(function() {

  // Variables
  var count = 0;

  // Buttons
  $("button[name='add']").click(add);
  $("button[name='personalS']").click(getPersonalStats);
  //$("button[name='generalS']").click(getGeneralStats);
  //$("button[name='otherI']").click(getOtherInfo);

  // Authentication
  var client = new Dropbox.Client({ key: "75ozb45t6z1tq24" });
  if (client.isAuthenticated()) {
    // Cached credentials are available, make Dropbox API calls.
    console.log("auth cached")
  } else {
    client.authenticate(function(error, client) {
      if (error) {
        console.log("auth error");
        return;
      }
      console.log("auth Success")
    });
  }

  // Add Data
  function add(){
    console.log("Add Clicked");
    var user = $('#user').val();
    var myClass = $('input[name="myClass"]:checked').val();
    var theirClass = $('input[name="theirClass"]:checked').val();
    var result = $('input[name="result"]:checked').val();

    client.writeFile("/space/Feed/"+user+"_"+myClass+"_"+theirClass+"_"+result+"."+count, "Hello, world!\n", function(error, stat) {
      if (error) {
        console.log("error uploading");
        return showError(error);  // Something went wrong.
      }
      count += 1;
      console.log("file uploaded");
    });
  }

  // Get Personal Statistics
  var pDruidS = $('#pDruidS');

  function getPersonalStats(){
    console.log("getPersonalStatsClicked");

    var user = $('#login').val();

    pDruidS.html("5");


  }

  function auxReadPClass(c){
    //client.readFile
  }

  function auxReadPReset(){

  }

  // Get General Statistics

  // Get Other Statistics

  // Request Friendship

  // Accept Friendship

});




