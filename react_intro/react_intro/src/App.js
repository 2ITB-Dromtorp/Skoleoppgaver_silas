import logo from './logo.svg';
import './App.css';
import Mybutton from './mybutton';
import Profile from './imageEX';

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

        
        <Profile />
        <h1>react intro</h1>
        <Mybutton />
        {content}


      </header>
    </div>
  );
}

export default App;
