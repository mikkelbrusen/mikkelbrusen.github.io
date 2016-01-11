$(function() {

  // Variables
  var count = 0;

  // Buttons
  $("button[name='add']").click(add);
  $("button[name='personalS']").click(getPersonalStats);
  $("button[name='generalS']").click(getGeneralStats);
  $("button[name='otherS']").click(getOtherStats);
  $("button[name='getReq']").click(getReq);
  $("button[name='sendReq']").click(sendReq);

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

    client.writeFile("/space/Feed/"+user+"_"+myClass+"_"+theirClass+"_"+result+"."+count, "", function(error, stat) {
      if (error) {
        console.log("error uploading");
        return showError(error);  // Something went wrong.
      }
      count += 1;
      console.log("file uploaded");
    });
  }

  // Get Personal Statistics

  function getPersonalStats(){
    var user = $('#login').val();

    auxReadPClass(user);

    $("#generalS").removeClass("show").addClass("hide");
    $("#personalS").removeClass("hide").addClass("show");
  }

  function auxReadPClass(s){
    client.stat("/space/Users/"+s+"/Statistics/",{"readDir":true},function(error,stat,cstats){
      if (error){
        console.log("user not found");
        return showError(error);
      }
      console.log("stats found");
      var result = {
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

      var temp = [];
      for (var i = cstats.length - 1; i >= 0; i--) {
        temp = cstats[i].name.split("_");
        result[temp[0]] = (parseFloat(temp[1])/(parseFloat(temp[2])+parseFloat(temp[1])))*100;
      };
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

  // Get General Statistics

  function getGeneralStats(){
    auxReadGClass();

    $("#personalS").removeClass("show").addClass("hide");
    $("#generalS").removeClass("hide").addClass("show");
  }

  function auxReadGClass(){
    client.stat("/space/General/",{"readDir":true},function(error,stat,cstats){
      if (error){
        console.log("general not found");
        return showError(error);
      }
      console.log("general stats found");

      var temp = [];
      var result = {
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
      for (var i = cstats.length - 1; i >= 0; i--) {
        temp = cstats[i].name.split("_");
        result[temp[0]] = (parseFloat(temp[1])/(parseFloat(temp[2])+parseFloat(temp[1])))*100;
      };
      $("#gDruidS").html(result.Druid.toFixed(0)+" %");
      $("#gHunterS").html(result.Hunter.toFixed(0)+" %");
      $("#gMageS").html(result.Mage.toFixed(0)+" %");
      $("#gPaladinS").html(result.Paladin.toFixed(0)+" %");
      $("#gPriestS").html(result.Priest.toFixed(0)+" %");
      $("#gRogueS").html(result.Rogue.toFixed(0)+" %");
      $("#gShamanS").html(result.Shaman.toFixed(0)+" %");
      $("#gWarlockS").html(result.Warlock.toFixed(0)+" %");
      $("#gWarriorS").html(result.Warrior.toFixed(0)+" %");
    });
  }

  // Get Other Statistics
  function getOtherStats(){
    var user = $("#login").val();
    var other = $('#otherI').val();
    
    checkFriends(user,other);

  }

  function checkFriends(a,b){
    client.readFile("/space/Users/"+a+"/Access/"+b,null,function(error,s,stat){
      if(error){
        $("#personalS").removeClass("show").addClass("hide");
        return false;
      } else{
        auxGetOtherStats(b);

        $("#generalS").removeClass("show").addClass("hide");
        $("#personalS").removeClass("hide").addClass("show");
      }
    });
  }

  function auxGetOtherStats(b){
    client.stat("/space/Users/"+b+"/Statistics/",{"readDir":true},function(error,stat,cstats){
      if (error){
        console.log("user not found");
        return showError(error);
      }
      console.log("stats found");
      var result = {
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

      var temp = [];
      for (var i = cstats.length - 1; i >= 0; i--) {
        temp = cstats[i].name.split("_");
        result[temp[0]] = (parseFloat(temp[1])/(parseFloat(temp[2])+parseFloat(temp[1])))*100;
      };
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

  // Request/Accept Friendship
  function sendReq(){
    var user = $('#login').val();
    var other = $('#friend').val();

    auxSendReq(user,other);
  }

  function auxSendReq(a,b){
    client.writeFile("/space/Feed/"+"REQ_"+b+"_"+a+"."+count, "", function(error, stat) {
      if (error) {
        console.log("error requesting");
        return null;  // Something went wrong.
      }
      count += 1;
      console.log("request sent");
    });
  }

  // Get Requests
  function getReq(){
    var user = $('#login').val();

    // Remove old data
    var myNode = document.getElementById("pending");
    while (myNode.firstChild) {
        myNode.removeChild(myNode.firstChild);
    }

    auxGetReq(user);
  }

  function auxGetReq(s){
    client.stat("/space/Users/"+s+"/Request/",{"readDir":true},function(error,stat,cstats){
      if (error){
        console.log("requests not found");
        return null
      }
      console.log("requests");

      var temp = [];
      for (var i = cstats.length - 1; i >= 0; i--) {
        $('#pending').append("<li>Pending Request From "+cstats[i].name);
      };
    });
  };
});

