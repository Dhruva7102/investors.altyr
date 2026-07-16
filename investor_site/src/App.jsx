import './App.css'
import deckHtml from "@/deck/AltyrDeck.html?raw"

// Investor deck now renders the standalone Obsidian Clarity deck
// (staged from Cowork). The previous React deck lives in
// pages/InvestorHome.jsx + components/pitch/* — kept for reference/revert.
// Original App.jsx preserved as App.jsx.backup.
function App() {
  return (
    <iframe
      title="Altyr Investor Deck"
      srcDoc={deckHtml}
      style={{ position: 'fixed', inset: 0, width: '100vw', height: '100vh', border: 'none' }}
    />
  )
}

export default App
