import { useEffect } from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './App.css';
import axios from 'axios';
//bilder
import AP from './images/AP.jpg';
import Desktop from './images/desktop.jpg';
import Laptop from './images/laptop.jpg';
import Projektor from './images/projektor.jpg';

export default function Bestilinger({UserID}){

    let navigate = useNavigate();

    const [BestilingData, setBestilingData] = useState([]);

    const getBestilingData = () => {
            axios
                .get("http://localhost:3001/bestilinger")
                .then(response => {
                    setBestilingData(response.data);
                })
                .catch(error => console.log(error));
    }

    useEffect(() => {
        // Initial data fetch
        getBestilingData();

        // Polling every 1 seconds
        const interval = setInterval(() => {
            getBestilingData();
        }, 500);

        // Clean-up
        return () => clearInterval(interval);
    }, []);


    const imageMap = {
        'AP': AP,
        'Laptop': Laptop,
        'Desktop': Desktop,
        'Projektor': Projektor,
    };




    return(
        <div className='selectBox'>
        <div className="table-container">
            
            <table className="styled-table">
                <tbody>
                    {BestilingData.map(bestiling => (
                            <tr key={bestiling.ProduktID}>
                            {bestiling.KundeID === UserID && (<td>
                                <div className='Vare_box'>
                                        <img src={imageMap[bestiling.Bilde]} alt='bilde av vare' className='Vare_Img'/>
                                        <p className='Vare_text'>{bestiling.Navn}</p>
                                        <p className='Vare_text'>antall: {bestiling.Antall}</p>
                                        <p className='Vare_text'>total sum: {bestiling.Sum}kr</p>

                                </div>
                                
                            </td>)}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
        </div>
    )
}
