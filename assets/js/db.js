$(function() {
    //Buttons
  $("button[name='add']").click(add);

  //Authentication
  var client = new Dropbox.Client({ key: "75ozb45t6z1tq24" });
  client.authenticate({interactive: false}, function(error, client) {
    if (error) {
      console.log("error");
      return;
    }
    if (client.isAuthenticated()) {
      // Cached credentials are available, make Dropbox API calls.
      console.log("cached")
    } else {
      client.authenticate(function(error, client) {
        if (error) {
          console.log("error");
          return;
        }
        button.setAttribute("class", "visible");
      });
    }
  });

  var count = 0;

  //Add Data
  function add(){
    console.log("Add Clicked");
    var user = $('#user').val();
    var myClass = $('input[name="myClass"]:checked').val();
    var theirClass = $('input[name="theirClass"]:checked').val();
    var result = $('input[name="result"]:checked').val();

    client.writeFile("/space/Feed/"+user+"_"+myClass+"_"+theirClass+"_"+result+"."+count, "Hello, world!\n", function(error, stat) {
      if (error) {
        console.log("error");
        return showError(error);  // Something went wrong.
      }
      count += 1;
      console.log("file uploaded");
      console.log(user);
      console.log(myClass);
      console.log(theirClass);
      console.log(result);
      console.log(count);

    });
  }
});




