const sql = require("./db.js")

const UserModel = function (user) {
    this.nama = user.nama
    this.email = user.email
    this.password = user.password
}

UserModel.create = (newData, result) => {
    sql.query("INSERT INTO tbl_user SET ?", newData, (err, res) => {
        if (err) {
            result(err, null);
            return;
        }
        result(null, { status: "OK", code: 200, message: "User Berhasil Disimpan" });
    })
}

UserModel.signIn = (req, result) => {
    let query = `SELECT * FROM tbl_user WHERE email=${req.body.email} AND password =${req.body.password}`;
    console.log(query)
    // if (title) {
    //   query += ` WHERE nama LIKE '%${title}%'`;
    // }
  
    sql.query(query, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
  
      console.log("tbl_user: ", res);
      result(null, res);
    })
  }
module.exports = UserModel