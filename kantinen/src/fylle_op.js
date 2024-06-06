import { useEffect } from 'react';
import { useState } from 'react';
import './App.css';
import axios from 'axios';

export default function FylleOp(){


    const [MenyData, setMenyData] = useState([]);
    const [inputValues, setInputValues] = useState({});

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
          const response = await fetch('http://localhost:3001/fylle_op', {
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

        } catch (error) {
          console.error('Fetch error:', error);
          console.log(error);
        }
    }


    const handleInputChange = (event, MenyID) => {
        const { value } = event.target;
        setInputValues({
            ...inputValues,
            [MenyID]: value
        });
    }



    return(
        <div className='selectBox'>
        <div className="table-container">
            
            <table className="styled-table">
                <tbody>
                    {MenyData.map(meny => (
                            <tr key={meny.MenyID}>
                                <td>
                                <div className='Vare_box'>
                                <p className='Vare_text'>{meny.Vare}</p>
                                <p className='Vare_text'>antall: {meny.Antall}</p>
                                <p className='Vare_text'>pris: {meny.Pris}</p>
                                <input
                                        type='number'
                                        value={inputValues[meny.MenyID] || ""}
                                        onChange={(event) => handleInputChange(event, meny.MenyID)}
                                    />
                                    <button onClick={() => insertData(inputValues[meny.MenyID] || 0, meny.MenyID)}>
                                        bestil
                                    </button>
                                </div>
                                
                                </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
        </div>
    )
}