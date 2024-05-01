import { useEffect } from 'react';
import { useState } from 'react';
import './App.css';
import axios from 'axios';

export default function Utstyrom() {
    const [UtstyrData, setUtstyrData] = useState([]);


useEffect(() => {
    getUtstyrData();
}, []);

const getUtstyrData = () => {
        axios
            .get("http://192.168.0.5:3001/utstyrom")
            .then(response => {
                setUtstyrData(response.data);
            })
            .catch(error => console.log(error));
}

return(
    <div className='selectBox'>
    <div className="table-container">
        
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
    </div>
    </div>
)

}