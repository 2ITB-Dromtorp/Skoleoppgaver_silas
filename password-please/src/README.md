# IT-Quiz

* [Installation](#installation)
* [Usage](#usage)
  * [login](#login)
    * [lage-brukere](#lage-brukere)
    * [logge-in](#logge-in)
        * [backend](#backend)
        * [frontend](#frontend)
        * [app.js](#appjs)
  * [komponenter](#komponenter)
    * [utstyrsrom](#utstyrom)
        * [frontend](#frontend-1)
        * [backend](#backend-1)
    * [ettersporsel](#ettersporsel)
        * [frontend](#frontend-2)
        * [backend](#backend-2)
    * [utlan](#utlan)
        * [frontend](#backend-3)
        * [backend](#backend-3)
    * [lantut](#lantut)
        * [frontend](#backend-4)
        * [backend](#backend-4)
* [License](#license)
* [Author](#author)

## Installation
dette programet kerever at du instalerer cors, express, bodyParser, react-router-dom og bcrypt.

[![cors Download]][cors-url]
[![express Download]][express-url]
[![bodyParser Download]][bodyParser-url]
[![react-router-dom Download]][react-router-dom-url]
[![bcrypt]][bcrypt]

## usage

### login

#### lage-brukere
det første du må gjøre for å logge in er å lage en hash av passordet. det kan gjøres med bcrypt

backend
```javascript
const bcrypt = require('bcrypt');

const saltRounds = 10;
const myPlaintextPassword = 'skole123';

app.get('/testbcrypt', (req, res) => {

  let sqlquery = `INSERT INTO login(userID, Username, er_laerer, ElevID, Hash) VALUES (?,?,?,?,?);`;

  bcrypt.hash(myPlaintextPassword, saltRounds, function(err, hash) {

    // Store hash in your password DB.

    // dette er sånn en elev bruker kan se ut.
    connection.query(sqlquery, [1, 'bobb', 0, 1, hash], (err, results, fields) => {
      if (err) {
          console.error(err);
          res.status(500).json({ message: 'Database error' });
          return;
      }
      
      });

    //dette er sån en lærer bruker ser ut
    connection.query(sqlquery, [2, 'laerer', 1, null, hash], (err, results, fields) => {
      if (err) {
          console.error(err);
          res.status(500).json({ message: 'Database error' });
          return;
    }
    
    });
  });
})
```

#### logge-in

får å logge in på en bruker så brukes bcrypt.compare den genererer hash-en på nytt så samenligner den den med hash-en i databasen din

##### backend
```javascript
app.post('/login', async (req, res) => {

    //brukernavn og passord som brukeren skev in på frontend
  const { InUsername, InPassword } = req.body;

  console.log(InUsername, InPassword)
  
    //hvis brukernavn og passord er sann fortsett
      if (InUsername && InPassword) {
        //henter den nødvendige informasjonen fra databasen der brukernavnet = brukernavnet brukeren skrev inn
          connection.query('SELECT Hash, er_laerer, ElevID FROM login WHERE Username = ?;', [InUsername], async (error, results) => {
              if (error) {
                  console.error(error);
                  return res.status(400).json({ error: 'Internal Server Error' });
              } else {
                //om det er noe i results fortsett
                  if (results.length>0) {
                    //legg results in i en variabel
                      const user = results[0]
                      //sjekk om hash-en av passordet som brukeren skev in er den samme som hash-en hentet fra databasen
                      if (await bcrypt.compare(InPassword, user.Hash)) {
                        //om sann lag variabler og send til frontend
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
```
i frontend koden gjør et post request mot serveren med brukernavn og passord som brukeren skriver inn

##### frontend
```javascript
//importer useNavigate
import { useNavigate } from 'react-router-dom';

//ta imot setLoginL, setLoginE og setElevID fra app.js
export default function Login({setLoginL, setLoginE, setElevID})

  let navigate = useNavigate();

  async function insertData() {

    //brukernavnet og passordet som brukeren skrev in
    const userCredentials = {
      InUsername: `${InUsername}`,
      InPassword: `${InPassword}`,
    };
   
    try {
        // sende et post request til serveren med fetch
      const response = await fetch('http://192.1680.5:3001/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userCredentials),
      });
   
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
   
   //vent på data fra backend server
      const data = await response.json();
      console.log(data);

      if (data.userTypeID == 1) {
        setLoginL(true)
        setLoginE(false)
        setElevID(null)
    //lærer
    //ikke elev
    //passe på at ElevID er null
      } else {
        setLoginE(true)
        setLoginL(false)
        setElevID(data.elevid)
    //elev
    //ikke lærer
    //lagre hvilken elevId eleven har
      }

    //gå til hjemme området
      navigate('./')
   
    } catch (error) {
      console.error('Fetch error:', error);
      console.log(error);
    }
  }
```
##### app.js
I app.js er det tre variabler. LoginL om brukeren er en lærer, LoginE om brukeren er en elev og om brukeren er en elev har den en ElevID.

```javascript
//importer useNavigate
import { useNavigate } from 'react-router-dom';

function App() {

  let navigate = useNavigate();

//lag variablen
  const [LoginL, setLoginL] = useState()
  const [LoginE, setLoginE] = useState()
  const [ElevID, setElevID] = useState()
  let homepage;

//hvis både LoginL og LoginE ikke er sanne er homepage loggedout komponenten 
  if (!LoginL && !LoginE){
    homepage = <Loggedout />;
  } else if (LoginL == true) {
    //hvis LoginL er sann er homepage Incert (som er der læreren kan gota eller avslå forespørsler)
    homepage = <Insert />;
  } else if (LoginE == true) {
    //hvis LoginE er sann er homepage Ettersporsel
    //sende ElevID til Ettersporsel
    homepage = <Ettersporsel ElevID={ElevID}/>;
  }

//logge ut
  function Logout() {
    setLoginE(false)
    setLoginL(false)
    setElevID(null)
    navigate('./')
  }

  return (
    <div className="App">

      <header className="App-header">
        <div className='buttons'>
        {/*knapp som tar brukeren til homepage*/}
          <button onClick={() => navigate('./')}> hjem </button>
        {/*knapp som tar brukeren til en full liste av utstyr*/}
          <button onClick={() => navigate('./Utstyrom')}> utstyrom </button>
        {/*knapp som tar brukeren til en liste av bare utstyr som er lånt ut*/}
          <button onClick={() => navigate('./Lantut')}> lånet ut </button>
        </div> {/*slutt buttons*/ }

        <div className='other_stuff'>
        {/*knapp som tar brukeren til login*/}
          <button onClick={() => navigate('./Login')}> Login </button>
        {/*knapp som logger ut brukeren*/}
          <button onClick={Logout}> logut </button>
        </div> {/*slutt other_stuff*/}

      </header>

      <div className='Info'>
      <Routes>
          <Route path="/" element={homepage } />
          <Route path="/Utstyrom" element={<Utstyrom />} />
          {/*sende ElevID til Lantut*/}
          <Route path="/Lantut" element={<Lantut ElevID={ElevID}/>} />
          {/*sende setLoginL, setLoginE og setElevID til Login*/}
          <Route path="/Login" element={<Login setLoginL={setLoginL} setLoginE={setLoginE} setElevID={setElevID}/>} />
          
       </Routes>
      </div>
    </div>
  );
}

export default App;
```
### komponenter

#### Utstyrom
    Utstyrom er en komponent der alt utstyret så det er mulig å låne vises 

##### frontend

importer som brukes i Utstyrom komponenten
```javascript
    import { useEffect } from 'react';
    import { useState } from 'react';
    import './App.css';
    import axios from 'axios';
```

hent data fra backend og leg dem i en variabel
```javascript

        //UtstyrData brukes for å lagre dataene som kommer fra backend
        const [UtstyrData, setUtstyrData] = useState([]);

        //når komponenten åpnes hent UtstyrData
        useEffect(() => {
            getUtstyrData();
        }, []);

        const getUtstyrData = () => {
            //send et get request til serveren med axios
                axios
                    .get("http://192.168.0.5:3001/utstyrom")
                    .then(response => {
                        //leg dataen fra backend in i UtstyrData
                        setUtstyrData(response.data);
                    })
                    .catch(error => console.log(error));
        }
```

lag en tabel får å vise dataene hentet fra backend
```javascript
    return(
        <table className="styled-table">
            <thead>
                <tr>
                    <th>utstyrID</th>
                    <th>venter på/har fått godkjenelse</th>
                    <th>utstyr_type</th>
                    <th>utstyr_modell</th>
                </tr>
            </thead>
            <tbody>
                {UtstyrData.map(utstyr => (
                    <tr key={utstyr.utstyrID}>
                        <td>{utstyr.utstyrID}</td>
                        <td>{utstyr.lanet_av}</td>
                        <td>{utstyr.utstyr_type}</td>
                        <td>{utstyr.utstyr_modell}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    )  
```
##### backend

serveren motar et get request fra frontend så bruker den connection.query får å sende et SELECT * FROM utstyrsromme som henter fram alt fra utstyrsrommet tabellen i databasen

```javascript
app.get('/utstyrom', (request, response) => {

    connection.query('SELECT * FROM utstyrsrommet;', function (error, results, fields) {
      if (error) throw error;
      response.send(JSON.stringify(results));
    });
    
})
```

#### ettersporsel

ettersporsel er elevene sit homepage her kan de se hvilke utstyr som er tilgjengelig og be om å låne utstyr

##### frontend

importer som brukes i ettersporsel komponenten
```javascript
    import { useEffect } from 'react';
    import { useState } from 'react';
    import './App.css';
    import axios from 'axios';

    //Ettersporsel tar imot ElevID som den får fra app.js
    export default function Ettersporsel({ElevID})
```

hent data fra backend og leg dem i en variabel
```javascript
    
    //UtstyrData brukes for å lagre dataene som kommer fra backend
    const [UtstyrData, setUtstyrData] = useState([]);


    const getUtstyrData = () => {
        //send et get request til serveren med axios
            axios
                .get("http://192.168.0.5:3001/utstyrom")
                .then(response => {
                    //leg dataen fra backend in i UtstyrData
                    setUtstyrData(response.data);
                })
                .catch(error => console.log(error));
    }

    useEffect(() => {
        //når komponenten åpnes hent UtstyrData
        getUtstyrData();

        // hent UtstyrData hvert sekund
        const interval = setInterval(() => {
            getUtstyrData();
        }, 500);

        return () => clearInterval(interval);
    }, []);
```

lag en tabel får å vise dataene hentet fra backend
```javascript
    return(
        <table className="styled-table">
            <thead>
                <tr>
                    <th>utstyrID</th>
                    <th>venter på/har fått godkjenelse</th>
                    <th>utstyr_type</th>
                    <th>utstyr_modell</th>
                    <th>be om</th>
                </tr>
            </thead>
            <tbody>
                {UtstyrData.map(utstyr => (
                    <tr key={utstyr.utstyrID}>
                        <td>{utstyr.utstyrID}</td>
                        <td>{utstyr.lanet_av}</td>
                        <td>{utstyr.utstyr_type}</td>
                        <td>{utstyr.utstyr_modell}</td>
                        {/*knappen får å be om utstyr vises bare hvis utstyr.lanet_av = null*/}
                        <td> {utstyr.lanet_av === null && (
                            {/*når knappen trykkes på sender den utstyr.utstyrID, utstyr.utstyr_type og utstyr.utstyr_modell til raden knappen var på til insertData*/}
                            <button onClick={() => insertData(Number(utstyr.utstyrID) String(utstyr.utstyr_type), String(utstyr.utstyr_modell))}> be om </button>
                            )}
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    )  
```

Når brukeren trykker på en rad sin knapp så sender insertData et post request til serveren med utstyrID, utstyr typen og utstyr modellen til raden den tilhørte. den sender også ElevID-en til eleven og dagens dato. 
```javascript
async function insertData(utstyrID, utstyr_type, utstyr_modell) {

    //finner dagens dato
    const date = new Date();
    const dateWithoutTime = date.toLocaleDateString();
    console.log(dateWithoutTime);

    //
    const userCredentials = {
      key1: `${utstyrID}`,
      key2: `${ElevID}`,
      key3: `${utstyr_type}`,
      key4: `${utstyr_modell}`,
      key5: `${dateWithoutTime}`
    };
   
    try {
    // sende et post request til serveren med fetch
      const response = await fetch('http://192.168.0.5:3001/beom', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userCredentials),
      });
   
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
   
      const data = await response.json();

    } catch (error) {
      console.error('Fetch error:', error);
      console.log(error);
    }
}
```

##### backend

backend tar imot variablene den får fra frontend så setter den de inn i to sqlquery-er den ene lager en ny rad i utlan tabelen og den andre sette lanet_av til å være ElevID-en til eleven som prøvde å låne utstyr i utstyrsrommet tabelen.

```javascript
app.post('/beom', async (req, res) => {
    //ta imot variabler fra frontend
  const { key1, key2, key3, key4, key5} = req.body;

    //lage ny rad i utlan tabelen
  let sqlquery = `INSERT INTO utlan(UtlanID, lanet_av, UtstyrID, utstyr_type, utsyr_modell_ID, lanet_ut_dato) VALUES (?,?,?,?,?,?);`;
  //endre lanet av i utstyrsrommet tabelen til ElevID-en til eleven
  let sqlquery2 = `UPDATE utstyrsrommet SET lanet_av = ? WHERE utstyrID = ?;`;

  connection.query(sqlquery, [null, key2, key1, key3, key4, key5], (err, results, fields) => {
      if (err) {
          res.status(500).json({ message: 'Database error' });
          return;
      }

      console.log(sqlquery);
  
      //den andre query-et skjer inni det første.
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
```

#### utlan

utlan er lærerens homepage. her kan læreren velge å godta eller avslå elever sine forespørsel om å låne utstyr

##### frontend

importer som brukes i utlan komponenten
```javascript
    import { useEffect } from 'react';
    import { useState } from 'react';
    import './App.css';
    import axios from 'axios';
```

hent data fra backend og leg dem i en variabel
```javascript
    //UtlanData brukes for å lagre dataene som kommer fra backend
    const [UtlanData, setUtlanData] = useState([]);
  
const getUtlanData = () => {
    //send et get request til serveren med axios
  axios
    .get("http://192.168.0.5:3001/utlan")
    .then(response => {
        //leg dataen fra backend in i UtlanData
      setUtlanData(response.data);
    })
    .catch(error => console.log(error));
}

  useEffect(() => {
    //når komponenten åpnes hent UtstyrData
    getUtlanData();

    // hent UtstyrData hvert sekund
    const interval = setInterval(() => {
      getUtlanData();
    }, 500);

    
    return () => clearInterval(interval);
  }, []);
```

lag en tabel får å vise dataene hentet fra backend
```javascript
    return(
       <table className="styled-table">
            <thead>
                <tr>
                    <th>UtlånID</th>
                    <th>Fulltnavn</th>
                    <th>UtstyrID</th>
                    <th>Utstyr type</th>
                    <th>Utstyr modell</th>
                    <th>Lånet ut dato</th>
                    <th>Godkjen?</th>
                </tr>
            </thead>
            <tbody>
                {UtlanData.map(utlan => (
                    <tr key={utlan.UtlanID}>
                        <td>{utlan.UtlanID}</td>
                        <td>{utlan.Fornavn} {utlan.Etternavn}</td>
                        <td>{utlan.utstyrID}</td>
                        <td>{utlan.utstyr_type}</td>
                        <td>{utlan.utsyr_modell_ID}</td>
                        <td>{utlan.lanet_ut_dato}</td>
                        {/*når godkjen knappen trykkes på sender den utlan.utstyrID, utlan.lanrt_av, utlan.utstyr_type, utlan.utsyr_modell, utlan.lanet_ut_dato og utlan.UtlanID til raden knappen var på til insertData*/}
                        {/*når avis knappen trykkes på sender den utlan.UtlanID og utlan.utstyrID til raden knappen var på til deleteData*/}
                        <td><button className='godkjen' onClick={() => insertData(utlan.utstyrID, utlan.lanet_av, utlan.utstyr_type, utlan.utsyr_modell_ID, utlan.lanet_ut_dato, utlan.UtlanID)}>godkjen</button> <button className='avis' onClick={() => deleteData(utlan.UtlanID, utlan.utstyrID)}>avis</button></td>
                    </tr>
                ))}
            </tbody>
        </table>
    )  
```

Når brukeren trykker på en rad sin godkjen knapp så sender insertData et post request til serveren med utstyrID, lanet_av utstyr_typen, utstyr_modellen, lanet_ut_dato-en og utlanID-en til raden den tilhørte. 
```javascript

//insertData tar imot variablene fra godkjen knappen
async function insertData(utstyrID, lanet_av, utstyr_type, utstyr_modell, lanet_ut_dato, utlanID) {

  const userCredentials = {
    key1: `${utstyrID}`,
    key2: `${lanet_av}`,
    key3: `${utstyr_type}`,
    key4: `${utstyr_modell}`,
    key5: `${lanet_ut_dato}`,
    key6: `${utlanID}`
  };
 
  try {
    // sende et post request til serveren med fetch
    const response = await fetch('http://192.168.0.5:3001/godkjen', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userCredentials),
    });
 
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
 
    const data = await response.json();
    console.log(data);
 
    if (data.message === 'itworked') {
      console.log('Check select');
    }
  } catch (error) {
    console.error('Fetch error:', error);
    console.log(error);
  }
}
```

```javascript
//deleteData tar imot variablene fra avis knappen
const deleteData = (delID, utstyrID) => {
  const endpoint = 'http://192.168.0.5:3001/delete';
        
  axios.delete(`${endpoint}/${delID}/${utstyrID}`)
    .then(response => {
      console.log('Row deleted successfully:', response.data);
    })
    .catch(error => {
      console.error('Error deleting row:', error);
    });
}
```

##### backend

/godkjen tar imot variablene den får fra frontend så setter den de inn i tre sqlquery-er den ene lager en ny rad i lantut tabelen og den andre sette lanet_av til å være ElevID-en til eleven som prøvde å låne utstyr i utstyrsrommet tabelen.

```javascript
app.post('/godkjen', async (req, res) => {
  const { key1, key2, key3, key4, key5, key6} = req.body;

  //lage ny rad i utlan tabelen
  let sqlquery = `INSERT INTO lantut(LantutID, lanet_av, utstyrID, utstyr_type, utsyr_modell_ID, lanet_ut_dato) VALUES (?,?,?,?,?,?);`;
  //endre lanet av i utstyrsrommet tabelen til ElevID-en til eleven
  let sqlquery2 = `UPDATE utstyrsrommet SET lanet_av = ? WHERE utstyrID = ?;`;
  //slette raden som læreren godkjente
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

            //den andre query-et skjer inni det første.
          console.log('Second query executed');
          res.status(200).send(JSON.stringify(results));

            //den tredje query-et skjer inni det andre.
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
```

/delete gjør det samme som /godkjen bare at den ikke gjør sqlquery

#### lantut

lantut komponenten viser utstyr som er lånt ut og lar eleven som lånte ut utstyre returnere den.

##### frontend

importer som brukes i utlan komponenten
```javascript
    import { useEffect } from 'react';
    import { useState } from 'react';
    import './App.css';
    import axios from 'axios';

    //lantut tar imot ElevID som den får fra app.js
    export default function Lantut({ElevID})
```

hent data fra backend og leg dem i en variabel
```javascript
    //LantutData brukes for å lagre dataene som kommer fra backend
    const [LantutData, setLantutData] = useState([]);

const getLantutData = () => {
    //send et get request til serveren med axios
        axios
            .get("http://192.168.0.5:3001/lantut")
            .then(response => {
                //leg dataen fra backend in i UtstyrData
                setLantutData(response.data);
            })
            .catch(error => console.log(error));
}

useEffect(() => {
    //når komponenten åpnes hent UtstyrData
    getLantutData();

    //hent LantutData hvert sekund
    const interval = setInterval(() => {
        getLantutData();
    }, 500);

    return () => clearInterval(interval);
}, []);
```

lag en tabel får å vise dataene hentet fra backend
```javascript
    return(
<table className="styled-table">
            <thead>
                <tr>
                    <th>LantutID</th>
                    <th>lanet_av</th>
                    <th>utstyrID</th>
                    <th>utstyr_type</th>
                    <th>utstyr_modell</th>
                    <th>lånt ut dato</th>
                    <th>returner</th>
                </tr>
            </thead>
            <tbody>
                {LantutData.map(lantut => (
                    <tr key={lantut.LantutID}>
                        <td>{lantut.LantutID}</td>
                        <td>{lantut.lanet_av}</td>
                        <td>{lantut.utstyrID}</td>
                        <td>{lantut.utstyr_type}</td>
                        <td>{lantut.utsyr_modell_ID}</td>
                        <td>{lantut.lanet_ut_dato}</td>
                        {/*hvis lantut.lanet_av og ElevID er like dukker knappen opp.*/}
                        <td>{lantut.lanet_av === ElevID && (
                                {/*når knappen trykkes på sender den lantut.lantutID og lantut.utstyrID, til raden knappen var på til insertData*/}
                                <button onClick={() => insertData(lantut.LantutID, lantut.utstyrID)}>returner</button>
                            )}
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    )  
```

Når brukeren trykker på en rad sin godkjen knapp så sender insertData et post request til serveren med utstyrID, lanet_av utstyr_typen, utstyr_modellen, lanet_ut_dato-en og utlanID-en til raden den tilhørte. 
```javascript

//insertData tar imot variablene fra knappen
async function insertData(LantutID, utstyrID) {

    const userCredentials = {
      key1: `${LantutID}`,
      key2: `${utstyrID}`,
    };
   
    try {
        // sende et post request til serveren med fetch
      const response = await fetch('http://192.168.0.5:3001/return', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userCredentials),
      });
   
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
   
      const data = await response.json();
      console.log(data);
   
      if (data.message === 'itworked') {
        console.log('Check select');
      }
    } catch (error) {
      console.error('Fetch error:', error);
      console.log(error);
    }
}
```

##### backend

backend tar imot variablene den får fra frontend så setter den de inn i to sqlquery-er den ene fjærner en rad fra lantut tabelen og den andre sette lanet_av til å være null i utstyrsrommet tabelen.

```javascript
app.post('/return', async (req, res) => {
  const { key1, key2} = req.body;;

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
```

## License

[MIT License](http://www.opensource.org/licenses/mit-license.php)

## Author

Silas Surland-Fjær

[cors-url]: https://npmjs.org/package/cors
[express-url]: https://www.npmjs.com/package/express
[bodyParser-url]: https://www.npmjs.com/package/body-parser
[react-router-dom-url]: https://www.npmjs.com/package/react-router-dom
[bcrypt]: https://www.npmjs.com/package/bcrypt
