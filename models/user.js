const { DataTypes, Model } = require("sequelize");
const bcrypt = require("bcrypt");
const { sequelize } = require("../configs/dbConfig");

class User extends Model {
  validatePassword = async (password) => {
    const res = await bcrypt.compare(password, this.password);
    return res;
  };
}
User.init(
  {
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    salt: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "users1",
    hooks: {
      beforeCreate: async (user) => {
        user.salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(user.password, user.salt);
      },
    },
  }
);

module.exports.User = User;
