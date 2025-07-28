import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App';
import StudentLogin from './Components/Student_Login';
import StudentRegister from './Components/Student_Registration';
import AdminLogin from './Components/Admin_Login';
import StudentDashboard from './Components/Student_Dashboard';
import AdminDashboard from './Components/Admin_Dashboard';
import StudentProfile from './Components/Student_Profile';
import Students from './Components/Students';
import AdminProfile from './Components/Admin_Profile';
import AddAdmin from './Components/AddAdmin';
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
      <Route path="/students" element={<Students/>}/>
      <Route path="/studentdashboard" element={<StudentDashboard/>}/>
      <Route path="/admindashboard" element={<AdminDashboard/>}/>
      <Route path="/studentprofile" element={<StudentProfile/>}/>
      <Route path="/adminprofile" element={<AdminProfile/>}/>
      <Route path="/addadmin" element={<AddAdmin/>}/>
    </Routes>
  </BrowserRouter>
);
