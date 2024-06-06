import { useEffect } from 'react';
import { useState } from 'react';
import './App.css';
import axios from 'axios';
//bilder
import appelsin_juice from './images/appelsin_juice.jpg';
import baguette from './images/baguette.jpg';
import burger from './images/burger.jpg';
import cola from './images/cola.jpg';
import eple_juice from './images/eple_juice.jpg'
import fanta from './images/fanta.jpg'
import frukt_salat from './images/frukt_salat.jpg'
import horn from './images/horn.jpg'
import jordbear_litago from './images/jordbear_litago.jpg'
import knekkebrod from './images/knekkebrod.jpg'
import mango from './images/mango.jpg'
import melk from './images/melk.jpg'
import nudler from './images/nudler.jpg'
import pepsi from './images/pepsi.jpg'
import pizza from './images/pizza.jpg'
import salat from './images/salat.jpg'
import sjokolade_litago from './images/sjokolade_litago.jpg'
import solo from './images/solo.jpg'
import Sorbet_Bringebear from './images/Sorbet_Bringebear.jpg'
import sprite from './images/sprite.jpg'
import toast from './images/toast.jpg';
import yoghurt from './images/yoghurt.jpg';

export default function Meny(){
    const [MenyData, setMenyData] = useState([]);

    const getMenyData = () => {
            axios
                .get("http://localhost:3001/meny")
                .then(response => {
                    setMenyData(response.data);
                })
                .catch(error => console.log(error));
    }

    useEffect(() => {
        // Initial data fetch
        getMenyData();

        // Polling every 1 seconds
        const interval = setInterval(() => {
            getMenyData();
        }, 500);

        // Clean-up
        return () => clearInterval(interval);
    }, []);



    async function insertData(Antall, MenyID) {

    
        const userCredentials = {
          key1: `${Antall}`,
          key2: `${MenyID}`
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


    const imageMap = {
        'appelsin_juice': appelsin_juice,
        'baguette': baguette,
        'burger': burger,
        'cola': cola,
        'eple_juice': eple_juice,
        'fanta': fanta,
        'frukt_salat': frukt_salat,
        'horn': horn,
        'jordbear_litago': jordbear_litago,
        'knekkebrod': knekkebrod,
        'mango': mango,
        'melk': melk,
        'nudler': nudler,
        'pepsi': pepsi,
        'pizza': pizza,
        'salat': salat,
        'sjokolade_litago': sjokolade_litago,
        'solo': solo,
        'Sorbet_Bringebear': Sorbet_Bringebear,
        'sprite': sprite,
        'toast': toast,
        'yoghurt': yoghurt
    };




    return(
        <div className='selectBox'>
        <div className="table-container">
            
            <table className="styled-table">
                <tbody>
                    {MenyData.map(meny => (
                            <tr key={meny.MenyID}>
                            {meny.Antall > 0 && (<td>
                                <div className='Vare_box'>
                                        <img src={imageMap[meny.img]} alt='bilde av vare' className='Vare_Img'/>
                                        <p className='Vare_text'>{meny.Vare}</p>
                                        <p className='Vare_text'>antall: {meny.Antall}</p>
                                        <p className='Vare_text'>pris: {meny.Pris}kr</p>
                                        <button onClick={() => insertData(meny.Antall, meny.MenyID)}> bestil </button>

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
