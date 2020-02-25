$(document).ready(function(){
    $("#btnregister").click(function(){
      register();
    });
    $("#userconfirmpassword").keyup(function(){
      if(event.keyCode == 13){
        register();
      }
    });
});

function register() {
    /** disable register button */
    $("#btnregister").addClass("disabled");

    //let useremail, userpassword, username, userconfirmemail, userconfirmpassword;

    var useremail = document.getElementById("useremail").value.trim();
    var userpassword = document.getElementById("userpassword").value.trim();
    var username = document.getElementById("username").value.trim();
    var userconfirmemail = document.getElementById("userconfirmemail").value.trim();
    var userconfirmpassword = document.getElementById("userconfirmpassword").value.trim();
    var isAdmin = document.getElementById("admin").checked;
    /* null parameters?*/
    if (useremail == "" || userpassword == "" || username == "" || userconfirmemail == "" || userconfirmpassword == "") {
      $("#btnregister").removeClass("disabled");  
      swal("", "Por favor, preencha todos os campos para se cadastrar.", "warning");
    } else if(userpassword !== userconfirmpassword){
      $("#btnregister").removeClass("disabled");  
      swal("", "As senhas informadas não são iguais.", "warning");
    } else if(useremail !== userconfirmemail){
      $("#btnregister").removeClass("disabled");  
      swal("", "Os e-mails informados não são iguais.", "warning");
    } else if(userpassword.length < 8){
        $("#btnregister").removeClass("disabled");
        swal("", "A senha deve conter pelo menos 8 caracteres", "warning");
    } else {
        var body = {
          useremail: useremail ,
          userpassword: userpassword,
          username: username,
          isAdmin,
        };
        /*insert user*/
        $.post(env.HOST + '/register/submit', body)
            .done(function(data) {
              if (data.status === 1){ /*status 1 = success*/
                swal("", "Cadastro realizado!", "success").then(() => {
                  window.location.href = env.HOST;
                });
              } else if(data.status === 0) { /*status 0 = errors*/
                /** enable register button */
                $("#btnregister").removeClass("disabled");
                swal('Atenção!', data.msg[0],"error");
              } else {
                /** enable register button */
                $("#btnregister").removeClass("disabled");
                swal("Opa!", "O sistema não está disponível no momento, tente novamente mais tarde.","warning");
              }
            })
            .fail(function(xhr, status, error) {
              /** enable register button */
              $("#btnregister").removeClass("disabled");
              swal("Opa!", "O sistema não está disponível no momento, tente novamente mais tarde.","warning");
            });

    }
}
