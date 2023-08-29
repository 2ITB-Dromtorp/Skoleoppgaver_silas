import './App.css';
import { useState } from 'react';


function Uselist() {

    const products = [
        { title: 'Cabbage', isFruit: false, id: 1 },
        { title: 'Garlic', isFruit: false, id: 2 },
        { title: 'Apple', isFruit: true, id: 3 },
    ];

    const listItems = products.map(product =>
    <li
      key={product.id}
      style={{
        color: product.isFruit ? 'magenta' : 'darkgreen'
      }}
    >
      {product.title}
    </li>
    );

    return <ul>{listItems}</ul>

}

export default function MyApp() {
  const [count, setCount] = useState(0);

  function handleClick() {
    setCount(count + 1);
  }

  return (
    <div>
      <h1>Counters that update together</h1>
      <MyButton count={count} onClick={handleClick} />
      <MyButton count={count} onClick={handleClick} />
      <Uselist />
    </div>
  );
}

function MyButton({ count, onClick }) {
  return (
    <button onClick={onClick} className='Button'>
      Clicked {count} times
    </button>
  );
}



/*
function MyButton() {

    const [count, setCount] = useState(0);

    function handleClick() {
        setCount(count + 1);
    }

    return (
      <button onClick={handleClick} className='Button'>
      Clicked {count} times
      </button>
    ); 

    }
   

  export default function Mybutton() {

    return (
      <div>
        <h1>Welcome to my app</h1>
        <MyButton />
        <MyButton />
        <Uselist />
      </div>
    );
  }

    function SayHi() {
        console.log("wuhuu Gravemaskin");
    }
}
*/
