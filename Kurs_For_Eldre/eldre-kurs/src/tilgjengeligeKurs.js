import React from 'react'

export default function TilgjengeligeKurs({Kurs, setKurs, updateStatus}){

    return (
        <div className="tilgjengeligeKurs">
            <h1>tilgjengelige Kurs</h1> 

            {
                    Kurs && Kurs.map(Kurs=>{
                        if(Kurs && Kurs.status==='TilgjengeligeKurs')
                        return <><p className="main" key={Kurs.id}>{Kurs.kurs} <button  className="mark_join" key={Kurs.id} onClick={()=>{updateStatus(Kurs.id,'DineKurs')}}>Bli med!</button></p></>
                    })
            }


        </div>
    )
}