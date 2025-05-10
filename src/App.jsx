import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useState, useEffect } from "react";
import { auth } from "./firebase/firebase";
import { onAuthStateChanged } from "firebase/auth";

import Home from "./pages/Home";
import StudyRoom from "./pages/StudyRoom";
import Login from "./pages/Login";
import Navbar from "./components/Navbar";
import CreateRoom from "./pages/CreateRoom";

export default function App() {
  const [user, setUser] = useState(null);

  // Track Firebase auth state
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  return (
    <Router>
      <Navbar user={user} />
      <div className="container mx-auto p-4">
        <Routes>
          {/* Public route */}
          <Route path="/login" element={<Login />} />

          {/* Protected routes */}
          <Route path="/" element={user ? <Home user={user} /> : <Login />} />
          <Route path="/create-room" element={user ? <CreateRoom /> : <Login />} />
          <Route path="/studyroom/:roomId" element={user ? <StudyRoom /> : <Login />} />

          {/* Fallback: redirect to login if unmatched */}
          <Route path="*" element={<Login />} />
        </Routes>
      </div>
    </Router>
  );
}
