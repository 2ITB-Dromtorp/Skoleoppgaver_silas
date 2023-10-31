import './App.css';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import Elev from './elev';
import json from './profiles';

export default function Home() {

    const navigate = useNavigate();

    const students = ["Matheo", "Elias", "Johannes", "Kristoffer", "Vetle", "Axel", "Silas", "Alva", "Mattis", "Theodor", "Gabriel", "-", "Philip", "Ahmad", "Andreas"]

    const shuffleArray = (array) => { 
      for (let i = array.length - 1; i > 0; i--) { 
        const j = Math.floor(Math.random() * (i + 1)); 
        [array[i], array[j]] = [array[j], array[i]]; 
      } 
      return array;
    };  

    shuffleArray(students); 
   
    function swap() {

      
    }


    return (

      <div className="container">


        <div className='leftside'>

            <div className='box'>

            <div className='tresitteplasser'> 
                <Elev name= {students[0]} />
                <Elev name= {students[1]}/>
                <Elev name= {students[2]}/>
              </div>

              <div className='tresitteplasser'> 
                <Elev name= {students[3]}/>
                <Elev name= {students[4]}/>
                <Elev name= {students[5]}/>
              </div>

              <div className='tresitteplasser'> 
                <Elev name= {students[6]}/>
                <Elev name= {students[7]}/>
                <Elev name= {students[8]}/>
              </div>

              <button onClick={swap}> bytt plasser </button>

            </div>
          </div>


        <div className='rightside'>

        <div className='box'>

            <div className='tositteplasser'> 
                <Elev name= {students[9]}/>
                <Elev name= {students[10]}/>
          </div>

          <div className='tositteplasser'> 
                <Elev name= {students[11]} />
                <Elev name= {students[12]}/>
          </div>

          <div className='tositteplasser'> 
                <Elev name= {students[13]}/>
                <Elev name= {students[14]}/>
          </div>

          </div>

          </div>        
      

        </div>

    )
}