import "./App.css";
import ShortUrlInput from "./components/ShortUrlInput/ShortUrlInput";
import LongUrlInput from "./components/LongUrlInput/LongUrlInput";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <div className="Div-input">
          <LongUrlInput />
        </div>
        <div className="Div-input">
          <ShortUrlInput />
        </div>
      </header>
    </div>
  );
}

export default App;
