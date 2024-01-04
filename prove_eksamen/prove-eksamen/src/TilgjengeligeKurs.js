import React from 'react'

export default function TilgjengeligeKurs({Sak, setSak, updateStatus}){

    return (
        <div className="tilgjengeligeKurs">
            <div className='nameOfBox'>
                <h1>Ikke ordnet</h1>                 
            </div>


            {
                    Sak && Sak.map(Sak=>{
                        if(Sak && Sak.status==='IkkeOrdnet')
                        return <>

                            <div className='kursNorsk' style={{backgroundColor: "#E54B4B"}}>
                                <p className="main" key={Sak.id}>    
                                    Sak: {Sak.sak} <br/> dato: {Sak.dato} <br/> epost: {Sak.epost} <br/> tlf: {Sak.tlf}
                                </p>           
                                <button style={{backgroundColor: "#B31919"}} className="mark_join" key={Sak.id} onClick={()=>{updateStatus(Sak.id,'Ordnet')}}>ordnet</button>
                            </div>

                        </>
                    })
            }


        </div>
    )
}