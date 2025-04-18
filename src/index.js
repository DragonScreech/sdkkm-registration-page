import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Routes, Route } from 'react-router';
import Register from './Register';
import Donations from './Donations';
import RegistrationPage from './RegistrationCards';
import DonationForm from './DonationForm';
import Report from './Report';
import ProtectedRoute from './ProtectedRoute';
import SimpleLogin from './Login';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/cards" element={<RegistrationPage />} />
        <Route path="/register" element={<Register />} />
        <Route path="/donations" element={<Donations />} />
        <Route path="/donationForm" element={<DonationForm></DonationForm>} />
        <Route path="/login" element={<SimpleLogin />} />
        <Route
          path="/report"
          element={
            <ProtectedRoute>
              <Report />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
