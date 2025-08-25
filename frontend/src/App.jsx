import { Routes,Route } from "react-router-dom"
import SignupUpPage from "./pages/SignUpPage"
import LoginPage from "./pages/LogInPage"
function App() {


  return (
    <>
      <Routes>
        <Route path='/' element={<SignupUpPage/>}/>
        <Route path='/login' element={<LoginPage/>}/>
      </Routes>
    </>
  )
}

export default App
