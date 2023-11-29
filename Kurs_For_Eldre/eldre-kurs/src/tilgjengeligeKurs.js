import React from 'react'

export default function TilgjengeligeKurs({Kurs, setKurs, updateStatus}){

    return (
        <div className="tilgjengeligeKurs">
            <div className='nameOfBox'>
                <h1>Tilgjengelige kurs</h1>                 
            </div>


            {
                    Kurs && Kurs.map(Kurs=>{
                        if(Kurs && Kurs.status==='TilgjengeligeKurs')
                        return <>

                            <div className='kursNorsk'>
                                {Kurs.img}
                                <p className="main" key={Kurs.id}>
                                    
                                {Kurs.kurs} <br/> {Kurs.tid} 
                                </p>           
                                <button  className="mark_join" key={Kurs.id} onClick={()=>{updateStatus(Kurs.id,'DineKurs')}}>Bli med!</button>
                            </div>

                        </>
                    })
            }


        </div>
    )
}