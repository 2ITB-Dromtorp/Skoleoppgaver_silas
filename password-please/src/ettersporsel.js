import { useEffect } from 'react';
import { useState } from 'react';
import './App.css';
import axios from 'axios';

export default function Ettersporsel({ElevID}) {
    const [UtstyrData, setUtstyrData] = useState([]);

const getUtstyrData = () => {
        axios
            .get("http://192.168.0.5:3001/utstyrom")
            .then(response => {
                setUtstyrData(response.data);
            })
            .catch(error => console.log(error));
}

useEffect(() => {
    // Initial data fetch
    getUtstyrData();

    // Polling every 1 seconds
    const interval = setInterval(() => {
        getUtstyrData();
    }, 500);

    // Clean-up
    return () => clearInterval(interval);
}, []);

async function insertData(utstyrID, utstyr_type, utstyr_modell) {

    const date = new Date();
    const dateWithoutTime = date.toLocaleDateString();
    console.log(dateWithoutTime);

    const userCredentials = {
      key1: `${utstyrID}`,
      key2: `${ElevID}`,
      key3: `${utstyr_type}`,
      key4: `${utstyr_modell}`,
      key5: `${dateWithoutTime}`
    };

    console.log(userCredentials)
   
    try {
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
    <div className='selectBox'>
        <p> for å låne noe utstyr trykk på "be om" knappen så vent på godkjenelse fra en lærer</p>
    <div className="table-container">
        
        <table className="styled-table">
            <thead>
                <tr>
                    <th>utstyrID</th>
                    <th>venter på/har fått godkjennelse</th>
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
                        <td> {utstyr.lanet_av === null && (
                            <button onClick={() => insertData(Number(utstyr.utstyrID), String(utstyr.utstyr_type), String(utstyr.utstyr_modell))}> be om </button>
                            )}
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    </div>
    </div>
)

}