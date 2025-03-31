import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import "./App.css";

function App() {
    return (
        <Router>
            <div className="app">
                <Routes>
                    <Route path="/" element={<Dashboard />} />
                    <Route path="*" element={<h1 style={{ textAlign: "center", marginTop: "50px" }}>404 - Page Not Found</h1>} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
