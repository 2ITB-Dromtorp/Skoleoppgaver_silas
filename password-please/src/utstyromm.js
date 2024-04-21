import { useEffect } from 'react';
import { useState } from 'react';
import './App.css';
import axios from 'axios';

export default function Utstyromm() {
    const [UtstyrData, setUtstyrData] = useState([]);


useEffect(() => {
    getUtstyrData();
}, []);

const getUtstyrData = () => {
        axios
            .get("http://localhost:3001/utstyromm")
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
                    <th>lanet_av</th>
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