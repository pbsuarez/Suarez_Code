import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Navigate } from "react-router-dom";
import Login from "./Login";
import Dashboard from "./Dashboard";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/home/index" />} />
        <Route path="/account/login" element={<Login />} />
        <Route path="/home/index" element={<Dashboard />} />
      </Routes>
    </Router>
  );
}

export default App;
