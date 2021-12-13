const redis = require("redis");
const client = redis.createClient({
  //password: "password",
});
client.connect();
exports.setUser = async (email, firstName, lastName) => {
  try {
    const res = await client.set(
      email,
      JSON.stringify({
        firstName: firstName,
        lastName: lastName,
      })
    );
  } catch (err) {
    console.log(err);
  }
};

exports.isUserAvailable = async (email) => {
  try {
    const response = await client.get(email);
    if (response !== null) {
      return true;
    }
    return false;
  } catch (err) {
    console.log(err);
  }
};
