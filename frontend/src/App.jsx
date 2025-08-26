import { Routes,Route } from "react-router-dom"
import SignUpUpPage from "./pages/SignUpPage"
import LoginPage from "./pages/LoginPage"
import LeadsTable from "./components/LeadTable"
import LeadForm from "./components/LeadForm"
function App() {


  return (
    <>
      <Routes>
        <Route path='/signup' element={<SignUpUpPage/>}/>
        <Route path='/' element={<LoginPage/>}/>
        <Route path='/leads' element={<LeadsTable/>}/>
        <Route path='/leads/update' element={<LeadForm/>}/> 
      </Routes>
    </>
  )
}

export default App
