const Form = require("../models/userForm");

module.exports.submit = async (req, res) => {
  const body = req.body;
  const user = req.decoded;
  const userForm = new Form({
    ...body,
    userId: user._id,
  });
  console.log(user);
  try {
    await userForm.save();
    res.status(201).send(userForm);
  } catch (err) {
    res.status(500).send(err);
  }

  //   res.json(body);
  //   console.log("body", body);
};

module.exports.getForm = async (req, res) => {
  try {
    const userForm = await Form.find().populate(
      "userId"
    );
    res.status(200).send(userForm);
  } catch (err) {
    res.status(500).send(err);
  }
};

module.exports.view = async (req, res) => {
  const id = req.params.id;
  try {
    const userForm = await Form.findById(id);
    res.status(200).send(userForm);
  } catch (err) {
    res.status(500).send(err);
  }
};

module.exports.destroy = async (req, res) => {
  const id = req.params.id;
  console.log(id);
  try {
    const userForm = await Form.findByIdAndDelete(
      id
    );
    if (userForm) {
      res.status(200).send(userForm);
    } else {
      res.send(`No record found with ${id} id.`);
    }
  } catch (err) {
    res.status(500).send(err);
  }
};

//UPDATE

module.exports.update = async (req, res) => {
  const id = req.params.id;
  const body = req.body;
  console.log(body);
  const userForm = await Form.findByIdAndUpdate(
    id,
    body,
    { new: true, useFindAndModify: false }
  );
  try {
    res.status(200).send(userForm);
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
};

// SEARCH

module.exports.search = async (req, res) => {
  var regex = new RegExp(req.params.name, "i");
  const userForm = await Form.find({
    name: regex,
  });

  try {
    res.status(200).send(userForm);
  } catch (err) {
    res.status(500).send(err);
  }
};
