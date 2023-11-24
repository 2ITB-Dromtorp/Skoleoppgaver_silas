import React from 'react'
import Popup from './comp/popup'
import Kvitering from './comp/kvitering';
import { useState } from 'react';

export default function DineKurs({Kurs, setKurs, updateStatus}){

    const [ButtonPopup, setButtonPopup] = useState(false);
    const [ButtonKvitering, setButtonKvitering] = useState(false);

    function signUp() {
        setButtonPopup(true)
    }

    function ja() {
        setButtonPopup(false)
        setButtonKvitering(true)
    }

    function nei() {
        setButtonPopup(false)
    }

    return (
        <div className="dineKurs">
            <div className='nameOfBox'>
                <h1>Dine kurs</h1>               
            </div>
            <button onClick={signUp}>Bekreft kurs</button>

            {
                    Kurs && Kurs.map(Kurs=>{
                        if(Kurs && Kurs.status==='DineKurs')
                        return <>
                            <div className='kursNorsk'>
                                <p className="main" key={Kurs.id}>
                                    
                                    {Kurs.kurs} <br/> {Kurs.tid} <button  className="mark_leave" key={Kurs.id} onClick={()=>{updateStatus(Kurs.id,'TilgjengeligeKurs')}}>avbestill kurs</button>
                                </p>                            
                            </div>

                        </>
                    })
            }
            
            <Popup trigger={ButtonPopup} setTrigger={setButtonPopup}>
                <h2> Du er med i: </h2>
                <div className='kursBoks'>
                    {
                            Kurs && Kurs.map(Kurs=>{
                                if(Kurs && Kurs.status==='DineKurs')
                                return <>
                                    <div className='kursNorsk'>
                                        <p className="main" key={Kurs.id}>
                                            
                                            {Kurs.kurs} <br/> {Kurs.tid}
                                        </p>                            
                                    </div>

                                </>
                            })
                    }                    
                </div>

                <p>Trykk på ja for å bekrefte dette. eller trykk på nei vis noe er feil</p>
                <button onClick={ja}>Ja</button>
                <button onClick={nei}>Nei</button>
            </Popup>

            <Kvitering trigger={ButtonKvitering} setTrigger={setButtonKvitering}>
            <p>takk for at du meldte deg på: </p> 
            <div className='kursBoks'>
                {
                        Kurs && Kurs.map(Kurs=>{
                            if(Kurs && Kurs.status==='DineKurs')
                            return <>
                                <div className='kursNorsk'>
                                    <p className="main" key={Kurs.id}>
                                        
                                        {Kurs.kurs} <br/> {Kurs.tid}
                                    </p>                            
                                </div>

                            </>
                        })
                }                
            </div>

            </Kvitering>


        </div>
    )
}