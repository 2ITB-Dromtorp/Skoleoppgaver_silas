import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useState } from 'react';
import './App.css';
import axios from 'axios';

export default function Update() {

const navigate = useNavigate();

const insertData = () => {
    axios
        .get(`http://localhost:3000/insert/${Value1}/${Value2}/${Value3}/${Value4}/${Value5}/${Value6}/${Value7}`)
        .then(response => {
            console.log(response.data)
        })
        .catch(error => console.log(error));
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
        INSERT elev
        <br/>
        <label>
            hva vil du sette in i ElevID <input type='number' value={Value1} onChange={change1}/>
        </label>
        <br/>
        <label>
            hva vil du sette in i Fornavn <input type='text' value={Value2} onChange={change2}/>
        </label>
        <br/>
        <label>
            hva vil du sette in i Etternavn <input type='text' value={Value3} onChange={change3}/>
        </label>
        <br/>
        <label>
            hva vil du sette in i Klasse <input type='number' value={Value4} onChange={change4}/>
        </label>
        <br/>
        <label>
            hva vil du sette in i Hobby <input type='text' value={Value5} onChange={change5}/>
        </label>
        <br/>
        <label>
            hva vil du sette in i Kjonn <input type='text' value={Value6} onChange={change6}/>
        </label>
        <br/>
        <label>
            hva vil du sette in i DatamaskinID <input type='number' value={Value7} onChange={change7}/>
        </label>
        <br/>
        <button onClick={insertData}> Insert </button>
    </div>

)

}