const sql = require("./db.js")

const KedaiModel = function(kedai){
    this.nama = kedai.nama;
    this.alamat = kedai.alamat;
    this.deskripsi = kedai.deskripsi;
    this.kategori = kedai.kategori;
    this.longitude = kedai.longitude;
    this.latitude = kedai.latitude;
    this.image = kedai.image;
}

KedaiModel.create = (newData,result)=> {
    sql.query("INSERT INTO tbl_kedai SET ?",newData,(err,res)=>{
        if(err){
            result(err, null);
            return;
        }
        result(null, { status:"OK",code :200,message:"Data Berhasil Disimpan",data:{id: res.insertId, ...newData} });
    })
}
KedaiModel.getNearMe = (latitude,longitude,result)=>{
    let query = `SELECT *, ( ACOS( COS( RADIANS('${latitude}')) * COS( RADIANS( m.latitude))* COS( RADIANS( m.longitude ) - RADIANS('${longitude}'))+ SIN(RADIANS('${latitude}'))* SIN( RADIANS( m.latitude ) ))* 6371 ) AS distance_in_km FROM tbl_kedai m  INNER JOIN v_rating as b ON m.id = b.id_kedai HAVING distance_in_km < 4 ORDER BY distance_in_km ASC LIMIT 100`
    sql.query(query,(err,res)=>{
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
          }
      
          console.log("tbl_kedai: ", res);
          result(null, res);  
    })
}
KedaiModel.updateFullPlace  =(req,result) =>{
  let query = `UPDATE tbl_kedai SET status = ${req.body.status} WHERE id = ${req.body.id}`
  
  sql.query =(query,(err,res)=>{
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }
    console.log("tbl_kedai: update ", res);
          result(null, res);  
  })
}
KedaiModel.getAll = (title, result) => {
    let query = "SELECT b.id_kedai,a.nama,a.image,a.latitude,a.longitude,b.total as rating,c.nama as kota FROM tbl_kedai as a INNER JOIN v_rating as b ON a.id = b.id_kedai INNER JOIN tbl_kota as c ON a.id_kota = c.id";
  
    if (title) {
      query += ` WHERE nama LIKE '%${title}%'`;
    }
  
    sql.query(query, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
  
      console.log("tbl_kedai: ", res);
      result(null, res);
    });
  };
KedaiModel.getAllList = ()=>{
    new Promise((resolve,reject)=>{
      sql.query(`select t1.id,t1.nama,GROUP_CONCAT(t2.nama) as list_kategori,b.id_kedai,a.nama,a.image,a.latitude,a.longitude,b.total as rating,c.nama as kota  from tbl_kedai t1 INNER JOIN v_rating as b ON a.id = b.id_kedai INNER JOIN tbl_kota as c ON a.id_kota = c.id
      inner join tbl_kategori t2 on FIND_IN_SET(t2.id,t1.id_kategori) !=0
      GROUP BY 1`,(err,res)=>{
        if(err){
          reject(err);
        }
        resolve(res)
      })
    })
}

KedaiModel.updateByIdStatus = (id, status, result) => {
  sql.query(
    "UPDATE tbl_kedai SET  status = ? WHERE id = ?",
    [status, id],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found Tutorial with the id
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated tutorial: ", { id: id, status:status });
      result(null, { id: id, status:status });
    }
  );
};
KedaiModel.findKedaiById = (kedai,result)=>{
  let query = "SELECT a.id,a.nama,a.alamat,a.deskripsi,a.latitude,a.longitude,a.image,b.nama as kota,a.harga_awal,a.harga_akhir,a.status FROM tbl_kedai as a INNER JOIN tbl_kota as b ON a.id_kota = b.id WHERE a.id = "+kedai.body.id+""
  sql.query(query,(err,res)=>{
    if (err) {
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found tbl_kedai: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found Tutorial with the id
    result({ kind: "not_found" }, null);
  })
}
KedaiModel.updateById = (id, kedai, result) => {
  sql.query(
    "UPDATE tutorials SET  nama = ?, alamat = ?, deskripsi = ?, id_kategori = ?, latitude = ?,longitude = ?,image=?,id_kota =?,harga_awal = ?, harga_akhir =?,status = ? WHERE id = ?",
    [tutorial.title, tutorial.description, tutorial.published, id],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found Tutorial with the id
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated tutorial: ", { id: id, ...tutorial });
      result(null, { id: id, ...tutorial });
    }
  );
};
module.exports = KedaiModel;