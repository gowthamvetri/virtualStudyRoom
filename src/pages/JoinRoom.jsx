import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { doc, getDoc, updateDoc, arrayUnion } from "firebase/firestore";
import { db } from "../firebase/firebase";

export default function JoinRoom({ user }) {
  const [roomCode, setRoomCode] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleJoin = async () => {
    if (!roomCode.trim()) {
      setError("Room code is required");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const roomRef = doc(db, "rooms", roomCode.trim());
      const roomSnap = await getDoc(roomRef);

      if (!roomSnap.exists()) {
        setError("Room not found. Please check the code and try again.");
        setLoading(false);
        return;
      }

      await updateDoc(roomRef, {
        members: arrayUnion(user.uid),
      });

      navigate(`/studyroom/${roomCode.trim()}`);
    } catch (err) {
      console.error("Error joining room:", err);
      setError("Failed to join room. Please try again.");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen pt-24 px-4 pb-12">
      <div className="container mx-auto max-w-2xl animate-fadeIn">
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <svg className="w-16 h-16 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1721 9z" />
            </svg>
          </div>
          <h1 className="text-4xl font-bold mb-3 text-black">
            Join Study Room
          </h1>
          <p className="text-gray-600">Enter the room code to connect with your peers</p>
        </div>

        <div className="glass rounded-2xl p-8 border border-gray-200">
          {error && (
            <div className="mb-6 p-4 bg-red-500/10 border border-red-500/50 rounded-xl text-red-400 flex items-center space-x-2">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
              <span>{error}</span>
            </div>
          )}

          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Room Code
              </label>
              <input
                type="text"
                value={roomCode}
                onChange={(e) => setRoomCode(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleJoin()}
                placeholder="Paste room code here"
                className="w-full px-4 py-3 bg-white border border-gray-300 rounded-xl text-black placeholder-gray-400 focus:outline-none focus:border-black focus:ring-2 focus:ring-black/20 transition-all font-mono text-lg"
              />
              <p className="text-xs text-gray-600 mt-2">The room code is provided by the room creator</p>
            </div>

            <button
              onClick={handleJoin}
              disabled={loading || !roomCode.trim()}
              className="w-full py-4 px-6 bg-black hover:bg-gray-800 disabled:bg-gray-300 text-white disabled:text-gray-500 font-semibold rounded-xl transition-all transform hover:scale-[1.02] disabled:scale-100 disabled:cursor-not-allowed shadow-lg hover:shadow-black/20 flex items-center justify-center space-x-2"
            >
              {loading ? (
                <>
                  <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  <span>Joining...</span>
                </>
              ) : (
                <>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                  </svg>
                  <span>Join Room</span>
                </>
              )}
            </button>
          </div>
        </div>

        <div className="mt-8 text-center">
          <p className="text-gray-600 text-sm">
            Don't have a room code?{" "}
            <a href="/create-room" className="text-black hover:text-gray-700 font-medium underline">
              Create your own room
            </a>
          </p>
        </div>

        {/* Instructions */}
        <div className="mt-8 glass rounded-2xl p-6 border border-gray-200">
          <h3 className="text-lg font-bold mb-4 text-black">How to Get a Room Code</h3>
          <div className="space-y-3 text-gray-600">
            <div className="flex items-start space-x-3">
              <div className="flex-shrink-0 w-6 h-6 bg-black rounded-full flex items-center justify-center text-white text-sm font-bold">
                1
              </div>
              <p>Ask the room creator to share their room code with you</p>
            </div>
            <div className="flex items-start space-x-3">
              <div className="flex-shrink-0 w-6 h-6 bg-black rounded-full flex items-center justify-center text-white text-sm font-bold">
                2
              </div>
              <p>The room code can be found at the top of any active study room</p>
            </div>
            <div className="flex items-start space-x-3">
              <div className="flex-shrink-0 w-6 h-6 bg-black rounded-full flex items-center justify-center text-white text-sm font-bold">
                3
              </div>
              <p>Copy and paste the code into the field above to join instantly</p>
            </div>
          </div>
        </div>

        {/* Benefits */}
        <div className="mt-6 grid md:grid-cols-3 gap-4">
          <div className="glass rounded-xl p-4 border border-gray-200 text-center">
            <div className="text-2xl mb-2">⚡</div>
            <p className="text-sm font-medium text-black">Instant Access</p>
            <p className="text-xs text-gray-600 mt-1">Join rooms in seconds</p>
          </div>
          <div className="glass rounded-xl p-4 border border-gray-200 text-center">
            <div className="text-2xl mb-2">💬</div>
            <p className="text-sm font-medium text-black">Live Chat</p>
            <p className="text-xs text-gray-600 mt-1">Communicate in real-time</p>
          </div>
          <div className="glass rounded-xl p-4 border border-gray-200 text-center">
            <div className="text-2xl mb-2">⏱️</div>
            <p className="text-sm font-medium text-black">Shared Timer</p>
            <p className="text-xs text-gray-600 mt-1">Stay synced with peers</p>
          </div>
        </div>
      </div>
    </div>
  );
}
