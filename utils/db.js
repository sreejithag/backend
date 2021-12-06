const { User } = require("../models/user");

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

exports.checkUserAndValidatePassword = async (username, password) => {
  try {
    const user = await User.findOne({
      where: {
        username: username,
      },
    });

    if (!user) {
      return false;
    }

    return await user.validatePassword(password);
  } catch (err) {
    console.log(err);
  }
};
