import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import './App.css';


export default function Profile() {

    const navigate = useNavigate();

    let profilesParams = useParams();

    console.log(profilesParams)
    
    return (
        <>


            <div className="profile-container">
        


                <div className='profile_box'>
                    <h1> Dette er profilen til {profilesParams.profile} </h1>
                    <button onClick={() => navigate(-1)}> Tilbake til hovedmeny </button>
                </div>


            
        </div>
        </>
    )
}