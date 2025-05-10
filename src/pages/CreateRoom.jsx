import { useState } from "react";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { db, auth } from "../firebase/firebase";

export default function CreateRoom() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);  // Loading state
  const navigate = useNavigate();

  const handleCreateRoom = async (e) => {
    e.preventDefault();

    const currentUser = auth.currentUser;
    if (!currentUser) {
      setError("You must be logged in to create a room.");
      return;
    }

    if (!name.trim()) {
      setError("Room name is required.");
      return;
    }

    setError(null);  // Reset any previous errors
    setLoading(true); // Set loading state to true

    try {
      const roomData = {
        name: name.trim(),
        description: description.trim(),
        creator: currentUser.displayName || "Anonymous",
        createdAt: serverTimestamp(),
      };

      // Adding room data to Firestore
      const docRef = await addDoc(collection(db, "rooms"), roomData);

      // Navigate to the new study room with the created room ID
      navigate(`/studyroom/${docRef.id}`);
    } catch (err) {
      console.error("Error creating room:", err);  // Log full error object to the console
      setError(err.message || "Something went wrong. Please try again.");
    } finally {
      setLoading(false); // Reset loading state
    }
  };

  return (
    <div className="min-h-screen p-8 bg-gray-50">
      <h1 className="text-3xl font-bold mb-6">Create a New Study Room</h1>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <form onSubmit={handleCreateRoom} className="space-y-4 max-w-md">
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Room Name"
          className="w-full p-2 border rounded"
          required
        />
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Room Description (optional)"
          className="w-full p-2 border rounded"
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded"
          disabled={loading}  // Disable button when loading
        >
          {loading ? "Creating..." : "Create Room"}
        </button>
      </form>
    </div>
  );
}
