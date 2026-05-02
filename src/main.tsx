import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './styles/index.css';
import App from './App.tsx';
import { ReloadPrompt } from './components/ReloadPrompt.tsx';
import { InstallPWA } from './components/InstallPWA.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
    <InstallPWA />
    <ReloadPrompt />
  </StrictMode>
);
