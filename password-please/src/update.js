import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useState } from 'react';
import './App.css';
import axios from 'axios';

export default function Update() {
const [Utstyr_typeData, setUtstyr_typeData] = useState([]);


useEffect(() => {
    getUtstyr_typeData();
}, []);

const getUtstyr_typeData = () => {
        axios
            .get("http://localhost:3001/utstyr_type")
            .then(response => {
                setUtstyr_typeData(response.data);
            })
            .catch(error => console.log(error));
}
return(
    <div className='selectBox'>
    <div className="table-container-insert">
        
        <table className="styled-table">
            <thead>
                <tr>
                    <th>Utstyr type ID</th>
                    <th>Utstyr type</th>
                </tr>
            </thead>
            <tbody>
                {Utstyr_typeData.map(Utstyr_type => (
                    <tr key={Utstyr_type.utsyr_type_ID}>
                        <td>{Utstyr_type.utsyr_type_ID}</td>
                        <td>{Utstyr_type.utstyr_type}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    </div>
    </div>
)

}