const express = require('express')
const app = express()
const port = 3000
var mysql = require('mysql');

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

  connection.query('SELECT * FROM elev', function (error, results, fields) {
    if (error) throw error;
    res.send(JSON.stringify(results));
  });
  
})

app.get('/update/:newhobby/:id', (req, res) => {
  let newhobby = req.params.newhobby;
  let id = req.params.id;
  console.log(newhobby);
  let sqlquery = 'UPDATE elev SET hobby=? WHERE ElevID=?';

  connection.query(sqlquery, [newhobby, id], function (error, results, fields) {
    if (error) throw error;
    res.send(JSON.stringify(results));
  });

  res.send('If This works, great!');
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})