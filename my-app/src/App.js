import "./App.css";
import ShortUrlInput from "./components/ShortUrlInput/ShortUrlInput";
import LongUrlInput from "./components/LongUrlInput/LongUrlInput";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <LongUrlInput />
        <ShortUrlInput />
      </header>
    </div>
  );
}

export default App;
