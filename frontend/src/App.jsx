import { Routes,Route } from "react-router-dom"
import SignupUpPage from "./pages/SignUpPage"
function App() {


  return (
    <>
      <Routes>
        <Route path='/signup' element={<SignupUpPage/>}/>
      </Routes>
    </>
  )
}

export default App
