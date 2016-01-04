$(function() {
  //Authentication
  var client = new Dropbox.Client({ key: "75ozb45t6z1tq24" });
  client.authenticate({interactive: false}, function(error, client) {
    if (error) {
      console.log("error");
      return;
    }
    if (client.isAuthenticated()) {
      // Cached credentials are available, make Dropbox API calls.
      console.log("success")
    } else {
      // show and set up the "Sign into Dropbox" button
      var button = document.querySelector("#signin-button");
      button.setAttribute("class", "visible");
      button.addEventListener("click", function() {
        // The user will have to click an 'Authorize' button.
        client.authenticate(function(error, client) {
          if (error) {
            console.log("error");
            return;
          }
          console.log("success")
        });
      });
    }
  });

  //Account Info
  var AccInfoB = document.querySelector("#account-button");
  AccInfoB.addEventListener("click", function() {
    // The user will have to click an 'Authorize' button.
    client.getAccountInfo(function(error, accountInfo) {
      if (error) {
        return showError(error);  // Something went wrong.
      }

      alert("Hello, " + accountInfo.name + "!");
    });
  });

  //Buttons
  $("button[name='add']").click(add);
  $("button[name='reset']").click(reset);
  //Add File
  function add(){
    console.log("clicked");
    var form = document.getElementById('fileInfo');
    var name = form[0].value;
    var sub = form[1].value;

    client.writeFile("/space/"+sub+"/"+name+".txt", "Hello, world!\n", function(error, stat) {
      if (error) {
        return showError(error);  // Something went wrong.
      }

      alert("File saved as revision " + stat.versionTag);
    });
  }

  function reset(){
    var form1 = document.getElementById('fileInfo');
    for (var i = form1.length - 1; i >= 0; i--) {
      form1[i].value = "";
    };
  }
});



