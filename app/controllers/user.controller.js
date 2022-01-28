const KedaiModel = require("../models/kedai.model.js");
const UserModel = require("../models/user_model.js")

exports.create = (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }
  const user = new UserModel({
    nama: req.body.nama,
    email: req.body.email,
    password: req.body.password
  })

  UserModel.create(user, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the User."
      });
    else res.send(data);
  })
}

exports.login = (req, res) => {
  UserModel.signIn(req,(err,data)=>{
    
  })

  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }else if(res.status(500)){
    res.status(500).send({
      status:"FAILED",
      result:{},
      message:
        err.message || "Some error occurred while creating the User."
    
      
    });
  }
}