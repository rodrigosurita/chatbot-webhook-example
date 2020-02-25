const db = require('../../services/Database');
const bcrypt = require('bcryptjs');

exports.renderPannel = async (req, res) => {
  if (req.session.user) {
    let msg = '';

    const result = await db.query({
      identifier: 'orders'
    });

    if (result.length > 0) {
      return res.render('dashboard/pannel', {
        layout: './shared/_internalLayout.ejs',
        info: {
          name: req.session.user.name,
          email: req.session.user.email,
          message: msg,
          orders: result
        },
        host: req.headers.host
      });
    }

    return res.render('dashboard/pannel', {
      layout: './shared/_internalLayout.ejs',
      info: {
        name: req.session.user.name,
        email: req.session.user.email,
        message: msg,
        orders: []
      },
      host: req.headers.host
    });
  }
  return res.redirect('/login');
};

exports.renderRegister = async (req, res) => {
  if (req.session.user) {
    return res.render('home/register', {
      layout: './shared/_internalLayout.ejs'
    });
  }
  return res.redirect('/login');
};

exports.webhook = async (req, res) => {
  let {
    action
  } = req.body;
  let result = '';

  switch (action) {

    case 1:
      let {
        cliente, produto, sabor, tamanho, refrigerante
      } = req.body;
      result = await db.insert({
        cliente,
        produto,
        sabor,
        tamanho,
        refrigerante,
        identifier: 'orders'
      });
      if (result) {
        res.status(200).json({
          status: 'success'
        });
      } else {
        res.status(200).json({
          status: 'error',
          message: 'Não foi possível registrar o pedido.'
        });
      }
      break;

    case 2:
      let {
        username, useremail, userpassword
      } = req.body;
      const user = await db.query({
        identifier: 'users',
        email: useremail
      });
      if (user.length > 0) {
        return res.json({
          status: 'error',
          msg: 'Usuário já existe!',
        });
      }
      const hash = await bcrypt.hash(userpassword, 10);
      result = await db.insert({
        name: username,
        email: useremail,
        password: hash,
        profile: 'admin',
        identifier: 'users'
      });
      if (result) {
        res.status(200).json({
          status: 'success'
        });
      } else {
        res.status(200);
        json({
          status: 'error',
          message: 'Não foi possível registrar o usuário.'
        });
      }
      break;

    default:
      res.status(200).json({
        status: 'error',
        message: 'Ação não definida.'
      });
  }
};