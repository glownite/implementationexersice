const mysql = require('mysql');

const conexion = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root",
  database: "do_list"
});

conexion.connect(function(err) {
  if (err) throw console.log("Error de conexion") + err;
  console.log("Conexion establecida!");
});


module.exports = conexion;