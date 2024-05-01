import { useEffect } from 'react';
import { useState } from 'react';
import './App.css';
import axios from 'axios';

export default function Lantut({ElevID}) {
    const [LantutData, setLantutData] = useState([]);

const getLantutData = () => {
        axios
            .get("http://192.168.0.5:3001/lantut")
            .then(response => {
                setLantutData(response.data);
            })
            .catch(error => console.log(error));
}

useEffect(() => {
    // Initial data fetch
    getLantutData();

    // Polling every 1 seconds
    const interval = setInterval(() => {
        getLantutData();
    }, 500); // 1000 milliseconds = 1 seconds

    // Clean-up
    return () => clearInterval(interval);
}, []);

async function insertData(LantutID, utstyrID) {

    const userCredentials = {
      key1: `${LantutID}`,
      key2: `${utstyrID}`,
    };

    console.log(userCredentials)
   
    try {
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

return(
    <div className='selectBox'>
    <div className="table-container">
        
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
                        <td>{lantut.lanet_av === ElevID && (
                                <button onClick={() => insertData(lantut.LantutID, lantut.utstyrID)}>returner</button>
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