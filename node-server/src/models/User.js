const uuid = require('uuid/v4');
const Database = require('../services/Database');

const User = {
  /**
   * User's class, it defines the model for the system's users
   *
   * @author Rodrigo Surita da Silva
   *
   * @param {*} name
   * @param {*} email
   * @param {*} password
   * @param {*} profile
   */
  // constructor(name, email, password, profile, key) {
  //   this.identifier = 'users';
  //   this.name = name;
  //   this.email = email;
  //   this.password = password;
  //   this.profile = profile;
  //   this.key = key;
  // }

  async findByEmail(email) {
    const users = await Database.query({ email, identifier: 'users' });
    return users[0];
  },

  // Validate data schema and insert user in the database;
  async create(data) {
    const { name, email, password, profile } = data;

    const result = await Database.insert({
      identifier: 'users',
      name,
      email,
      password,
      apikey: Buffer.from(uuid().replace(/-/g, '')).toString('base64'), // giving user a key
      profile,
    });
    return result;
  },
};

module.exports = User;
