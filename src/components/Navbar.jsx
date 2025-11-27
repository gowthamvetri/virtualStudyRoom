import { Link, useNavigate, useLocation } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../firebase/firebase";
import { useState } from "react";

export default function Navbar({ user }) {
  const navigate = useNavigate();
  const location = useLocation();
  const [showLeaveDialog, setShowLeaveDialog] = useState(false);
  const [pendingNavigation, setPendingNavigation] = useState(null);

  const isInStudyRoom = location.pathname.startsWith('/studyroom/');

  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  const handleNavigation = (path) => {
    if (isInStudyRoom) {
      setPendingNavigation(path);
      setShowLeaveDialog(true);
    } else {
      navigate(path);
    }
  };

  const confirmLeave = () => {
    setShowLeaveDialog(false);
    if (pendingNavigation) {
      navigate(pendingNavigation);
      setPendingNavigation(null);
    }
  };

  const cancelLeave = () => {
    setShowLeaveDialog(false);
    setPendingNavigation(null);
  };

  return (
    <>
    <nav className="fixed top-0 left-0 right-0 z-50 glass border-b" style={{ borderColor: 'var(--border)' }}>
      <div className="container mx-auto px-6 py-4">
        <div className="flex justify-between items-center">
          <button onClick={() => handleNavigation('/')} className="flex items-center space-x-3 group cursor-pointer">
            <svg className="w-10 h-10 transform group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{ color: 'var(--primary)' }}>
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
            <span className="text-2xl font-bold" style={{ color: 'var(--text-primary)' }}>
              Virtual Study Space
            </span>
          </button>
          
          <div>
            {user ? (
              <div className="flex items-center space-x-3">
                <div className="hidden md:flex items-center space-x-2 px-4 py-2 rounded-lg border" style={{ backgroundColor: 'var(--bg-secondary)', borderColor: 'var(--border)' }}>
                  <div className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold text-white" style={{ backgroundColor: 'var(--primary)' }}>
                    {user.displayName?.charAt(0) || 'U'}
                  </div>
                  <span className="text-sm font-medium" style={{ color: 'var(--text-primary)' }}>{user.displayName}</span>
                </div>
                
                <button
                  onClick={() => handleNavigation('/')}
                  className="hidden md:block px-4 py-2 transition-colors rounded-lg"
                  style={{ color: 'var(--text-secondary)' }}
                  onMouseEnter={(e) => e.target.style.backgroundColor = 'var(--bg-secondary)'}
                  onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}
                >
                  Home
                </button>
                
                <button
                  onClick={() => handleNavigation('/create-room')}
                  className="px-5 py-2.5 text-white font-medium rounded-lg transition-all transform hover:scale-105"
                  style={{ backgroundColor: 'var(--primary)' }}
                >
                  + Create Room
                </button>
                
                <button
                  onClick={() => handleNavigation('/join-room')}
                  className="px-5 py-2.5 font-medium rounded-lg border transition-all transform hover:scale-105"
                  style={{ 
                    backgroundColor: 'var(--bg-secondary)',
                    color: 'var(--primary)',
                    borderColor: 'var(--border)'
                  }}
                >
                  Join Room
                </button>
                
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
                className="px-6 py-2.5 text-white font-medium rounded-lg transition-all transform hover:scale-105"
                style={{ backgroundColor: 'var(--primary)' }}
              >
                Sign In
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>

    {/* Leave Confirmation Dialog */}
    {showLeaveDialog && (
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-[9999] px-4">
        <div className="glass rounded-2xl p-8 border max-w-md w-full animate-fadeIn bg-white card-shadow" style={{ borderColor: 'var(--border)' }}>
          <div className="text-center mb-6">
            <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4" style={{ backgroundColor: 'rgba(234, 179, 8, 0.1)' }}>
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{ color: '#eab308' }}>
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold mb-2" style={{ color: 'var(--text-primary)' }}>Leave Study Room?</h3>
            <p style={{ color: 'var(--text-secondary)' }}>
              Are you sure you want to leave this study room? You can rejoin anytime using the room code.
            </p>
          </div>
          <div className="flex space-x-3">
            <button
              onClick={cancelLeave}
              className="flex-1 px-6 py-3 font-semibold rounded-xl transition-all"
              style={{ 
                backgroundColor: 'var(--bg-secondary)',
                color: 'var(--text-primary)'
              }}
            >
              Stay in Room
            </button>
            <button
              onClick={confirmLeave}
              className="flex-1 px-6 py-3 bg-red-500 hover:bg-red-600 text-white font-semibold rounded-xl transition-all"
            >
              Leave Room
            </button>
          </div>
        </div>
      </div>
    )}
  </>
  );
}
