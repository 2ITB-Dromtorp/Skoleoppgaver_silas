import './App.css';

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
        <Uselist />
      </div>
    );
  }

  function SayHi() {
    console.log("wuhuu Gravemaskin");

    
}