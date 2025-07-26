import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App';
import StudentLogin from './Components/Student_Login';
import StudentRegister from './Components/Student_Registration';
import AdminLogin from './Components/Admin_Login';
import AdminRegister from './Components/Admin_Registration';
import StudentDashboard from './Components/Student_Dashboard';
import AdminDashboard from './Components/Admin_Dashboard';
import StudentProfile from './Components/Student_Profile';

import { BrowserRouter, Route, Routes } from 'react-router-dom';

const root = document.getElementById('root');
const app = createRoot(root);

app.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/studentlogin" element={<StudentLogin />} />
      <Route path="/studentregister" element={<StudentRegister />} />
      <Route path="/adminlogin" element={<AdminLogin />} />
      <Route path="/adminregister" element={<AdminRegister />} />
      <Route path="/studentdashboard" element={<StudentDashboard/>}/>
      <Route path="/admindashboard" element={<AdminDashboard/>}/>
      <Route path="/studentprofile" element={<StudentProfile/>}/>
    </Routes>
  </BrowserRouter>
);
