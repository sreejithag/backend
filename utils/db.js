const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/dbConfig");
const User = require("../models/user")(sequelize, DataTypes);

const getUserFromEmail = async (email) => {
  try {
    const user = await User.findOne({
      where: {
        email: email,
      },
    });

    return user;
  } catch (err) {
    console.log(err);
  }
};

exports.createUser = async (email, password, firstName, lastName) => {
  try {
    const user = await User.create({
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: password,
    });

    return !user ? false : true;
  } catch (err) {
    console.log(err);
  }
};

exports.isUserExists = async (email) => {
  const user = await getUserFromEmail(email);
  return !user ? false : true;
};

exports.checkUserAndValidatePassword = async (email, password) => {
  const user = await getUserFromEmail(email);

  if (!user) {
    return {
      success: false,
      usernameDB: null,
    };
  }

  return {
    success: await user.validatePassword(password),
    emailDB: user.email,
  };
};

exports.updateUser = async (email, firstName, lastName) => {
  const user = await getUserFromEmail(email);

  if (user) {
    const newUser = user.update({
      firstName: firstName,
      lastName: lastName,
    });
    if (newUser) {
      return true;
    }
    return false;
  }

  return false;
};
