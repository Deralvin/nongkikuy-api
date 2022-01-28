module.exports = app => {
  const kedais = require("../controllers/kedai.controller.js");
  const upload = require("../middleware/upload");

  var router = require("express").Router();

  // Create a new Tutorial
  router.post("/",upload.single("image"), kedais.create);


  router.post("/nearme",kedais.findNearMe)

  // Retrieve all kedais
  router.get("/", kedais.findAll);
  router.put("/updatestatus/:id",kedais.updateStatus)
  router.post("/getKedai",kedais.getKedaiId)
  // // Retrieve all published kedais
  // router.get("/published", kedais.findAllPublished);

  // // Retrieve a single Tutorial with id
  // router.get("/:id", kedais.findOne);

  // // Update a Tutorial with id
  // router.put("/:id", kedais.update);

  // // Delete a Tutorial with id
  // router.delete("/:id", kedais.delete);

  // // Delete all kedais
  // router.delete("/", kedais.deleteAll);

  app.use('/api/kedais', router);
};
