import { useEffect } from 'react';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import './App.css';
import axios from 'axios';
//bilder
import AP from './images/AP.jpg';
import Desktop from './images/desktop.jpg';
import Laptop from './images/laptop.jpg';
import Projektor from './images/projektor.jpg';

export default function ProduktSide({UserID}){

    const [Stk, setStk] = useState(1);
    const [Sum, setSum] = useState();
    const [ErrorMes, setErrorMes ]= useState("");

        let { id } = useParams();

    const [ProduktData, setProduktData] = useState([]);

    const getProduktData = () => {
            axios
                .get(`http://localhost:3001/produktside/${id}`)
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



    async function insertData(Stk, Sum, ProduktID, Navn, Bilde) {

        if (UserID === null) {
            setErrorMes("Vendligst login")
        } else {
            const userCredentials = {
                Stk: `${Stk}`,
                Sum: `${Sum}`,
                ProduktID: `${ProduktID}`,
                Navn: `${Navn}`,
                Bilde: `${Bilde}`,
                UserID: `${UserID}`
            };
        
            console.log(userCredentials)
        
            try {
            const response = await fetch('http://localhost:3001/bestil', {
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

    }


    const imageMap = {
        'AP': AP,
        'Laptop': Laptop,
        'Desktop': Desktop,
        'Projektor': Projektor,
    };



    const change1 = (event, maxAntall, Pris) => {
        let value = parseInt(event.target.value, 10);
        if (value < 1) {
            value = 1;
        } else if (value > maxAntall) {
            value = maxAntall;
        }
        setStk(value);
        setSum(value * Pris)
    }


    return(
        <div className='selectBox_p'>
            {ProduktData.map(produkt => (
                <tr key={produkt.ProduktID}>
                    {produkt.Antall > 0 && (<td>
                        <div className='Produktside'>
                            <img src={imageMap[produkt.Bilde]} alt='bilde av vare' className='Vare_Img'/>
                            <p className='Vare_text'>{produkt.Navn}</p>
                            <label> Antall: <input type='number' value={Stk} onChange={(event) => change1(event, produkt.Antall, produkt.Pris)}/></label> 
                            <p className='Vare_text'>På lager: {produkt.Antall}</p>
                            <p className='Vare_text'>pris: {produkt.Pris}kr</p>
                            <p>sum: {Sum} </p>
                            <p>{ErrorMes}</p>
                            <button onClick={() => insertData(Stk, Sum, produkt.ProduktID, produkt.Navn, produkt.Bilde)}> bestil </button>

                        </div>
                                
                    </td>)}
                </tr>
            ))}

        </div>
    )
}
