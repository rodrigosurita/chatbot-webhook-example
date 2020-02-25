$(document).ready(function () {
  $("#btnlogin").click(function () {
    accessSystem();
  });
  $("#userpassword").keydown(function () {
    if (event.keyCode == 13) {
      accessSystem();
    }
  });
});

function accessSystem() {

  let loader = document.getElementById('loader');
  loader.style.display = 'block';

  let useremail, userpassword;

  useremail = document.getElementById("useremail").value.trim();
  userpassword = document.getElementById("userpassword").value.trim();

  if (useremail == "" || userpassword == "") {
    loader.style.display = 'none';
    swal("", "Por favor, informe um e-mail e senha para acessar o sistema", "warning");
  } else {
    let body = {
      useremail: useremail,
      userpassword: userpassword
    };

    $.post(env.HOST + '/login/submit', body)
      .done(function (data) {
        if (data.status == 1) {
          window.location.href = env.HOST + "/dashboard/pannel ";
        } else if (data.status == 0) {
          loader.style.display = 'none';
          swal("Opa!", data.msg, "error")
            .then(() => {
              $("#userpassword").parent().find("label").addClass("active");
              $("#userpassword").focus();
            });
        } else {
          loader.style.display = 'none';
          swal("Opa!", "Não foi possível acessar o sistema, tente novamente mais tarde.", "error")
            .then(() => {
              $("#userpassword").parent().find("label").addClass("active");
              $("#userpassword").focus();
            });
        }
      })
      .fail(function (xhr, status, error) {
        loader.style.display = 'none';
        if (xhr.status == 429) {
          swal("Opa!", "Você errou a senha muitas vezes, tente novamente mais tarde.", "error")
            .then(() => {
              $("#userpassword").parent().find("label").addClass("active");
              $("#userpassword").focus();
            });
        } else {
          swal("Opa!", "Não foi possível acessar o sistema, tente novamente mais tarde.", "error")
            .then(() => {
              $("#userpassword").parent().find("label").addClass("active");
              $("#userpassword").focus();
            });
        }
      });

  }
}