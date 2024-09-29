import FetchTodos from "./components/FetchTodos"
import { Routes, Route } from "react-router-dom"

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<FetchTodos />} />
      </Routes>
    </>
  )
}

export default App