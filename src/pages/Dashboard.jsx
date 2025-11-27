import { useState, useEffect } from "react";
import { db, auth, roomsCollection } from "../firebase/firebase";
import { collection, addDoc, getDocs } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const navigate = useNavigate();
  const [rooms, setRooms] = useState([]);
  const [roomName, setRoomName] = useState("");

  // Fetch all rooms from Firestore
  const fetchRooms = async () => {
    const roomSnapshot = await getDocs(roomsCollection);
    const roomList = roomSnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
    setRooms(roomList);
  };

  useEffect(() => {
    fetchRooms();
  }, []);

  const createRoom = async () => {
    if (roomName.trim() === "") return;
    
    // Add new room to Firestore
    try {
      const newRoom = await addDoc(roomsCollection, {
        name: roomName,
        createdBy: auth.currentUser.displayName,
        createdAt: new Date(),
      });
      navigate(`/room/${newRoom.id}`);
    } catch (error) {
      console.error("Error creating room:", error);
    }
  };

  const joinRoom = (roomId) => {
    navigate(`/room/${roomId}`);
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Study Rooms</h2>
      
      <div className="mb-6">
        <input
          type="text"
          className="border p-2"
          placeholder="Enter room name"
          value={roomName}
          onChange={(e) => setRoomName(e.target.value)}
        />
        <button
          onClick={createRoom}
          className="ml-4 bg-blue-500 text-white px-4 py-2 rounded"
        >
          Create Room
        </button>
      </div>

      <h3 className="font-semibold">Join an existing room:</h3>
      <ul className="mt-4">
        {rooms.map((room) => (
          <li key={room.id} className="flex justify-between items-center">
            <span>{room.name}</span>
            <button
              onClick={() => joinRoom(room.id)}
              className="bg-green-500 text-white px-4 py-1 rounded"
            >
              Join
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
