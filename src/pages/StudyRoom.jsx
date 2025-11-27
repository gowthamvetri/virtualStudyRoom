import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import { doc, getDoc, collection, addDoc, query, orderBy, onSnapshot } from "firebase/firestore";
import { db, auth } from "../firebase/firebase";

export default function StudyRoom() {
  const { roomId } = useParams();
  const navigate = useNavigate();
  const [room, setRoom] = useState(null);
  const [loading, setLoading] = useState(true);
  const [timeLeft, setTimeLeft] = useState(25 * 60);
  const [isActive, setIsActive] = useState(false);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [copied, setCopied] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

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

    return () => unsubscribe();
  }, [roomId]);

  const sendMessage = async (e) => {
    e?.preventDefault();
    if (message.trim() === "") return;

    try {
      const messagesRef = collection(db, "rooms", roomId, "messages");
      await addDoc(messagesRef, {
        text: message,
        sender: auth.currentUser?.displayName || "Anonymous",
        timestamp: new Date(),
      });
      setMessage("");
    } catch (err) {
      console.error("Error sending message:", err);
    }
  };

  useEffect(() => {
    let timer;

    if (isActive && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft((prevTime) => {
          if (prevTime <= 1) {
            setIsActive(false);
            // Play notification sound or show alert
            return 0;
          }
          return prevTime - 1;
        });
      }, 1000);
    }

    return () => clearInterval(timer);
  }, [isActive, timeLeft]);

  const startTimer = () => setIsActive(true);
  const stopTimer = () => setIsActive(false);
  const resetTimer = () => {
    setIsActive(false);
    setTimeLeft(25 * 60);
  };

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${String(minutes).padStart(2, "0")}:${String(remainingSeconds).padStart(2, "0")}`;
  };

  const copyRoomCode = () => {
    navigator.clipboard.writeText(roomId);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500 mb-4"></div>
          <p className="text-gray-400">Loading study room...</p>
        </div>
      </div>
    );
  }

  if (!room) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="text-center glass rounded-2xl p-8 border border-gray-200 max-w-md">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-black mb-2">Room Not Found</h2>
          <p className="text-gray-600 mb-6">This study room doesn't exist or has been deleted.</p>
          <button
            onClick={() => navigate("/")}
            className="px-6 py-3 bg-black text-white font-medium rounded-lg hover:bg-gray-800 transition-all"
          >
            Go to Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-20 px-4 pb-8">
      <div className="container mx-auto max-w-7xl">
        {/* Header */}
        <div className="glass rounded-2xl p-6 border border-gray-200 mb-6 animate-fadeIn">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="flex-1">
              <h1 className="text-3xl font-bold text-black mb-2">{room.name}</h1>
              <p className="text-gray-600">Created by {room.creator}</p>
              {room.description && (
                <p className="text-gray-500 text-sm mt-1">{room.description}</p>
              )}
            </div>
            <div className="flex items-center space-x-3">
              <div className="glass px-4 py-2 rounded-lg border border-gray-300">
                <p className="text-xs text-gray-500 mb-1">Room Code</p>
                <p className="font-mono text-sm text-black">{roomId.substring(0, 8)}...</p>
              </div>
              <button
                onClick={copyRoomCode}
                className="px-4 py-2 bg-gray-200 hover:bg-gray-300 text-black rounded-lg border border-gray-300 transition-all flex items-center space-x-2"
                title="Copy room code"
              >
                {copied ? (
                  <>
                    <svg className="w-5 h-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-green-400">Copied!</span>
                  </>
                ) : (
                  <>
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                    </svg>
                    <span>Copy</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          {/* Pomodoro Timer */}
          <div className="glass rounded-2xl p-8 border border-gray-200 animate-fadeIn">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-10 h-10 bg-black rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-black">Pomodoro Timer</h2>
            </div>

            <div className="text-center mb-8">
              <div className={`text-7xl font-bold mb-2 font-mono ${timeLeft === 0 ? 'text-red-600' : 'text-black'}`}>
                {formatTime(timeLeft)}
              </div>
              <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                <div
                  className="h-full bg-black transition-all duration-1000"
                  style={{ width: `${(timeLeft / (25 * 60)) * 100}%` }}
                />
              </div>
            </div>

            <div className="flex justify-center space-x-3">
              {!isActive ? (
                <button
                  onClick={startTimer}
                  className="px-8 py-3 bg-black hover:bg-gray-800 text-white font-semibold rounded-xl transition-all transform hover:scale-105 flex items-center space-x-2 shadow-lg"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                  </svg>
                  <span>Start</span>
                </button>
              ) : (
                <button
                  onClick={stopTimer}
                  className="px-8 py-3 bg-gray-700 hover:bg-gray-600 text-white font-semibold rounded-xl transition-all transform hover:scale-105 flex items-center space-x-2 shadow-lg"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zM7 8a1 1 0 012 0v4a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v4a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                  <span>Pause</span>
                </button>
              )}
              <button
                onClick={resetTimer}
                className="px-6 py-3 bg-gray-200 hover:bg-gray-300 text-black font-semibold rounded-xl border border-gray-300 transition-all transform hover:scale-105 flex items-center space-x-2"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
                <span>Reset</span>
              </button>
            </div>
          </div>

          {/* Chat Section */}
          <div className="glass rounded-2xl p-8 border border-gray-200 flex flex-col animate-fadeIn" style={{ height: '500px' }}>
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-10 h-10 bg-gray-600 rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-black">Live Chat</h2>
            </div>

            <div className="flex-1 overflow-y-auto mb-4 space-y-3 pr-2" style={{ maxHeight: 'calc(100% - 140px)' }}>
              {messages.length === 0 ? (
                <div className="flex items-center justify-center h-full">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-3">
                      <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                      </svg>
                    </div>
                    <p className="text-gray-600">No messages yet</p>
                    <p className="text-gray-500 text-sm">Start the conversation!</p>
                  </div>
                </div>
              ) : (
                messages.map((msg) => {
                  const isCurrentUser = msg.sender === auth.currentUser?.displayName;
                  return (
                    <div key={msg.id} className={`flex ${isCurrentUser ? 'justify-end' : 'justify-start'}`}>
                      <div className={`max-w-xs lg:max-w-md ${isCurrentUser ? 'bg-black text-white' : 'bg-gray-200 text-black'} rounded-2xl px-4 py-2`}>
                        <p className={`text-xs font-semibold mb-1 ${isCurrentUser ? 'text-gray-300' : 'text-gray-600'}`}>{msg.sender}</p>
                        <p className="break-words">{msg.text}</p>
                      </div>
                    </div>
                  );
                })
              )}
              <div ref={messagesEndRef} />
            </div>

            <form onSubmit={sendMessage} className="flex space-x-2">
              <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Type your message..."
                className="flex-1 px-4 py-3 bg-white border border-gray-300 rounded-xl text-black placeholder-gray-400 focus:outline-none focus:border-black focus:ring-2 focus:ring-black/20 transition-all"
              />
              <button
                type="submit"
                disabled={!message.trim()}
                className="px-6 py-3 bg-gray-700 hover:bg-black disabled:bg-gray-300 text-white disabled:text-gray-500 font-semibold rounded-xl transition-all disabled:cursor-not-allowed flex items-center space-x-2"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                </svg>
                <span className="hidden md:inline">Send</span>
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
