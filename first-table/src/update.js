import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useState } from 'react';
import './App.css';
import axios from 'axios';

export default function Update() {

const navigate = useNavigate();

const updateData = () => {
    /*axios
        .get(`http://localhost:3000/update/${InField}/${InContent}/${InNum}`)
        .then(response => {
            console.log(response.data)
        })
        .catch(error => console.log(error));
        */


        const url = 'http://localhost:3000/update';
        const data = {
             field: InField, newhobby: InContent, id: InNum 
        };
        
        axios.put(url, data)
          .then(response => {
            console.log('Response:', response.data);
          })
          .catch(error => {
            console.error('Error:', error);
          });
}

const[InField, setInField] = useState("")
const[InContent, setInContent] = useState("")
const[InNum, setInNum] = useState()

const change1 = Event =>{
    setInField(Event.target.value)
}

const change2 = Event =>{
    setInContent(Event.target.value)
}

const change4 = Event =>{
    setInNum(Event.target.value)
}



return(
    <div className='hjem'>
        Endre på et eksisterende felt.
        <br/>
        <label>
            hvilket felt du vil oppdatere <input type='text' value={InField} onChange={change1}/>
        </label>
        <br/>
        <label>
            hva du vil endre det til <input type='text' value={InContent} onChange={change2}/>
        </label>
        <br/>
        <label>
            hvilken rad vil du endre det på (elevID) <input type='number' value={InNum} onChange={change4}/>
        </label>
        <br/>
        <button onClick={updateData}> Update </button>
    </div>

)

}