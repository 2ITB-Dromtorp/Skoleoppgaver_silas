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

export default function Produkter(){

    let navigate = useNavigate();

    const [ProduktData, setProduktData] = useState([]);

    const getProduktData = () => {
            axios
                .get("http://localhost:3001/produkter")
                .then(response => {
                    setProduktData(response.data);
                })
                .catch(error => console.log(error));
    }

    useEffect(() => {
        // Initial data fetch
        getProduktData();

        // Polling every 1 seconds
        const interval = setInterval(() => {
            getProduktData();
        }, 500);

        // Clean-up
        return () => clearInterval(interval);
    }, []);



    async function Produktside(ProduktID) {

        navigate(`/produktside/${ProduktID}`)

    }


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
                    {ProduktData.map(produkt => (
                            <tr key={produkt.ProduktID}>
                            {produkt.Antall > 0 && (<td>
                                <div className='Vare_box'>
                                        <img src={imageMap[produkt.Bilde]} alt='bilde av vare' className='Vare_Img'/>
                                        <p className='Vare_text'>{produkt.Navn}</p>
                                        <p className='Vare_text'>antall: {produkt.Antall}</p>
                                        <p className='Vare_text'>pris: {produkt.Pris}kr</p>
                                        <button onClick={() => Produktside(produkt.ProduktID)}> Se mer </button>

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
