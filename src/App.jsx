import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase/firebase";

import Navbar from "./components/Navbar";
import Login from "./pages/Login";
import Home from "./pages/Home";
import CreateRoom from "./pages/CreateRoom";
import JoinRoom from "./pages/JoinRoom";
import StudyRoom from "./pages/StudyRoom";

export default function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="text-center">
          <svg className="w-20 h-20 text-black mb-4 animate-pulse mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
          </svg>
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-black"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen">
      <Navbar user={user} />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={user ? <Home user={user} /> : <Login />} />
        <Route path="/create-room" element={user ? <CreateRoom /> : <Login />} />
        <Route path="/join-room" element={user ? <JoinRoom user={user} /> : <Login />} />
        <Route path="/studyroom/:roomId" element={user ? <StudyRoom /> : <Login />} />
        <Route path="*" element={<Login />} />
      </Routes>
    </div>
  );
}
