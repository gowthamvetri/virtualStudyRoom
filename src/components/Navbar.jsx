import { Link } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../firebase/firebase";

export default function Navbar({ user }) {
  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  return (
    <nav className="bg-gray-800 text-white p-4 flex justify-between items-center">
      <div className="text-2xl font-bold">Study Room</div>
      <div>
        {user ? (
          <div className="flex items-center space-x-4">
            <span>Welcome, {user.displayName}</span>
            <button
              onClick={handleLogout}
              className="bg-red-500 text-white px-4 py-2 rounded"
            >
              Logout
            </button>
            <Link to="/" className="text-white px-4 py-2 rounded">
              Home
            </Link>
            <Link
              to="/create-room"
              className="bg-blue-500 text-white px-4 py-2 rounded"
            >
              Create Room
            </Link>
          </div>
        ) : (
          <Link to="/login" className="text-white px-4 py-2 rounded">
            Login
          </Link>
        )}
      </div>
    </nav>
  );
}
