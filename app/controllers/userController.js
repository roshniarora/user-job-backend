const User = require("../models/user");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");

module.exports.register = async (req, res) => {
  const body = req.body;
  let hashedPassword;
  const userExist = await User.findOne({
    email: body.email,
  });
  if (userExist) {
    return res
      .status(400)
      .send({ error: "email already exist" });
  }
  try {
    const salt = await bcryptjs.genSalt(10);
    hashedPassword = await bcryptjs.hash(
      body.password,
      salt
    );
  } catch (err) {
    res.status(400).send({ error: err });
  }
  const user = new User({
    ...body,
    password: hashedPassword,
  });
  try {
    await user.save();
    res.status(201).send({ user: user._id });
    res;
    //   .status(201)
    //   .send("user successfully created");
  } catch (err) {
    res.status(400).send({ error: err });
  }
};

// login

module.exports.login = async (req, res) => {
  const { body, email, password } = req.body;
  //  check if email is present
  const userFound = await User.findOne({ email });
  if (!userFound) {
    return res
      .status(404)
      .send({ error: "email not found" });
  }
  const passwordCheck = bcryptjs.compare(
    password,
    userFound.password
  );
  if (!passwordCheck)
    return res
      .status(404)
      .send({ error: "password not found" });
  const token = jwt.sign(
    {
      _id: userFound._id,
      message: "test message",
    },
    "secret123"
  );
  req.header("authorization", token);
  res.status(200).send({ token });
};
// User.findOne({ email: body.email })
//   .then((user) => {
//     if (user) {
//       bcryptjs
//         .compare(body.password, user.password)
//         .then((result) => {
//           if (result) {
//             const tokenData = {
//               id: user._id,
//             };
//             const token = jwt.sign(
//               tokenData,
//               "dct@123",
//               { expiresIn: "2s" }
//             );
//             res.json({
//               token: token,
//             });
//           } else {
//             res.json({
//               error:
//                 "invalid email or password",
//             });
//           }
//         });
//     } else {
//       res.json({
//         error: "invalid email or password",
//       });
//     }
//   })
//   .catch((err) => {
//     res.json(err);
//   });
