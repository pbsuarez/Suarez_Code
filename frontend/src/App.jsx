import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./Login";
import Dashboard from "./Dashboard";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/account/login" element={<Login />} />
        <Route path="/home/index" element={<Dashboard />} />
      </Routes>
    </Router>
  );
}

export default App;
