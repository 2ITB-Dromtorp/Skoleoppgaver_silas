import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { useState } from 'react';
import './App.css';
import json from './profiles';


export default function Profile() {

    const navigate = useNavigate();

    let profilesParams = useParams();

    const [profile, setprofile] = useState({});

    json.Elever.map((item, index) => {
        if (profilesParams.profile == item.Navn) {
            console.log(item)
            setprofile(item)
        }
    })


    
    return (
        <>


            <div className="profile-container">
        


                <div className='profile_box'>
                    <h1> Dette er profilen til {profilesParams.profile} </h1>
                    <p> {profile} </p>
                    <button onClick={() => navigate(-1)}> Tilbake til hovedmeny </button>
                </div>


            
        </div>
        </>
    )
}