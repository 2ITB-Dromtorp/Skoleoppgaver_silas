import React from 'react'

export default function TilgjengeligeKurs({Kurs, setKurs, updateStatus}){

    return (
        <div className="tilgjengeligeKurs">
            <div className='nameOfBox'>
                <h1>tilgjengelige Kurs</h1>                 
            </div>


            {
                    Kurs && Kurs.map(Kurs=>{
                        if(Kurs && Kurs.status==='TilgjengeligeKurs')
                        return <>

                            <div className='kursNorsk'>
                                <p className="main" key={Kurs.id}>
                                    
                                    {Kurs.kurs} <br/> {Kurs.tid} <button  className="mark_join" key={Kurs.id} onClick={()=>{updateStatus(Kurs.id,'DineKurs')}}>Bli med!</button>
                                </p>                            
                            </div>

                        </>
                    })
            }


        </div>
    )
}