import { useEffect } from 'react';
import { useState } from 'react';
import './App.css';
import axios from 'axios';

export default function Klasser() {
    const [KlasseData, setKlasseData] = useState([]);


useEffect(() => {
    getKlasseData();
}, []);

const getKlasseData = () => {
        axios
            .get("http://localhost:3001/klasser")
            .then(response => {
                setKlasseData(response.data);
            })
            .catch(error => console.log(error));
}

const [LaererData, setLaererData] = useState([]);


useEffect(() => {
    getLaererData();
}, []);

const getLaererData = () => {
        axios
            .get("http://localhost:3001/laerere")
            .then(response => {
                setLaererData(response.data);
            })
            .catch(error => console.log(error));
}

return(
    <div className='selectBox'>
    <div className="table-container-insert">
        
        <table className="styled-table">
            <thead>
                <tr>
                    <th>KasseID</th>
                    <th>navn</th>
                    <th>kontaktlærer</th>
                </tr>
            </thead>
            <tbody>
                {KlasseData.map(klasse => (
                    <tr key={klasse.KlasseID}>
                        <td>{klasse.KlasseID}</td>
                        <td>{klasse.Navn}</td>
                        <td>{klasse.Kontakt_laerer}</td>
                    </tr>
                ))}
            </tbody>
        </table>

        <br/>

        <table className="styled-table">
            <thead>
                <tr>
                    <th>laererID</th>
                    <th>navn</th>
                </tr>
            </thead>
            <tbody>
                {LaererData.map(laerer => (
                    <tr key={laerer.laererID}>
                        <td>{laerer.laererID}</td>
                        <td>{laerer.Navn}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    </div>
    </div>
)

}