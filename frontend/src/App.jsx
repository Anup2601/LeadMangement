import { Routes,Route } from "react-router-dom"
import SignUpUpPage from "./pages/SignUpPage"
import LoginPage from "./pages/LoginPage"
function App() {


  return (
    <>
      <Routes>
        <Route path='/' element={<SignUpUpPage/>}/>
        <Route path='/login' element={<LoginPage/>}/>
      </Routes>
    </>
  )
}

export default App
