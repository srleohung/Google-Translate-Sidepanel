import './App.css'
import DynamicLogo from './DynamicLogo.jsx'

function App() {
  return (
    <>

      <div className="logo react">
        <DynamicLogo />
      </div>
      <div className="card">
        <h1 id="definition-word"></h1>
        <i id="definition-voice" class="material-icons btn off">play_circle</i>
        <h1 id="definition-text"></h1>
        <h3 id="definition-additional"></h3>
      </div>
      <p className="read-the-docs" id="definition-detected-language"></p>
      <p id="select-a-word">Highlight or right-click on a section of text and click on Translate icon next to it to translate it to your language.</p>
      <a href="https://translate.google.com/" target="_blank">Google Translate</a>
    </>
  )
}

export default App
