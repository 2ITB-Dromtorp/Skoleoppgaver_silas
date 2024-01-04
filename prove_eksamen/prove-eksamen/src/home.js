import './App.css';
import { useNavigate } from 'react-router-dom';
import { createElement, useEffect } from 'react';
import { useState } from 'react';
import DineKurs from './dineKurs';
import TilgjengeligeKurs from './TilgjengeligeKurs';
import Popup from './comp/popup'
import Kvitering from './comp/kvitering';
import { GoAlert } from "react-icons/go";
import { MdOutlineAddAlert } from "react-icons/md";

export default function Home() {

const navigate = useNavigate();

const [Sak, setSak] = useState([
    {
        id: 1,
        sak:'hvordan lage bruker på serveren',
        epost: 'VTHansat1@gmail.com',
        tlf: 24827221,
        dato: '2023-12-13',
        status:'IkkeOrdnet'
    },
    {
        id: 2,
        sak:'hva er IP-adressen min',
        epost: 'VTHansat2@gmail.com',
        tlf: 94502635,
        dato: '2023-12-13',
        status:'IkkeOrdnet'
    },
    {
        id: 3,
        sak:'hvordan laste ned filezilla server',
        epost: 'VTHansat5@gmail.com',
        tlf: 30293514,
        dato: '2023-12-13',
        status:'IkkeOrdnet'
    },
])

const updateStatus=(id,newStatus)=>{
    let allSak=Sak;
    allSak=allSak.map(Sak=>{
        if(Sak.id===id){
            console.log('in here')
            Sak.status=newStatus;
        }
    return Sak
    })
    setSak(allSak)
}

const [ButtonPopup, setButtonPopup] = useState(false);
const [ButtonKvitering, setButtonKvitering] = useState(false);

function report() {
    setButtonPopup(true)
}

const[InID, setInID] = useState(3);
const[InSak, setInSak] = useState("");
const[InEmail, setInEmail] = useState("");
const[InDato, setInDato] = useState("");
const[InTLF, setInTLF] = useState("");
let ErrorMes = "";

const change1 = Event =>{
    setInEmail(Event.target.value)

}

const change2 = Event =>{
    setInSak(Event.target.value)
}

const change3 = Event =>{
    setInTLF(Event.target.value)
}

const change4 = Event =>{
    setInDato(Event.target.value)
}

const reportIn = () =>{
    const nySak ={
        id: InID+1,
        sak: InSak,
        epost: InEmail,
        tlf: InTLF,
        dato: InDato,
        status: "IkkeOrdnet"
    }

    if (InSak.length == 0 || InEmail.length == 0 || InTLF.length == 0 || InDato.length == 0) {
        console.log("fyll in alle feltene")
    } else {
        setSak([...Sak, nySak])
        setInID(InID+1)
        console.log(Sak);
        console.log(nySak);
        setButtonPopup(false)
        setInDato("");
        setInSak("");
        setInEmail("");
        setInTLF()
    }
}

return(
    <div className='hjem'>
        <header>
            <p className='DontMindMe'>i am not real</p>
            <h1>Brukerstøtte</h1>
            <button onClick={report}> <GoAlert /> raporter problem <GoAlert /> </button>
        </header>
        <div className='main'>

            <DineKurs Sak={Sak} setSak={setSak} updateStatus={updateStatus}/>
            <TilgjengeligeKurs Sak={Sak} setSak={setSak} updateStatus={updateStatus}/>
        
        </div>
        
        <Popup trigger={ButtonPopup} setTrigger={setButtonPopup}>
                <h2> Raporter et problem: </h2>

                
                    <label>
                            Sak: <br/> <input type='text' value={InSak} onChange={change2}/> 
                    </label>
                    <br/>
                    <label>
                            epost: <br/> <input type='email' value={InEmail} onChange={change1}/> 
                    </label>
                    <br/>
                    <label>
                            tlf: <br/> <input type='tlf' value={InTLF} onChange={change3}/> 
                    </label>
                    <br/>
                    <label>
                            dato: <br/> <input type='date' value={InDato} onChange={change4}/> 
                    </label>
                    <br/>           

                    <p> {ErrorMes} </p>

                <p>når du har fyllt in alle feltene trykk på raporter</p>
                <button onClick={reportIn} className='report-btn'> <MdOutlineAddAlert /> raporter <MdOutlineAddAlert /> </button>
        </Popup>


    </div>

)

}
