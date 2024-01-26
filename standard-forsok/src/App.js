import './App.css';

function App() {
  function relative() {
    fetch("/api/get").then(async (res) => {
      return res.json()
    }).then((data) => {
      console.log(data.message)
    })
  }

  return (
    <div className="App">
      <button onClick={() => relative()}>Freddy fazbear</button>
    </div>
  );
}

export default App;