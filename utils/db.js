const { User } = require("../models/user");

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
    usernameDB: user.username,
  };
};
