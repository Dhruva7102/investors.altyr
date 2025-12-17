import './App.css'
import InvestorHome from "@/pages/InvestorHome.jsx"
import PasswordProtection from "@/components/PasswordProtection.jsx"

function App() {
  return (
    <PasswordProtection>
      <InvestorHome />
    </PasswordProtection>
  )
}

export default App

