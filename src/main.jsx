// main.jsx
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client'; // ✅ This is essential!
import App from './App.jsx';
import "./index.css"


const root = document.getElementById('root');

createRoot(root).render(
  <StrictMode>
    <App />
  </StrictMode>
);
