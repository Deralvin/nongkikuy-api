const KotaModel = require("../models/kota.model.js")

exports.findAll = (res) => {
    KotaModel.getAll((err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving tutorials."
            });
        else res.status(200).send(
            {
                message: "Success",
                code: 200,
                result: data
            }
        );
    })
}