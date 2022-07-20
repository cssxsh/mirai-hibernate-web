import React from 'react';
import './App.css';
import {Routes, Route, Link} from "react-router-dom";
import Album from "./components/Album";
import ChatRoom from "./components/ChatRoom";

function App() {
    return (
        <div className="App">
            <Routes>
                <Route path="/" element={<ChatRoom />} />
                <Route path="/face" element={<Album />} />
                <Route path="/message" element={<ChatRoom />} />
            </Routes>
        </div>
    );
}

export default App;
