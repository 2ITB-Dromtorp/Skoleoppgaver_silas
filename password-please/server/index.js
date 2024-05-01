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
  database: 'utlal'
});

connection.connect(function(err) {

  if (err) {
    console.error('error connecting: ' + err.stack);
    return;
  }

  console.log('connected as id ' + connection.threadId);
});

//Hvis du skal lese noe fra databasen/backend, bruk GET request.

app.get('/utstyrom', (request, response) => {

    connection.query('SELECT * FROM utstyrsrommet;', function (error, results, fields) {
      if (error) throw error;
      response.send(JSON.stringify(results));
    });
    
})

app.get('/utlan', (request, response) => {

    connection.query('SELECT utlan.UtlanID, utlan.lanet_av, utstyrsrommet.utstyrID, elev.Fornavn, elev.Etternavn, utlan.utstyr_type, utlan.utsyr_modell_ID, utlan.lanet_ut_dato FROM utlan JOIN elev ON utlan.lanet_av = elev.ElevID JOIN utstyrsrommet ON utlan.utstyrID = utstyrsrommet.UtstyrID;', function (error, results, fields) {
      if (error) throw error;
      response.send(JSON.stringify(results));
    });
    
})

app.get('/lantut', (request, response) => {

  connection.query('SELECT lantut.LantutID, lantut.lanet_av, utstyrsrommet.utstyrID, elev.Fornavn, elev.Etternavn, lantut.utstyr_type, lantut.utsyr_modell_ID, lantut.lanet_ut_dato FROM lantut JOIN elev ON lantut.lanet_av = elev.ElevID JOIN utstyrsrommet ON lantut.utstyrID = utstyrsrommet.UtstyrID;', function (error, results, fields) {
    if (error) throw error;
    response.send(JSON.stringify(results));
  });
  
})

app.post('/godkjen', async (req, res) => {
  const { key1, key2, key3, key4, key5, key6} = req.body;
  console.log('received values:', key1, key2, key3, key4, key5, key6);

  let sqlquery = `INSERT INTO lantut(LantutID, lanet_av, utstyrID, utstyr_type, utsyr_modell_ID, lanet_ut_dato) VALUES (?,?,?,?,?,?);`;
  let sqlquery2 = `UPDATE utstyrsrommet SET lanet_av = ? WHERE utstyrID = ?;`;
  let sqlQuery3 = 'DELETE FROM utlan WHERE UtlanId = ?';

  connection.query(sqlquery, [null, key2, key1, key3, key4, key5], (err, results, fields) => {
      if (err) {
          console.error(err);
          res.status(500).json({ message: 'Database error' });
          return;
      }

      console.log('First query executed');
      
      connection.query(sqlquery2, [key2, key1], (err, results, fields) => {
          if (err) {
              console.error(err);
              res.status(500).json({ message: 'Database error' });
              return;
          }

          console.log('Second query executed');
          res.status(200).send(JSON.stringify(results));

          connection.query(sqlQuery3, [key6], (err, results, fields) => {
            if (err) {
              console.error('Error executing SQL query:', err);
              res.status(500).json({ error: 'Internal Server Error' });
            } else {
              console.log('SQL query executed successfully:', sqlQuery3);
            }
          });
      });
  });
});

app.post('/return', async (req, res) => {
  const { key1, key2} = req.body;
  console.log('received values:', key1, key2);

  let sqlquery2 = `UPDATE utstyrsrommet SET lanet_av = ? WHERE utstyrID = ?;`;
  let sqlQuery3 = 'DELETE FROM lantut WHERE LantutId = ?';

  connection.query(sqlquery2, [null, key2], (err, results, fields) => {
      if (err) {
          console.error(err);
          res.status(500).json({ message: 'Database error' });
          return;
      }

      console.log('First query executed');
      
      connection.query(sqlQuery3, [key1], (err, results, fields) => {
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

app.post('/beom', async (req, res) => {
  const { key1, key2, key3, key4, key5} = req.body;
  console.log('received values:', key1, key2, key3, key4, key5);

  let sqlquery = `INSERT INTO utlan(UtlanID, lanet_av, UtstyrID, utstyr_type, utsyr_modell_ID, lanet_ut_dato) VALUES (?,?,?,?,?,?);`;
  let sqlquery2 = `UPDATE utstyrsrommet SET lanet_av = ? WHERE utstyrID = ?;`;

  connection.query(sqlquery, [null, key2, key1, key3, key4, key5], (err, results, fields) => {
      if (err) {
          res.status(500).json({ message: 'Database error' });
          return;
      }

      console.log(sqlquery);
  
      
      connection.query(sqlquery2, [key2, key1], (err, results, fields) => {
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



const saltRounds = 10;
const myPlaintextPassword = 'skole123';

app.get('/testbcrypt', (req, res) => {

  let sqlquery = `INSERT INTO login(userID, Username, Password, er_laerer, ElevID, Hash) VALUES (?,?,?,?,?,?);`;

  bcrypt.hash(myPlaintextPassword, saltRounds, function(err, hash) {
    //console.log(hash)

    // Store hash in your password DB.
    connection.query(sqlquery, [1, 'bobb', 'skole123', 0, 1, hash], (err, results, fields) => {
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

app.post('/login', async (req, res) => {

  const { InUsername, InPassword } = req.body;

  console.log(InUsername, InPassword)
  
      if (InUsername && InPassword) {
          connection.query('SELECT Hash, er_laerer, ElevID FROM login WHERE Username = ?;', [InUsername], async (error, results) => {
              if (error) {
                  console.error(error);
                  return res.status(400).json({ error: 'Internal Server Error' });
              } else {
                  if (results.length>0) {
                      const user = results[0]
                      if (await bcrypt.compare(InPassword, user.Hash)) {
                          const login = true
                          const userTypeID = user.er_laerer
                          const elevid = user.ElevID
                          console.log(login, userTypeID, elevid)
                          res.status(200).send({login, userTypeID, elevid})
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

app.delete('/delete/:id/:utstyr', (req, res) => {
    const id = req.params.id;
    const utstyr = req.params.utstyr;
  
    // Corrected SQL query
    const sqlQuery = 'DELETE FROM utlan WHERE UtlanId = ?';
    let sqlquery2 = `UPDATE utstyrsrommet SET lanet_av = ? WHERE utstyrID = ?;`;
  
    connection.query(sqlQuery, [id], (err, results, fields) => {
      if (err) {
        console.error('Error executing SQL query:', err);
        res.status(500).json({ error: 'Internal Server Error' });
      } else {
        console.log('SQL query executed successfully:', sqlQuery);
        res.status(200).json({ message: 'Row deleted successfully' });
      }

      connection.query(sqlquery2, [null, utstyr], (err, results, fields) => {
        if (err) {
            console.error(err);
            return;
        }

        console.log('Second query executed');
    });

    });
  });

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})