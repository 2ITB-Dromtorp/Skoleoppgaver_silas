import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useState } from 'react';
import './App.css';
import axios from 'axios';

export default function Update() {

const navigate = useNavigate();

const [ElevData, setElevData] = useState([]);


useEffect(() => {
    getElevData();
}, []);

const getElevData = () => {
        axios
            .get("http://localhost:3000/")
            .then(response => {
                setElevData(response.data);
            })
            .catch(error => console.log(error));
}

const updateData = () => {
    axios
        .get("http://localhost:3000/update/fornavn/Evla/4")
        .then(response => {
            console.log(response.data)
        })
        .catch(error => console.log(error));
}


const[InRow, setInRow] = useState("")
const[InContent, setInContent] = useState("")
const[InRow2, setInRow2] = useState("ElevID")
const[InContent2, setInContent2] = useState(1)

const change1 = Event =>{
    setInRow(Event.target.value)
}

const change2 = Event =>{
    setInContent(Event.target.value)
}

const change3 = Event =>{
    setInRow2(Event.target.value)
}

const change4 = Event =>{
    setInContent2(Event.target.value)
}



return(
    <div className='hjem'>
        UPDATE elev
        <br/>
        <label>
            SET <input type='text' value={InRow} onChange={change1}/> = <input type='text' value={InContent} onChange={change2}/>
        </label>
        <br/>
        <label>
            WHERE <input type='text' value={InRow2} onChange={change3}/> = <input type='text' value={InContent2} onChange={change4}/>
        </label>
        <br/>
        <button onClick={updateData}> Update </button>
    </div>

)

}