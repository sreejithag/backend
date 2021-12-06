const { User } = require("../models/user");

const getUserFromUsername = async (username) => {
  try {
    const user = await User.findOne({
      where: {
        username: username,
      },
    });

    return user;
  } catch (err) {
    console.log(err);
  }
};

exports.createUser = async (username, password) => {
  try {
    const user = await User.create({
      username: username,
      password: password,
      salt: "salt",
    });

    return !user ? false : true;
  } catch (err) {
    console.log(err);
  }
};

exports.isUserExists = async (username) => {
  const user = await getUserFromUsername(username);
  return !user ? false : true;
};

exports.checkUserAndValidatePassword = async (username, password) => {
  const user = await getUserFromUsername(username);

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
