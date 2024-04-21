import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useState } from 'react';
import './App.css';
import axios from 'axios';

export default function Utstyr_modell() {
const [Utstyr_modellData, setUtstyr_modellData] = useState([]);


useEffect(() => {
    getUtstyr_modellData();
}, []);

const getUtstyr_modellData = () => {
        axios
            .get("http://localhost:3001/utstyr_modell")
            .then(response => {
                setUtstyr_modellData(response.data);
            })
            .catch(error => console.log(error));
}
return(
    <div className='selectBox'>
    <div className="table-container">
        
        <table className="styled-table">
            <thead>
                <tr>
                    <th>Utstyr modell ID</th>
                    <th>Utstyr type</th>
                    <th>Utstyr modell</th>
                </tr>
            </thead>
            <tbody>
                {Utstyr_modellData.map(Utstyr_modell => (
                    <tr key={Utstyr_modell.utsyr_modell_ID}>
                        <td>{Utstyr_modell.utsyr_modell_ID}</td>
                        <td>{Utstyr_modell.utsyr_type}</td>
                        <td>{Utstyr_modell.utstyr_modell}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    </div>
    </div>
)

}