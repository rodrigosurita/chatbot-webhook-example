const bcrypt = require('bcryptjs');
const User = require('../../models/User');
const { UserSchema, LoginSchema } = require('../../helpers/UserValidator');

exports.loginSubmit = async (req, res) => {
  /*
    Validating user information,
    if get any error,
    return err messages
  */

  let errMessages = [];

  await LoginSchema.validateAsync(req.body).catch(error => {
    errMessages = error.details.map(detail => detail.message);
  });

  if (errMessages.length > 0) {
    return res.status(200).json({
      status: 0,
      msg: errMessages[0],
    });
  }

  const { useremail, userpassword } = req.body;

  // After validate information check if the user exists
  const user = await User.findByEmail(useremail);
  if (user) {
    // check if the password is correct
    const equals = await bcrypt.compare(userpassword, user.password);
    if (equals) {
      req.session.user = user;
      return res.status(200).json({
        status: 1,
        msg: 'Login validado com sucesso!',
      });
    }

    return res.json({
      status: 0,
      msg: 'Login ou senha incorretos!',
    });
  }

  return res.json({
    status: 0,
    msg: 'Usuário não encontrado!',
  });
};

/* LOGOUT */
exports.logout = (req, res) => {
  req.session.user = null;
  res.redirect('/login');
};

// Render login page and set login errors and login success to null,
// variables used to display error or success messages to the user
exports.login = (req, res) => {
  if (req.session.user) {
    res.redirect(`${process.env.HOST}/dashboard/pannel`);
  } else {
    res.render('dashboard/login', {
      layout: false,
    });
  }
};

// Render register page
exports.register = (req, res) => {
  const { user } = req.session;
  if (user && user.profile === 'admin') {
    // console.log(req.session.user);
    return res.render('home/register', {
      layout: './shared/_internalLayout',
      // layout: false,
    });
  }

  return res.send('<h2>😡😡😡😡😡😡</h2>');
};

// Submit new User
exports.registerSubmit = async (req, res) => {
  /*if (req.session.user) {
    /*
    Validating user information,
    if get any error,
    return err messages
  */
    let errMessages = [];
    // console.log(req.body);
    await UserSchema.validateAsync(req.body).catch(error => {
      errMessages = error.details.map(detail => detail.message);
    });

    if (errMessages.length > 0) {
      return res.status(200).json({
        status: 0,
        msg: errMessages,
      });
    }

    // After validate information check if the user already exists
    const { username, useremail, userpassword, isAdmin } = req.body;

    const user = await User.findByEmail(useremail);

    if (user) {
      return res.json({
        status: 0,
        msg: 'Usuário já existe!',
      });
    }

    // If the user do not exist, hash password and insert into the database
    const hash = await bcrypt.hash(userpassword, 10);
    await User.create({
      name: username,
      email: useremail,
      password: hash,
      profile: isAdmin ? 'admin' : 'usuario',
    });

    return res.status(201).json({
      status: 1, // sucesso
      msg: 'Cadastro efetuado com sucesso!',
    });
  /*}
  return res.status(200).json({
    status: 0,
    msg: 'Acesso Negado',
  });*/
};
