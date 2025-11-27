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
    <nav className="fixed top-0 left-0 right-0 z-50 glass border-b border-gray-200">
      <div className="container mx-auto px-6 py-4">
        <div className="flex justify-between items-center">
          <Link to="/" className="flex items-center space-x-3 group">
            <svg className="w-10 h-10 text-black transform group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
            <span className="text-2xl font-bold text-black">
              Virtual Study Space
            </span>
          </Link>
          
          <div>
            {user ? (
              <div className="flex items-center space-x-3">
                <div className="hidden md:flex items-center space-x-2 px-4 py-2 bg-gray-100 rounded-lg border border-gray-200">
                  <div className="w-8 h-8 bg-black rounded-full flex items-center justify-center text-sm font-semibold text-white">
                    {user.displayName?.charAt(0) || 'U'}
                  </div>
                  <span className="text-gray-700 text-sm font-medium">{user.displayName}</span>
                </div>
                
                <Link 
                  to="/" 
                  className="hidden md:block px-4 py-2 text-gray-700 hover:text-black transition-colors rounded-lg hover:bg-gray-100"
                >
                  Home
                </Link>
                
                <Link 
                  to="/create-room" 
                  className="px-5 py-2.5 bg-black hover:bg-gray-800 text-white font-medium rounded-lg transition-all transform hover:scale-105 hover:shadow-lg hover:shadow-black/20"
                >
                  + Create Room
                </Link>
                
                <Link 
                  to="/join-room" 
                  className="px-5 py-2.5 bg-gray-200 hover:bg-gray-300 text-black font-medium rounded-lg border border-gray-300 transition-all transform hover:scale-105"
                >
                  Join Room
                </Link>
                
                <button
                  onClick={handleLogout}
                  className="px-4 py-2.5 text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg transition-all border border-transparent hover:border-red-200"
                  title="Logout"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                  </svg>
                </button>
              </div>
            ) : (
              <Link 
                to="/login" 
                className="px-6 py-2.5 bg-black hover:bg-gray-800 text-white font-medium rounded-lg transition-all transform hover:scale-105 hover:shadow-lg hover:shadow-black/20"
              >
                Sign In
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
