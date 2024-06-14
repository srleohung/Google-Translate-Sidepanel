import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <p id="select-a-word">Highlight or right-click on a section of text and click on Translate icon next to it to translate it to your language.</p>
      <h1 id="definition-word"></h1>
      <div className="card">
        <h2 id="definition-text"></h2>
        <h3 id="definition-additional"></h3>
      </div>
      <p className="read-the-docs" id="definition-detected-language"></p>
    </>
  )
}

export default App
