$(function() {

  ////////////////////////////////////////
  //     Bind function to buttons       //
  ////////////////////////////////////////

  $("button[name='add']").click(add);
  $("button[name='personalS']").click(getPersonalStats);
  $("button[name='generalS']").click(getGeneralStats);
  $("button[name='otherS']").click(getOtherStats);
  $("button[name='getReq']").click(getReq);
  $("button[name='sendReq']").click(sendReq);

  ////////////////////////////////////////
  //       Dropbox Authentication       //
  ////////////////////////////////////////

  var client = new Dropbox.Client({ key: "75ozb45t6z1tq24" });
  if (client.isAuthenticated()) {
    // Cached credentials are available, make Dropbox API calls.
    console.log("Auth cached")
  } else {
    client.authenticate(function(error, client) {
      if (error) {
        return;
        console.log("Auth failed")
      }
    });
  }

  ////////////////////////////////////////
  //              Add data              //
  ////////////////////////////////////////

  function add(){
    var user = $('#user').val();
    var myClass = $('input[name="myClass"]:checked').val();
    var theirClass = $('input[name="theirClass"]:checked').val();
    var result = $('input[name="result"]:checked').val();
    var id = Math.random().toString(36).substr(2,5);
    var pat = /^[a-zA-Z0-9-]+$/;

    if(pat.test(user)){
      client.writeFile("/space/Feed/"+user+"_"+myClass+"_"+theirClass+"_"+result+"."+id, "", function(error, stat) {
        if (error) {
          console.log("Error uploading");
          return;
        }     
      });
    }
  }

  ////////////////////////////////////////
  //      Get Personal Statistics       //
  ////////////////////////////////////////

  function getPersonalStats(){
    var user = $('#login').val();

    var pat = /^[a-zA-Z0-9-]+$/;

    if(pat.test(user)){
      fetchAndUpdate("/space/Users/"+user+"/Statistics/");
    }
  }

  ////////////////////////////////////////
  //       Get General Statistics       //
  ////////////////////////////////////////

  function getGeneralStats(){
    fetchAndUpdate("/space/General/");
  }

  ////////////////////////////////////////
  //      Get friends statistics        //
  ////////////////////////////////////////
  function getOtherStats(){
    var user = $("#login").val();
    var other = $('#otherI').val();
    var pat = /^[a-zA-Z0-9-]+$/;

    if(pat.test(user)&&pat.test(other)){
      // Check if friends

      client.readFile("/space/Users/"+user+"/Access/"+other,null,function(error,s,stat){
        if(error){
          $("#stats").removeClass("show").addClass("hide");
          return;
        }

        // If friends, then update
        fetchAndUpdate("/space/Users/"+other+"/Statistics/");
      });
    }
  }

  ////////////////////////////////////////
  //     Request/Accept friendship      //
  ////////////////////////////////////////

  function sendReq(){
    var user = $('#login').val();
    var other = $('#friend').val();
    var count = Math.random().toString(36).substr(2, 5);
    var pat = /^[a-zA-Z0-9-]+$/;

    if(pat.test(user)&&pat.test(other)){
      client.writeFile("/space/Feed/"+"REQ_"+other+"_"+user+"."+count, "", function(error, stat) {
        if (error) {
          console.log("Error requesting");
          return;
        }
      });
    }
  }

  ////////////////////////////////////////
  //       Get pending requests         //
  ////////////////////////////////////////

  function getReq(){
    // Remove old data
    var myNode = document.getElementById("pending");
    while (myNode.firstChild) {
        myNode.removeChild(myNode.firstChild);
    }

    // Update with new data
    var user = $('#login').val();
    var pat = /^[a-zA-Z0-9-]+$/;

    if(pat.test(user)){
      client.stat("/space/Users/"+user+"/Request/",{"readDir":true},function(error,stat,cstats){
        if (error){
          console.log("Requests not found");
          return;
        }

        var temp = [];
        for (var i = cstats.length - 1; i >= 0; i--) {
          $('#pending').append("<li>Pending Request From "+cstats[i].name);
        };
      });
    }
  }

  ////////////////////////////////////////
  //  Aux function for stat updating    //
  ////////////////////////////////////////

  function fetchAndUpdate(path){
    client.stat(path,{"readDir":true},function(error,stat,cstats){
      if (error){
        console.log("Stats not found");
        $("#stats").removeClass("show").addClass("hide");
        return;
      }

      var temp = [];
      var result = {Druid:NaN,Hunter:NaN,Mage:NaN,Paladin:NaN,
        Priest:NaN,Rogue:NaN,Shaman:NaN,Warlock:NaN,Warrior:NaN};

      for (var i = cstats.length - 1; i >= 0; i--) {
        temp = cstats[i].name.split("_");
        result[temp[0]] = (parseFloat(temp[1])/(parseFloat(temp[2])+parseFloat(temp[1])))*100;
      };

      $("#DruidS").html(result.Druid.toFixed(0)+" %");
      $("#HunterS").html(result.Hunter.toFixed(0)+" %");
      $("#MageS").html(result.Mage.toFixed(0)+" %");
      $("#PaladinS").html(result.Paladin.toFixed(0)+" %");
      $("#PriestS").html(result.Priest.toFixed(0)+" %");
      $("#RogueS").html(result.Rogue.toFixed(0)+" %");
      $("#ShamanS").html(result.Shaman.toFixed(0)+" %");
      $("#WarlockS").html(result.Warlock.toFixed(0)+" %");
      $("#WarriorS").html(result.Warrior.toFixed(0)+" %");
    });

    $("#stats").removeClass("hide").addClass("show");
  }
});

