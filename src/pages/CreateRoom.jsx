import { useState } from "react";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { db, auth } from "../firebase/firebase";

export default function CreateRoom() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
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

    setError(null);
    setLoading(true);

    try {
      const expirationDate = new Date();
      expirationDate.setHours(expirationDate.getHours() + 4); // 4 hours from now
      
      const roomData = {
        name: name.trim(),
        description: description.trim(),
        creator: currentUser.displayName || "Anonymous",
        createdAt: serverTimestamp(),
        expiresAt: expirationDate,
      };

      const docRef = await addDoc(collection(db, "rooms"), roomData);
      navigate(`/studyroom/${docRef.id}`);
    } catch (err) {
      console.error("Error creating room:", err);
      setError("Failed to create room. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen pt-24 px-4 pb-12">
      <div className="container mx-auto max-w-2xl animate-fadeIn">
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <div className="p-4 rounded-xl" style={{ backgroundColor: 'var(--accent)' }}>
              <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{ color: 'var(--primary)' }}>
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
            </div>
          </div>
          <h1 className="text-4xl font-bold mb-3" style={{ color: 'var(--text-primary)' }}>
            Create Study Room
          </h1>
          <p style={{ color: 'var(--text-secondary)' }}>Set up a new collaborative study space</p>
        </div>

        <div className="glass rounded-2xl p-8 border card-shadow" style={{ borderColor: 'var(--border)' }}>
          {error && (
            <div className="mb-6 p-4 bg-red-500/10 border border-red-500/50 rounded-xl text-red-400 flex items-center space-x-2">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleCreateRoom} className="space-y-6">
            <div>
              <label className="block text-sm font-medium mb-2" style={{ color: 'var(--text-secondary)' }}>
                Room Name *
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g., Computer Science Study Group"
                className="w-full px-4 py-3 bg-white rounded-xl transition-all"
                style={{ 
                  border: '2px solid var(--border)',
                  color: 'var(--text-primary)'
                }}
                onFocus={(e) => e.target.style.borderColor = 'var(--primary)'}
                onBlur={(e) => e.target.style.borderColor = 'var(--border)'}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2" style={{ color: 'var(--text-secondary)' }}>
                Description (Optional)
              </label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="What will you be studying in this room?"
                rows="4"
                className="w-full px-4 py-3 bg-white rounded-xl transition-all resize-none"
                style={{ 
                  border: '2px solid var(--border)',
                  color: 'var(--text-primary)'
                }}
                onFocus={(e) => e.target.style.borderColor = 'var(--primary)'}
                onBlur={(e) => e.target.style.borderColor = 'var(--border)'}
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 px-6 text-white font-semibold rounded-xl transition-all transform hover:scale-[1.02] disabled:scale-100 disabled:cursor-not-allowed flex items-center justify-center space-x-2 card-shadow-hover"
              style={{ 
                backgroundColor: loading ? 'var(--bg-secondary)' : 'var(--primary)',
                color: loading ? 'var(--text-tertiary)' : 'white'
              }}
            >
              {loading ? (
                <>
                  <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  <span>Creating Room...</span>
                </>
              ) : (
                <>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                  <span>Create Room</span>
                </>
              )}
            </button>
          </form>
        </div>

        {/* Tips Section */}
        <div className="mt-8 glass rounded-2xl p-6 border" style={{ borderColor: 'var(--border)' }}>
          <h3 className="text-lg font-bold mb-4 flex items-center" style={{ color: 'var(--text-primary)' }}>
            <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20" style={{ color: 'var(--primary)' }}>
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
            </svg>
            Tips for Creating a Great Study Room
          </h3>
          <ul className="space-y-2" style={{ color: 'var(--text-secondary)' }}>
            <li className="flex items-start">
              <span className="font-bold mr-2" style={{ color: 'var(--primary)' }}>•</span>
              <span>Use a clear, descriptive name so others can easily find your room</span>
            </li>
            <li className="flex items-start">
              <span className="font-bold mr-2" style={{ color: 'var(--primary)' }}>•</span>
              <span>Include the subject or topic in your room description</span>
            </li>
            <li className="flex items-start">
              <span className="font-bold mr-2" style={{ color: 'var(--primary)' }}>•</span>
              <span>Share the room code with your study group members</span>
            </li>
            <li className="flex items-start">
              <span className="font-bold mr-2" style={{ color: 'var(--primary)' }}>•</span>
              <span>Set ground rules for focus time and break periods</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
