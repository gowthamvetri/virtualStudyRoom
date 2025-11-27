import { Link } from "react-router-dom";

export default function Home({ user }) {
  return (
    <div className="min-h-screen pt-20 px-4">
      <div className="container mx-auto max-w-6xl">
        {/* Hero Section */}
        <div className="text-center py-20 animate-fadeIn">
          <div className="inline-flex items-center justify-center w-24 h-24 bg-black rounded-3xl mb-6 transform hover:scale-110 transition-transform shadow-lg shadow-black/20">
            <svg className="w-14 h-14 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
          </div>
          
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            <span className="text-black">
              Virtual Study Space
            </span>
          </h1>
          
          <p className="text-xl text-gray-600 mb-12 max-w-2xl mx-auto">
            Collaborate with peers in real-time study rooms. Stay focused with Pomodoro timers and connect through live chat.
          </p>
          
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              to="/create-room"
              className="px-8 py-4 bg-black hover:bg-gray-800 text-white font-semibold rounded-xl transition-all transform hover:scale-105 hover:shadow-xl hover:shadow-black/20"
            >
              Create Study Room
            </Link>
            
            <Link
              to="/join-room"
              className="px-8 py-4 bg-gray-200 hover:bg-gray-300 text-black font-semibold rounded-xl border border-gray-300 transition-all transform hover:scale-105"
            >
              Join Existing Room
            </Link>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-6 py-12">
          <div className="glass rounded-2xl p-6 border border-gray-200 hover:border-black/30 transition-all transform hover:scale-105">
            <div className="w-14 h-14 bg-black rounded-xl flex items-center justify-center mb-4">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
<h3 className="text-xl font-bold mb-2 text-black">Pomodoro Timer</h3>
<p className="text-gray-600">Stay focused with built-in Pomodoro technique timers for optimal productivity.</p>
          </div>

          <div className="glass rounded-2xl p-6 border border-gray-200 hover:border-black/30 transition-all transform hover:scale-105">
            <div className="w-14 h-14 bg-black rounded-xl flex items-center justify-center mb-4">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold mb-2 text-black">Real-time Chat</h3>
            <p className="text-gray-600">Collaborate instantly with peers through synchronized messaging in study rooms.</p>
          </div>

          <div className="glass rounded-2xl p-6 border border-gray-200 hover:border-black/30 transition-all transform hover:scale-105">
            <div className="w-14 h-14 bg-black rounded-xl flex items-center justify-center mb-4">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold mb-2 text-black">Study Groups</h3>
            <p className="text-gray-600">Create or join study rooms to learn together with friends and classmates.</p>
          </div>
        </div>

        {/* How It Works Section */}
        <div className="py-16 border-t border-gray-200">
          <h2 className="text-4xl font-bold text-center mb-12 text-black">How It Works</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-100 rounded-full mb-4 text-2xl font-bold text-black">
                1
              </div>
              <h3 className="text-xl font-bold mb-3 text-black">Sign In</h3>
              <p className="text-gray-600">Authenticate with your Google account to get started with Virtual Study Space.</p>
            </div>
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-100 rounded-full mb-4 text-2xl font-bold text-black">
                2
              </div>
              <h3 className="text-xl font-bold mb-3 text-black">Create or Join</h3>
              <p className="text-gray-600">Start your own study room or join an existing one using a room code.</p>
            </div>
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-100 rounded-full mb-4 text-2xl font-bold text-black">
                3
              </div>
              <h3 className="text-xl font-bold mb-3 text-black">Study Together</h3>
              <p className="text-gray-600">Use the Pomodoro timer, chat with peers, and stay productive together.</p>
            </div>
          </div>
        </div>

        {/* Benefits Section */}
        <div className="py-16">
          <div className="glass rounded-3xl p-12 border border-gray-200">
            <h2 className="text-4xl font-bold text-center mb-8 text-black">Why Choose Virtual Study Space?</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-8 h-8 bg-black rounded-lg flex items-center justify-center mt-1">
                  <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-lg font-bold mb-1 text-black">Boost Productivity</h3>
                  <p className="text-gray-600">Pomodoro timers help maintain focus and prevent burnout during study sessions.</p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-8 h-8 bg-black rounded-lg flex items-center justify-center mt-1">
                  <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-lg font-bold mb-1 text-black">Real-Time Collaboration</h3>
                  <p className="text-gray-600">Instant messaging keeps everyone connected and engaged in the learning process.</p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-8 h-8 bg-black rounded-lg flex items-center justify-center mt-1">
                  <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-lg font-bold mb-1 text-black">Easy Room Sharing</h3>
                  <p className="text-gray-600">Share room codes with classmates to instantly create study groups.</p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-8 h-8 bg-black rounded-lg flex items-center justify-center mt-1">
                  <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-lg font-bold mb-1 text-black">No Setup Required</h3>
                  <p className="text-gray-600">Just sign in with Google and start studying - no complex configuration needed.</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center py-16">
          <h2 className="text-4xl font-bold mb-4 text-black">Ready to Get Started?</h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Join thousands of students who are already studying smarter, not harder.
          </p>
          <Link
            to="/create-room"
            className="inline-block px-10 py-5 bg-black hover:bg-gray-800 text-white font-semibold rounded-xl transition-all transform hover:scale-105 hover:shadow-xl hover:shadow-black/20 text-lg"
          >
            Create Your First Room
          </Link>
        </div>
      </div>
    </div>
  );
}
