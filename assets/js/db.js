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
  var classes = {
    Druid:NaN,
    Hunter:NaN,
    Mage:NaN,
    Paladin:NaN,
    Priest:NaN,
    Rogue:NaN,
    Shaman:NaN,
    Warlock:NaN,
    Warrior:NaN
  };

  function getPersonalStats(){
    console.log("getPersonalStatsClicked");
    
    var user = $('#login').val();
    var stats = classes;
    auxReadPClass(user);


    $("#personalS").removeClass("hide").addClass("show");
  }

  function auxReadPClass(s){
    client.stat("/space/Users/"+s+"/Statistics/",{"readDir":true},function(error,stat,cstats){
      if (error){
        console.log("user not found");
        $(".stats-not-avail").setAttribute("class", "visible");
        return showError(error);
      }
      console.log("stats found");

      var temp = [];
      var result = classes;
      for (var i = cstats.length - 1; i >= 0; i--) {
        temp = cstats[i].name.split("_");
        result[temp[0]] = (parseFloat(temp[1])/(parseFloat(temp[2])+parseFloat(temp[1])))*100;
      };
      //$(".stats-not-avail").setAttribute("class", "hidden");
      console.table(result);
      $("#pDruidS").html(result.Druid.toFixed(0)+" %");
      $("#pHunterS").html(result.Hunter.toFixed(0)+" %");
      $("#pMageS").html(result.Mage.toFixed(0)+" %");
      $("#pPaladinS").html(result.Paladin.toFixed(0)+" %");
      $("#pPriestS").html(result.Priest.toFixed(0)+" %");
      $("#pRogueS").html(result.Rogue.toFixed(0)+" %");
      $("#pShamanS").html(result.Shaman.toFixed(0)+" %");
      $("#pWarlockS").html(result.Warlock.toFixed(0)+" %");
      $("#pWarriorS").html(result.Warrior.toFixed(0)+" %");
      //return result;
    });
  }

  function auxReadPReset(){

  }

  // Get General Statistics

  // Get Other Statistics

  // Request Friendship

  // Accept Friendship

});




