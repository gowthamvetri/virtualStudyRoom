// pages/StudyRoom.jsx
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { doc, getDoc, collection, addDoc, query, orderBy, onSnapshot } from "firebase/firestore";
import { db, auth } from "../firebase/firebase"; // Assuming Firebase is set up correctly

export default function StudyRoom() {
  const { roomId } = useParams();
  const [room, setRoom] = useState(null);
  const [loading, setLoading] = useState(true);
  const [timeLeft, setTimeLeft] = useState(25 * 60); // Pomodoro timer starting at 25 minutes
  const [isActive, setIsActive] = useState(false);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  // Fetch room data from Firestore
  useEffect(() => {
    const fetchRoom = async () => {
      try {
        const roomRef = doc(db, "rooms", roomId);
        const roomSnap = await getDoc(roomRef);
        if (roomSnap.exists()) {
          setRoom(roomSnap.data());
        } else {
          setRoom(null);
        }
      } catch (err) {
        console.error("Error fetching room:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchRoom();
  }, [roomId]);

  // Fetch messages for the room
  useEffect(() => {
    const messagesRef = collection(db, "rooms", roomId, "messages");
    const q = query(messagesRef, orderBy("timestamp"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const msgs = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setMessages(msgs);
    });

    return () => unsubscribe(); // Cleanup listener on unmount
  }, [roomId]);

  // Handle sending a message
  const sendMessage = async () => {
    if (message.trim() === "") return;

    try {
      const messagesRef = collection(db, "rooms", roomId, "messages");
      await addDoc(messagesRef, {
        text: message,
        sender: auth.currentUser?.displayName || "Anonymous", // Fallback to Anonymous if user is not logged in
        timestamp: new Date(),
      });
      setMessage(""); // Clear input field
    } catch (err) {
      console.error("Error sending message:", err);
    }
  };

  // Pomodoro timer logic
  useEffect(() => {
    let timer;

    if (isActive) {
      timer = setInterval(() => {
        setTimeLeft((prevTime) => {
          if (prevTime <= 0) {
            clearInterval(timer);
            return 0;
          }
          return prevTime - 1;
        });
      }, 1000);
    } else {
      clearInterval(timer);
    }

    return () => clearInterval(timer); // Cleanup timer on unmount
  }, [isActive]);

  const startTimer = () => setIsActive(true);
  const stopTimer = () => setIsActive(false);

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${String(minutes).padStart(2, "0")}:${String(remainingSeconds).padStart(2, "0")}`;
  };

  // If loading, display a spinner
  if (loading) return (
    <div className="p-4 flex justify-center items-center h-screen">
      <div className="spinner">Loading...</div> {/* Add a CSS spinner here */}
    </div>
  );

  if (!room) return <div className="p-4 text-red-500">Room not found</div>;

  return (
    <div className="min-h-screen p-8 bg-gray-100">
      <h1 className="text-3xl font-bold mb-4">Room: {room.name}</h1>
      <p className="text-gray-700 mb-4">Created by: {room.creator}</p>

      {/* Pomodoro Timer */}
      <div className="mb-8">
        <h3 className="text-xl font-semibold">Pomodoro Timer</h3>
        <div className="text-4xl font-bold mb-4">{formatTime(timeLeft)}</div>
        <div className="flex space-x-4">
          <button
            onClick={startTimer}
            disabled={isActive}
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-700"
          >
            Start
          </button>
          <button
            onClick={stopTimer}
            disabled={!isActive}
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-700"
          >
            Stop
          </button>
        </div>
      </div>

      {/* Chat */}
      <div className="mt-8">
        <h3 className="text-xl font-semibold">Chat</h3>
        <div className="max-h-60 overflow-y-auto mb-4 bg-white p-4 rounded shadow-md">
          {messages.length === 0 ? (
            <div className="text-gray-500">No messages yet</div>
          ) : (
            messages.map((msg) => (
              <div key={msg.id} className="border-b py-2">
                <strong>{msg.sender}: </strong>{msg.text}
              </div>
            ))
          )}
        </div>

        <div className="flex">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="border p-2 flex-1 rounded"
            placeholder="Type a message..."
          />
          <button
            onClick={sendMessage}
            disabled={!message.trim()}
            className="bg-blue-500 text-white px-4 py-2 ml-2 rounded disabled:opacity-50"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
}
