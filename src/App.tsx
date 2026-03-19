import { useState, useEffect } from 'react';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Exams } from './pages/Exams';
import { Login } from './pages/Login';
import { Tules } from './pages/Tules';
import { Theory } from './pages/Theory';
import { TheoryStudy } from './pages/TheoryStudy';
import { Account } from './pages/Account';
import { MainLayout } from './pages/MainLayout';
import { authClient } from '../lib/auth-client';
import { InstallPWA } from './components/InstallPWA';
import { TulManagement } from './pages/TulManagement';
import { TulVideo } from './pages/TulVideo';
import { ExamDetail } from './pages/ExamDetail';
import { ProgressProvider } from './context/ProgressContext';

function App() {
  const [session, setSession] = useState<unknown>(() => {
    const stored = localStorage.getItem('authSession');
    return stored ? JSON.parse(stored) : null;
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkSession = async () => {
      try {
        const sessionData = await authClient.getSession();
        const currentSession = sessionData.data?.session || null;
        setSession(currentSession);

        if (currentSession) {
          localStorage.setItem('authSession', JSON.stringify(currentSession));
        } else {
          localStorage.removeItem('authSession');
        }
      } catch {
        setSession(null);
        localStorage.removeItem('authSession');
      } finally {
        setIsLoading(false);
      }
    };

    checkSession();
  }, []);

  const handleLoginSuccess = async () => {
    try {
      const sessionData = await authClient.getSession();
      const currentSession = sessionData.data?.session || null;
      setSession(currentSession);

      if (currentSession) {
        localStorage.setItem('authSession', JSON.stringify(currentSession));
      }
    } catch {
      setSession(null);
      localStorage.removeItem('authSession');
    }
  };

  const handleLogout = async () => {
    await authClient.signOut();
    setSession(null);
    localStorage.removeItem('authSession');
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center w-screen h-screen">
        <div className="text-lg">Cargando...</div>
      </div>
    );
  }

  const appContent = session ? (
    <ProgressProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<MainLayout onLogout={handleLogout} />}>
            <Route path="/" element={<Exams />} />
            <Route path="/exam/:examId" element={<ExamDetail />} />
            <Route path="/tules">
              <Route index element={<Tules />} />
              <Route path=":tulId" element={<TulManagement />} />
              <Route path=":tulId/video" element={<TulVideo />} />
            </Route>
            <Route path="/theory" element={<Theory />} />
            <Route path="/theory/study" element={<TheoryStudy />} />
            <Route path="/account" element={<Account />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ProgressProvider>
  ) : (
    <Login onLoginSuccess={handleLoginSuccess} />
  );

  return (
    <>
      <InstallPWA />
      {appContent}
    </>
  );
}

export default App;