import { createRef, useState } from 'react'
import logo from './logo.svg'
import './App.css'
import Dice from './Dice/Dice'

function App() {
  const [count, setCount] = useState(0);
  const [n, setN] = useState(Math.floor(Math.random() * 6 + 1));

  setTimeout(() => {
    debugger
    ref.current.roll();
  }, 250);

  const ref = createRef();

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>Hello Vite + React!</p>
        <p>
          <button type="button" onClick={() => setCount((count) => count + 1)}>
            count is: {count}
          </button>
        </p>
        <p>
          Edit <code>App.tsx</code> and save to test HMR updates.
        </p>
        <p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
          {' | '}
          <a
            className="App-link"
            href="https://vitejs.dev/guide/features.html"
            target="_blank"
            rel="noopener noreferrer"
          >
            Vite Docs
          </a>
        </p>
      </header>
      <main>
        <Dice ref={ref} n={n}></Dice>
      </main>
    </div>
  )
}

export default App
