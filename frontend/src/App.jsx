import { Routes,Route } from "react-router-dom"
import SignupUpPage from "./pages/SignUpPage"
import LogInPage from "./pages/LogInPage"
function App() {


  return (
    <>
      <Routes>
        <Route path='/' element={<SignupUpPage/>}/>
        <Route path='/login' element={<LogInPage/>}/>
      </Routes>
    </>
  )
}

export default App
