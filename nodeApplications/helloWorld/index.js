const express = require('express')
const app = express()
const port = 3000
var mysql = require('mysql');
var cors = require('cors')

app.use(cors())

var connection = mysql.createConnection({
  host     : 'localhost',
  port: 3306,
  user     : 'root',
  password : 'root',
  database : 'droomtorp'
});
 
connection.connect(function(err) {
  if (err) {
    console.error('error connecting: ' + err.stack);
    return;
  }
 
  console.log('connected as id ' + connection.threadId);
});
 
app.get('/', (req, res) => {

  connection.query('SELECT * FROM elev', function (err, results, fields) {
    if (err) throw err;
    res.send(JSON.stringify(results));
  });
  
})

app.get('/update/:field/:newhobby/:id', (req, res) => {
  let field = req.params.field;
  let newhobby = req.params.newhobby;
  let id = req.params.id;
  console.log(newhobby);
  console.log(field)
  let sqlquery = 'UPDATE elev SET ?=? WHERE ElevID=?';

  connection.query(sqlquery, [field ,newhobby, id], function (err, results, fields) {
    if (err) throw err;
    res.send(JSON.stringify(results));
  });

  res.send('If This works, great!');
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
}) 