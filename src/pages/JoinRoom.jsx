// pages/JoinRoom.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { doc, getDoc, updateDoc, arrayUnion } from "firebase/firestore";
import { db } from "../firebase/firebase";

export default function JoinRoom({ user }) {
  const [roomCode, setRoomCode] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleJoin = async () => {
    if (!roomCode.trim()) {
      setError("Room code is required");
      return;
    }

    try {
      const roomRef = doc(db, "rooms", roomCode.trim());
      const roomSnap = await getDoc(roomRef);

      if (!roomSnap.exists()) {
        setError("Room not found");
        return;
      }

      // Add user to members list
      await updateDoc(roomRef, {
        members: arrayUnion(user.uid),
      });

      navigate(`/studyroom/${roomCode.trim()}`);
    } catch (err) {
      console.error("Error joining room:", err);
      setError("Failed to join room");
    }
  };

  return (
    <div className="max-w-md mx-auto p-4 bg-white rounded shadow">
      <h2 className="text-xl font-semibold mb-4">Join a Study Room</h2>
      <input
        type="text"
        value={roomCode}
        onChange={(e) => setRoomCode(e.target.value)}
        placeholder="Enter Room Code"
        className="w-full border px-3 py-2 mb-2 rounded"
      />
      {error && <p className="text-red-500 mb-2">{error}</p>}
      <button
        onClick={handleJoin}
        className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
      >
        Join Room
      </button>
    </div>
  );
}
