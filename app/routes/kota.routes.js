module.exports = app =>{
    const kota = require("../controllers/kota.controller.js")
    var router = require("express").Router()

    router.get("/",kota.findAll)

    app.use('/api/kota', router);
}