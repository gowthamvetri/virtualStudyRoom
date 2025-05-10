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

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  return (
    <>
      <Navbar user={user} />
      <div className="container mx-auto p-4">
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={user ? <Home user={user} /> : <Login />} />
          <Route path="/create-room" element={user ? <CreateRoom /> : <Login />} />
          <Route path="/join-room" element={user ? <JoinRoom user={user} /> : <Login />} />
          <Route path="/studyroom/:roomId" element={user ? <StudyRoom /> : <Login />} />
          <Route path="*" element={<Login />} />
        </Routes>
      </div>
    </>
  );
}
