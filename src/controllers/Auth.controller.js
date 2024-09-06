const jwt = require("jsonwebtoken");
const { SECRET } = require("../../config/config");
const User = require("../models/Users.model.js");

class ClassAuth {
  static async login(user, password) {
    let accountFound = await User.findOne({ user });
    if (!accountFound) throw new Error(`Password or user invalid`);

    const matchPassword = await User.comparePassword(
      password,
      accountFound.password
    );

    if (!matchPassword) throw new Error(`Password or user invalid`);

    const response = {
      _id: accountFound._id,
      user: accountFound.user,
      names: accountFound.names,
      surnames: accountFound.surnames || "",
      role: accountFound.role,
      status: accountFound.status
    }

    const token = jwt.sign(response, SECRET, {
      expiresIn: 86400,
    });

    await User.findOneAndUpdate({ user: accountFound.user }, { token: token });
    return {
      status: 200,
      message: "Welcome",
      token,
    };
  }

  static async signUp(data) {
    let accountFound = await User.findOne({ user: data.user });
    if (accountFound) throw new Error(`User already exist`);

    let newUser = new User({
      ...data,
      password: await User.encryptPassword(data.password),
    });

    await newUser.save();
    return {
      status: 200,
      message: "User registered",
    };
  }
}

module.exports = { ClassAuth };