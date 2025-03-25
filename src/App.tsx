import React from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { Sender } from './pages/Sender';
import { Receiver } from './pages/Receiver';

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gray-100">
        <nav className="bg-white shadow-lg p-4">
          <div className="max-w-2xl mx-auto flex justify-center space-x-8">
            <Link
              to="/sender"
              className="text-gray-600 hover:text-gray-900 font-medium"
            >
              Sender
            </Link>
            <Link
              to="/receiver"
              className="text-gray-600 hover:text-gray-900 font-medium"
            >
              Receiver
            </Link>
          </div>
        </nav>

        <Routes>
          <Route path="/sender" element={<Sender />} />
          <Route path="/receiver" element={<Receiver />} />
          <Route
            path="/"
            element={
              <div className="flex items-center justify-center min-h-screen">
                <div className="text-center">
                  <h1 className="text-3xl font-bold mb-4">
                    WebRTC Signal Application
                  </h1>
                  <p className="text-gray-600 mb-8">
                    Choose a role to begin:
                  </p>
                  <div className="space-x-4">
                    <Link
                      to="/sender"
                      className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition-colors"
                    >
                      Sender
                    </Link>
                    <Link
                      to="/receiver"
                      className="bg-green-500 text-white px-6 py-2 rounded-lg hover:bg-green-600 transition-colors"
                    >
                      Receiver
                    </Link>
                  </div>
                </div>
              </div>
            }
          />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;