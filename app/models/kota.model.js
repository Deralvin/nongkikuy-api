
const sql = require("./db.js")

const KotaModel = function (kota) {
    this.id = kota.id,
        this.nama = kota.nama
}

KotaModel.getAll = (result) => {
    let query = "SELECT * FROM tbl_kota"
    sql.query(query, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        console.log("tbl_kota: ", res);
        result(null, res);
    })
}

module.exports =KotaModel