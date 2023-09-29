import './App.css';
import { useNavigate } from 'react-router-dom';
import Elev from './elev';

export default function Home() {

    const navigate = useNavigate();


    return (



        <div className="container">

        <div className='leftside'>

            <div className='box'>

            <div className='tresitteplasser'> 
                <Elev name="Matheo"/>
                <Elev name="Elias"/>
                <Elev name="Johannes"/>
              </div>

              <div className='tresitteplasser'> 
                <Elev name="Kristoffer"/>
                <Elev name="Vetle"/>
                <Elev name="Axel"/>
              </div>

              <div className='tresitteplasser'> 
                <Elev name="Silas"/>
                <Elev name="Alva"/>
                <Elev name="Mattis"/>
              </div>


            </div>
          </div>
            

        <div className='rightside'>

        <div className='box'>

            <div className='tositteplasser'> 
                <Elev name="Theodor"/>
                <Elev name="Gabriel"/>
          </div>

          <div className='tositteplasser'> 
                <Elev />
                <Elev name="Philip"/>
          </div>

          <div className='tositteplasser'> 
                <Elev name="Ahmad"/>
                <Elev name="Andreas"/>
          </div>

          </div>

          </div>


        </div>
    )
}