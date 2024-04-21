import { useEffect } from 'react';
import { useState } from 'react';
import './App.css';
import axios from 'axios';

export default function Update() {

const [UtlanData, setUtlanData] = useState([]);

useEffect(() => {
  getUtlanData();
}, []);
  
const getUtlanData = () => {
  axios
    .get("http://localhost:3001/utlan")
    .then(response => {
      setUtlanData(response.data);
    })
    .catch(error => console.log(error));
}



async function insertData() {

  const userCredentials = {
    key1: `${Value1}`,
    key2: `${Value2}`,
    key3: `${Value3}`,
    key4: `${Value4}`,
    key5: `${Value5}`,
    key6: `${Value6}`,
  };
 
  try {
    const response = await fetch('http://localhost:3001/insert', {
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
const[Value2, setInValue2] = useState()
const[Value3, setInValue3] = useState()
const[Value4, setInValue4] = useState()
const[Value5, setInValue5] = useState(Date())
const[Value6, setInValue6] = useState()

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

const deleteData = () => {
  const endpoint = 'http://localhost:3001/delete';
        
  axios.delete(`${endpoint}/${Del}`)
    .then(response => {
      console.log('Row deleted successfully:', response.data);
    })
    .catch(error => {
      console.error('Error deleting row:', error);
    });
}

const[Del, setDel] = useState()

const Del1 = Event =>{
  setDel(Event.target.value)
}



return(
  <div className='hjem'>
    Lag en ny rad. Fyll in alle feltene så trykk på insert.
  <div className="table-container-insert">
            
    <table className="styled-table">
      <thead>
        <tr>
          <th>UtlanID</th>
          <th>lanet_av</th>
          <th>utstyr_type</th>
          <th>utstyr_modell</th>
          <th>lanet_ut_dato</th>
          <th>godkjent_av</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td><input type='number' value={Value1} onChange={change1} className='insert'/></td>
          <td><input type='number' value={Value2} onChange={change2} className='insert'/></td>
          <td><input type='number' value={Value3} onChange={change3} className='insert'/></td>
          <td><input type='number' value={Value4} onChange={change4} className='insert'/></td>
          <td><input type='date' value={Value5} onChange={change5} className='insert'/></td>
          <td><input type='number' value={Value6} onChange={change6} className='insert'/></td>
        </tr>
      </tbody>
    </table>
  </div>

  <button onClick={insertData}> Insert </button>

  <div className='selectBox'>
    <div className="utlan-container">
        
        <table className="styled-table">
            <thead>
                <tr>
                    <th>UtlånID</th>
                    <th>lånet av</th>
                    <th>utstyr type</th>
                    <th>utstyr modell</th>
                    <th>lånet ut dato</th>
                    <th>godkjent av</th>
                </tr>
            </thead>
            <tbody>
                {UtlanData.map(utlan => (
                    <tr key={utlan.UtlanID}>
                        <td>{utlan.UtlanID}</td>
                        <td>{utlan.lanet_av}</td>
                        <td>{utlan.utstyr_type}</td>
                        <td>{utlan.utstyr_modell}</td>
                        <td>{utlan.lanet_ut_dato}</td>
                        <td>{utlan.godkjent_av}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    </div>
    </div>

    <br/>
  <label>
    Skriv in UtlanID-en til raden du vil slette <input type='number' value={Del} onChange={Del1}/>
  </label>
  <br/>
  <button onClick={deleteData}> Delete </button>

</div>
)

}