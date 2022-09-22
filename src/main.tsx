import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { createRoot } from 'react-dom/client';
import App from './pages/App';
import Login from './pages/login/Login';
const root = createRoot(document.getElementById('root') as HTMLElement);
const accessToken = localStorage.getItem('accessToken');
root.render(
  <BrowserRouter>
    <Routes>
      <Route path='*' element={<App />} />
      <Route path='/login' element={accessToken ? <App /> : <Login />} />
    </Routes>
  </BrowserRouter >
);
