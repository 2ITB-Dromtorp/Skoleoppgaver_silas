import './App.css';

function MyButton() {
    return (
      <button onClick={SayHi} className='Button'>
        I'm a button
      </button>
    );
  }
  
  export default function Mybutton() {
    return (
      <div>
        <h1>Welcome to my app</h1>
        <MyButton />
      </div>
    );
  }

  function SayHi() {
    console.log("hello world")
  }