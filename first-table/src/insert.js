import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useState } from 'react';
import './App.css';
import axios from 'axios';

export default function Update() {

const navigate = useNavigate();


async function insertData() {

  const userCredentials = {
    key1: `${Value1}`,
    key2: `${Value2}`,
    key3: `${Value3}`,
    key4: `${Value4}`,
    key5: `${Value5}`,
    key6: `${Value6}`,
    key7: `${Value7}`,
  };
 
  try {
    const response = await fetch('/insert', {
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

const[Value1, setInValue1] = useState()
const[Value2, setInValue2] = useState("")
const[Value3, setInValue3] = useState("")
const[Value4, setInValue4] = useState()
const[Value5, setInValue5] = useState("")
const[Value6, setInValue6] = useState("")
const[Value7, setInValue7] = useState()

const change1 = Event =>{
    setInValue1(Event.target.value)
}

const change2 = Event =>{
    setInValue2(Event.target.value)
}

const change3 = Event =>{
    setInValue3(Event.target.value)
}

const change4 = Event =>{
    setInValue4(Event.target.value)
}

const change5 = Event =>{
    setInValue5(Event.target.value)
}

const change6 = Event =>{
    setInValue6(Event.target.value)
}

const change7 = Event =>{
    setInValue7(Event.target.value)
}


return(
    <div className='hjem'>
        Lag en ny rad. Fyll in alle feltene så trykk på insert.
        <div className="table-container-insert">
            
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
                        <tr>
                            <td><input type='number' value={Value1} onChange={change1} className='insert'/></td>
                            <td><input type='text' value={Value2} onChange={change2} className='insert'/></td>
                            <td><input type='text' value={Value3} onChange={change3} className='insert'/></td>
                            <td><input type='number' value={Value4} onChange={change4} className='insert'/></td>
                            <td><input type='text' value={Value5} onChange={change5} className='insert'/></td>
                            <td><input type='text' value={Value6} onChange={change6} className='insert'/></td>
                            <td><input type='number' value={Value7} onChange={change7} className='insert'/></td> 
                        </tr>
                </tbody>
            </table>
        </div>
        <button onClick={insertData}> Insert </button>
    </div>

)

}