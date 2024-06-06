const express = require('express')
const app = express()
const port = 3001
var mysql = require('mysql');
var cors = require('cors')
var bodyParser = require('body-parser');
const bcrypt = require('bcrypt');

app.use(cors())

// parse application/json
app.use(bodyParser.json())


var connection = mysql.createConnection({
  host: 'localhost',
  port: 3306,
  user: 'root',
  password: 'root',
  database: 'kantinen'
});

connection.connect(function(err) {

  if (err) {
    console.error('error connecting: ' + err.stack);
    return;
  }

  console.log('connected as id ' + connection.threadId);
});

//Hvis du skal lese noe fra databasen/backend, bruk GET request.

app.get('/meny', (request, response) => {

    connection.query('SELECT * FROM meny;', function (error, results, fields) {
      if (error) throw error;
      response.send(JSON.stringify(results));
    });
    
})

app.post('/bestil', async (req, res) => {
  const { key1, key2 } = req.body;
  console.log('received values:', key1, key2 );

  let sqlquery = `UPDATE meny SET Antall = Antall -1 WHERE MenyID = ?;`;

  connection.query(sqlquery, [key2], (err, results, fields) => {
      if (err) {
          res.status(500).json({ message: 'Database error' });
          return;
      }

      console.log(sqlquery);
      
  });
});

app.post('/fylle_op', async (req, res) => {
    const { key1, key2 } = req.body;
    console.log('received values:', key1, key2 );
  
    let sqlquery = `UPDATE meny SET Antall = Antall +? WHERE MenyID = ?;`;
  
    connection.query(sqlquery, [key1, key2], (err, results, fields) => {
        if (err) {
            res.status(500).json({ message: 'Database error' });
            return;
        }
  
        console.log(sqlquery);
        
    });
  });
  

app.post('/login', async (req, res) => {

    const { InUsername, InPassword } = req.body;
  
    console.log(InUsername, InPassword)
    
        if (InUsername && InPassword) {
            connection.query('SELECT Hash FROM login WHERE Username = ?;', [InUsername], async (error, results) => {
                if (error) {
                    console.error(error);
                    return res.status(400).json({ error: 'Internal Server Error' });
                } else {
                    if (results.length>0) {
                        const user = results[0]
                        if (await bcrypt.compare(InPassword, user.Hash)) {
                            const login = true
                            console.log(login)
                            res.status(200).send({login})
                        } else {
                            res.status(401).send({ error: 'wrong username and/or password' })
                        }
                    } else {
                        res.status(401).send({ error: 'wrong username and/or password' })
                    }
                }
            });
        } else {
            res.status(401).send({ error: "damn how'd you do that" })
        }
  
});

/*
const saltRounds = 10;
const myPlaintextPassword = 'skole123';

app.get('/testbcrypt', (req, res) => {

  let sqlquery = `INSERT INTO login(userID, Username, Hash) VALUES (?,?,?);`;

  bcrypt.hash(myPlaintextPassword, saltRounds, function(err, hash) {
    //console.log(hash)

    // Store hash in your password DB.
    connection.query(sqlquery, [1, 'ansatt', hash], (err, results, fields) => {
      if (err) {
          console.error(err);
          res.status(500).json({ message: 'Database error' });
          return;
      }

      
      console.log('First query executed');
  });
  });



  res.send('vi tester bcrypt')
})
*/


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})