import logo from './logo.svg';
import './App.css';
import Mybutton from './mybutton';
import Profile from './imageEX';
import DigitalClock from './digitalClock';
import Rock_paper_scissors from './R_P_S';

let isLoggedIn = false;
let content;
if (isLoggedIn == true) {
  content = <h1>hi</h1>;
} else {
  content = <h1>bye</h1>;
}


function App() {
  return (
    <div className="App">
      <header className="App-header">
        
        <h1>react intro</h1>        
        <Rock_paper_scissors />
        {/* <DigitalClock />*/}



      </header>
    </div>
  );
}

export default App;
