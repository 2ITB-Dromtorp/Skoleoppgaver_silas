import { useEffect } from 'react';
import { useState } from 'react';
import './App.css';
import axios from 'axios';


export default function Insert() {

const [UtlanData, setUtlanData] = useState([]);
  
const getUtlanData = () => {
  axios
    .get("http://192.168.0.5:3001/utlan")
    .then(response => {
      setUtlanData(response.data);
    })
    .catch(error => console.log(error));
}

  useEffect(() => {
    getUtlanData();

  
    const interval = setInterval(() => {
      getUtlanData();
    }, 500); 

    return () => clearInterval(interval);
  }, []);

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

async function insertData(utstyrID, lanet_av, utstyr_type, utstyr_modell, lanet_ut_dato, utlanID) {

  const userCredentials = {
    key1: `${utstyrID}`,
    key2: `${lanet_av}`,
    key3: `${utstyr_type}`,
    key4: `${utstyr_modell}`,
    key5: `${lanet_ut_dato}`,
    key6: `${utlanID}`
  };

  console.log(userCredentials)
 
  try {
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

return(
  <div className='hjem'>

  <div className='selectBox'>
    <div className="utlan-container">
        
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
                        <td><button className='godkjen' onClick={() => insertData(utlan.utstyrID, utlan.lanet_av, utlan.utstyr_type, utlan.utsyr_modell_ID, utlan.lanet_ut_dato, utlan.UtlanID)}>godkjen</button> <button className='avis' onClick={() => deleteData(utlan.UtlanID, utlan.utstyrID)}>avis</button></td>
                    </tr>
                ))}
            </tbody>
        </table>
    </div>
    </div>

</div>
)

}