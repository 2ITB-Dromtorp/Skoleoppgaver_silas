import { useEffect } from 'react';
import { useState } from 'react';
import './App.css';
import axios from 'axios';

export default function Select() {
    const [ElevData, setElevData] = useState([]);


useEffect(() => {
    getElevData();
}, []);

const getElevData = () => {
        axios
            .get("http://192.168.0.5:3001/elev")
            .then(response => {
                setElevData(response.data);
            })
            .catch(error => console.log(error));
}

return(
    <div className='selectBox'>
    <div className="table-container-insert">
        
        <table className="styled-table">
            <thead>
                <tr>
                    <th>ElevID</th>
                    <th>Navn</th>
                    <th>Klasse</th>
                    <th>tlf</th>
                    <th>Epost</th>
                </tr>
            </thead>
            <tbody>
                {ElevData.map(elev => (
                    <tr key={elev.ElevID}>
                        <td>{elev.ElevID}</td>
                        <td>{elev.Fornavn} {elev.Etternavn}</td>
                        <td>{elev.Navn}</td>
                        <td>{elev.tlf}</td>
                        <td>{elev.epost}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    </div>
    </div>
)

}