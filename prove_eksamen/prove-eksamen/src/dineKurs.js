import React from 'react'
import { useState } from 'react';


export default function DineKurs({Sak, setSak, updateStatus}){

    return (
        <div className="dineKurs">
            <div className='nameOfBox'>
                <h1 style={{color: "#748E54"}}>ordnet</h1>               
            </div>

            {
                    Sak && Sak.map(Sak=>{
                        if(Sak && Sak.status==='Ordnet')
                        return <>
                            <div className='kursNorsk' style={{backgroundColor: "#748E54"}}>
                                <p className="main" key={Sak.id}>
                                    
                                    Sak: {Sak.sak} <br/> dato: {Sak.dato} <br/> epost: {Sak.epost} <br/> tlf: {Sak.tlf} 
                                </p> 
                                <button style={{backgroundColor: "#53673C"}} className="mark_leave" key={Sak.id} onClick={()=>{updateStatus(Sak.id,'IkkeOrdnet')}}>Ikke ordnet</button>                           
                            </div>

                        </>
                    })
            }


        </div>
    )
}
