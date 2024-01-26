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
            .get("/")
            .then(response => {
                setElevData(response.data);
            })
            .catch(error => console.log(error));
}

return(
    <div className='selectBox'>
    <div className="table-container">
        
        <table className="styled-table">
            <thead>
                <tr>
                    <th>ElevID</th>
                    <th>Fornavn</th>
                    <th>Etternavn</th>
                    <th>Klasse</th>
                    <th>Hobby</th>
                    <th>Kjønn</th>
                    <th>DatamaskinID</th>
                </tr>
            </thead>
            <tbody>
                {ElevData.map(elev => (
                    <tr key={elev.ElevID}>
                        <td>{elev.ElevID}</td>
                        <td>{elev.Fornavn}</td>
                        <td>{elev.Etternavn}</td>
                        <td>{elev.Klasse}</td>
                        <td>{elev.Hobby}</td>
                        <td>{elev.Kjonn}</td>
                        <td>{elev.DatamaskinID}</td> 
                    </tr>
                ))}
            </tbody>
        </table>
    </div>
    </div>
)

}