import React, { useEffect } from 'react';
import {
  Routes,
  Route,
  useLocation
} from 'react-router-dom';

import './css/style.css';

import './charts/ChartjsConfig';

// Import pages
import Dashboard from './pages/Dashboard';
import {ProtectedRoute} from "./auth/ProtectedRoute";
import LoginPage from "./pages/loginPage";
import Campaigns from "./pages/campaigns"
import PageWrapper from "./pages/pagewrapper";

function App() {

  const location = useLocation();

  useEffect(() => {
    document.querySelector('html').style.scrollBehavior = 'auto'
    window.scroll({ top: 0 })
    document.querySelector('html').style.scrollBehavior = ''
  }, [location.pathname]); // triggered on route change

  return (
    <>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route exact path="/" element={<ProtectedRoute><Dashboard/></ProtectedRoute>} />
        <Route exact path="/campaigns" element={<ProtectedRoute><PageWrapper><Campaigns/></PageWrapper></ProtectedRoute>} />
      </Routes>
    </>
  );
}

export default App;
