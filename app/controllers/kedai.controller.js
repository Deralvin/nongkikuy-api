const KedaiModel = require("../models/kedai.model.js");
const fs = require("fs");


// Create and Save a new Tutorial
exports.create = (req, res) => {
  console.log(req.file.filename);
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  // Create a Tutorial
  const kedai = new KedaiModel({
  
    nama:req.body.nama,
    alamat:req.body.alamat,
    deskripsi : req.body.deskripsi,
    kategori : req.body.kategori,
    longitude: req.body.longitude,
    latitude : req.body.latitude,
    image : req.file.filename
  });

  // Save Tutorial in the database
  KedaiModel.create(kedai, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Tutorial."
      });
    else res.send(data);
  });
};

// Retrieve all Tutorials from the database (with condition).
exports.findAll = (req, res) => {
  const title = req.query.title;

  KedaiModel.getAll(title, (err, data) => {
    console.log(err)
  })
}
exports.getKedaiId = (req,res)=>{
  KedaiModel.findKedaiById(req,(err,data)=>{
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving kedai."
      });
    else res.status(200).send(
     {
      message:"Success",
      code:200,
      result : data
     }
    );
  })
}
exports.findNearMe = (req,res)=>{
  KedaiModel.getNearMe(req.body.latitude,req.body.longitude,(err,data)=>{
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving nearme."
      });
    else res.status(200).send(
     {
      message:"Success",
      code:200,
      result : data
     }
    );
  })
}

exports.updateStatusKedai = (req,res)=>{
  console.log(req.body)
  KedaiModel.updateFullPlace(req,(err,data)=>{
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving nearme."
      });
    else res.status(200).send(
     {
      message:"Success",
      code:200,
      result : data
     }
    );
  })
}

exports.updateStatus = (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  console.log(req.body);

  KedaiModel.updateByIdStatus(
    req.params.id,
    req.body.status,
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            status:404,
            message: `Not found Kedai with id ${req.params.id}.`,
            data:{}
          });
        } else {
          res.status(500).send({
            status:200,
            message: "Error updating kedai with id " + req.params.id,
            data:{}
          });
        }
      } else res.send({
        status:200,
        message:"Update Successfuly",
        data:data
      });
    }
  );
};
// // Find a single Tutorial by Id
// exports.findOne = (req, res) => {
//   Tutorial.findById(req.params.id, (err, data) => {
//     if (err) {
//       if (err.kind === "not_found") {
//         res.status(404).send({
//           message: `Not found Tutorial with id ${req.params.id}.`
//         });
//       } else {
//         res.status(500).send({
//           message: "Error retrieving Tutorial with id " + req.params.id
//         });
//       }
//     } else res.send(data);
//   });
// };

// // find all published Tutorials
// exports.findAllPublished = (req, res) => {
//   Tutorial.getAllPublished((err, data) => {
//     if (err)
//       res.status(500).send({
//         message:
//           err.message || "Some error occurred while retrieving tutorials."
//       });
//     else res.send(data);
//   });
// };

// // Update a Tutorial identified by the id in the request
// exports.update = (req, res) => {
//   // Validate Request
//   if (!req.body) {
//     res.status(400).send({
//       message: "Content can not be empty!"
//     });
//   }

//   console.log(req.body);

//   Tutorial.updateById(
//     req.params.id,
//     new Tutorial(req.body),
//     (err, data) => {
//       if (err) {
//         if (err.kind === "not_found") {
//           res.status(404).send({
//             message: `Not found Tutorial with id ${req.params.id}.`
//           });
//         } else {
//           res.status(500).send({
//             message: "Error updating Tutorial with id " + req.params.id
//           });
//         }
//       } else res.send(data);
//     }
//   );
// };

// // Delete a Tutorial with the specified id in the request
// exports.delete = (req, res) => {
//   Tutorial.remove(req.params.id, (err, data) => {
//     if (err) {
//       if (err.kind === "not_found") {
//         res.status(404).send({
//           message: `Not found Tutorial with id ${req.params.id}.`
//         });
//       } else {
//         res.status(500).send({
//           message: "Could not delete Tutorial with id " + req.params.id
//         });
//       }
//     } else res.send({ message: `Tutorial was deleted successfully!` });
//   });
// };

// // Delete all Tutorials from the database.
// exports.deleteAll = (req, res) => {
//   Tutorial.removeAll((err, data) => {
//     if (err)
//       res.status(500).send({
//         message:
//           err.message || "Some error occurred while removing all tutorials."
//       });
//     else res.send({ message: `All Tutorials were deleted successfully!` });
//   });
// };


