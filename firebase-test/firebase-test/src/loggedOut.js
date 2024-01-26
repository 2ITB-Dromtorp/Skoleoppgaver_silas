import './App.css';
import { useNavigate } from 'react-router-dom';
import catimg from './images/plomm-smaller.png'


export default function LoggedOut() {

    const navigate = useNavigate();

  return (
    <div className="App">
      <header className="App-header">

      </header>
      <body className="App-body">
        <img src={catimg} className="App-logo" alt="cat" />
        <p>you need to login to like cats</p>
        <button onClick={() => navigate('./login')}>
            click me to login!    
        </button> 
      </body>
    </div>
  );
}