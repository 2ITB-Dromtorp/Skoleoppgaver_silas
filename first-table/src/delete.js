import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useState } from 'react';
import './App.css';
import axios from 'axios';

export default function Update() {

const navigate = useNavigate();

const deleteData = () => {
    /*
    axios
        .get(`http://localhost:3000/delete/${Value1}/`)
        .then(response => {
            console.log(response.data)
        })
        .catch(error => console.log(error));
    */
        const endpoint = '/delete';
        
        axios.delete(`${endpoint}/${Value1}`)
          .then(response => {
            console.log('Row deleted successfully:', response.data);
          })
          .catch(error => {
            console.error('Error deleting row:', error);
          });
}

const[Value1, setInValue1] = useState()

const change1 = Event =>{
    setInValue1(Event.target.value)
}



return(
    <div className='hjem'>
        Slett en rad.
        <br/>
        <label>
            Skriv in ElevID-en til raden du vil slette <input type='number' value={Value1} onChange={change1}/>
        </label>
        <br/>
        <button onClick={deleteData}> Delete </button>
    </div>

)

}