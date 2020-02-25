$(document).ready(function () {

  $(".btnLogout").click(function () {
    logout();
  });

  (function ($) {
    $(function () {
      $('.sidenav').sidenav();
    }); // end of document read
  })(jQuery); // end of jQuery name space

});

/* LOGOUT */
function logout() {
  swal("Deseja sair?", {
      buttons: {
        cancel: "Não",
        confirm: "Sim"
      }
    })
    .then((value) => {
      if (value) {
        $.post(env.HOST + '/logout', {})
          .done(function (data) {
            window.location.href = "/login";
          })
      }
    });
}

function displayLoad(display) {
  let x = document.getElementById("loading");
  if (display) {
    x.style.display = "block";
  } else {
    x.style.display = "none";
  }
}

function openOrderDetail(pedido) {
  let {
    produto,
    sabor,
    tamanho,
    refrigerante
  } = pedido;
  let details = document.getElementById('product-details');
  if(refrigerante){
    details.innerHTML = `
    <li class="collection-item avatar">
    <img src="${env.HOST}/img/pizza.jpg" alt="" class="circle">
    <span class="title"><b>Produto</b>: <span id="detail-product">${produto}</span></span>
    <p><b>Sabor</b>: <span id="detail-flavor">${sabor}</span> <br>
    <b>Tamanho</b>: <span id="detail-size">${tamanho}</span>
    </p>
  </li>
  <li class="collection-item avatar">
    <img src="${env.HOST}/img/refri.jpg" alt="" class="circle">
    <span class="title"><b>Produto</b>: <span id="detail-product">Refrigerante</span></span>
    <p><b>Sabor</b>: <span id="detail-flavor">Pepsi</span> <br>
    <b>Tamanho</b>: <span id="detail-size">1L</span>
    </p>
  </li>
    `
  } else {
    details.innerHTML = `
    <li class="collection-item avatar">
    <img src="${env.HOST}/img/pizza.jpg" alt="" class="circle">
    <span class="title"><b>Produto</b>: <span id="detail-product">${produto}</span></span>
    <p><b>Sabor</b>: <span id="detail-flavor">${sabor}</span> <br>
    <b>Tamanho</b>: <span id="detail-size">${tamanho}</span>
    </p>
  </li>
    `
  }

  let modal = M.Modal.getInstance(document.getElementById('modal1'));
  modal.open();
}