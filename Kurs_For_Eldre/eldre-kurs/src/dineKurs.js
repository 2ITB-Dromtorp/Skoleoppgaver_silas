import React from 'react'

export default function DineKurs({Kurs, setKurs, updateStatus}){

    return (
        <div className="dineKurs">
            <h1>Dine kurs</h1> 

            {
                    Kurs && Kurs.map(Kurs=>{
                        if(Kurs && Kurs.status==='DineKurs')
                        return <><p className="main" key={Kurs.id}>{Kurs.kurs} <button  className="mark_leave" key={Kurs.id} onClick={()=>{updateStatus(Kurs.id,'TilgjengeligeKurs')}}>Forlat kurs</button></p></>
                    })
            }
        </div>
    )
}