import Home from "./components/Home"
import Navbar from "./pages/Navbar"
import { BrowserRouter, Routes, Route } from "react-router"

function App() {
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route index element={<Home />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
