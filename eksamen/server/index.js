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
  database: 'vhd'
});

const saltRounds = 10;

connection.connect(function(err) {

  if (err) {
    console.error('error connecting: ' + err.stack);
    return;
  }

  console.log('connected as id ' + connection.threadId);
});

//Hvis du skal lese noe fra databasen/backend, bruk GET request.

app.get('/produkter', (request, response) => {

    connection.query('SELECT * FROM produkter;', function (error, results, fields) {
      if (error) throw error;
      response.send(JSON.stringify(results));
    });
    
})

app.get('/produktside/:id', (request, response) => {

    let id = request.params.id;

    connection.query(`SELECT * FROM produkter WHERE ProduktID = ${id};`,  function (error, results, fields) {
      if (error) throw error;
      response.send(JSON.stringify(results));
    });
    
})

app.get('/bestilinger', (request, response) => {

    connection.query('SELECT * FROM bestilinger;', function (error, results, fields) {
      if (error) throw error;
      response.send(JSON.stringify(results));
    });
    
})

app.post('/bestil', async (req, res) => {
  const { Stk, Sum, ProduktID, Navn, Bilde, UserID } = req.body;
  console.log('received values:', Stk, Sum, ProduktID, Navn, Bilde, UserID);

  let sqlquery = `UPDATE produkter SET Antall = Antall -? WHERE ProduktID = ?;`;
  let sqlquery2 = `INSERT INTO bestilinger(BestilingID, KundeID, Navn, Sum, Antall, Bilde) VALUES (?,?,?,?,?,?);`;

  connection.query(sqlquery, [Stk, ProduktID], (err, results, fields) => {
      if (err) {
          res.status(500).json({ message: 'Database error' });
          return;
      }

      console.log(sqlquery);

      connection.query(sqlquery2, [null, UserID, Navn, Sum, Stk, Bilde], (err, results, fields) => {
        if (err) {
            console.error(err);
            res.status(500).json({ message: 'Database error' });
            return;
        }

        console.log('Second query executed');
        res.status(200).send(JSON.stringify(results));
    });
      
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
            connection.query('SELECT userID, Hash FROM login WHERE Username = ?;', [InUsername], async (error, results) => {
                if (error) {
                    console.error(error);
                    return res.status(400).json({ error: 'Internal Server Error' });
                } else {
                    if (results.length>0) {
                        const user = results[0]
                        if (await bcrypt.compare(InPassword, user.Hash)) {
                            const login = true
                            const UserID = user.userID
                            console.log(login, UserID)
                            res.status(200).send({login, UserID})
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

app.post('/registrer', async (req, res) => {

    const { InUsername, InPassword } = req.body;

    let sqlquery = `INSERT INTO login(userID, Username, Hash) VALUES (?,?,?);`;

    bcrypt.hash(InPassword, saltRounds, function(err, hash) {
    //console.log(hash)

    // Store hash in your password DB.
        connection.query(sqlquery, [null, InUsername, hash], (err, results, fields) => {
        if (err) {
            console.error(err);
            res.status(500).json({ message: 'Database error' });
            return;
        }

        res.send("registrert")
        
        console.log('First query executed');
        });
    });
})


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})