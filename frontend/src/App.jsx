import {BrowserRouter, Routes, Route} from "react-router-dom";
import BottomWarning from "./components/BottomWarning";
import SignUp from "./components/SignUp";
import SignIn from "./components/SignIn";
import Dashboard from "./components/Dashboard";

function App() {

  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route path="/signup" element={<SignUp />} />
        <Route path="/signin" element={<SignIn/>} />
        <Route path="/dashboard" element={<Dashboard/> } />
        <Route path="/send"  element={<></>} />
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
