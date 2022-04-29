import './App.css';
import React, {useState, useEffect} from "react";
import { Routes, BrowserRouter, Route } from "react-router-dom";
import NewTicketPage from "./Pages/NewTicketPage";
import ViewIncidentsPage from "./Pages/ViewIncidentsPage";
import LoginPage from "./Pages/LoginPage";
import StudentHome from "./Pages/StudentHome";
import ResponderHome from './Pages/ResponderHome';
import AdminHome from './Pages/AdminHome';
import Navbar from './Components/NavBar';
import CustomizedSnackbars from './Components/CustomSnackBar';
import OnCallSchedule from './Pages/ViewOnCallPage';
import Test from "./Pages/test";

export const STUDENT = '0', RESPONDER = '1', ADMIN = '2', LOGGEDOUT = '3';


function App() {
  // const [isLoggedIn, setIsLoggedIn] = useState(document.cookie.match(/^(.*;)?\s*session\s*=\s*[^;]+(.*)?$/));
  const [email, setEmail] = useState('');
  const [userType, setUserType] = useState(LOGGEDOUT);
  const [categories, setCategories] = useState([]);
  const fetchCategories = () => {
    fetch(`${backendURL}/viewCategories`, {credentials: 'include'})
      .then((res) => res.json())
      .then((res) => setCategories(res))
  };
  useEffect(fetchCategories, [userType]);
  const backendURL = "http://localhost:8000";
  // Snackbar
  const [snackbarProps, setSnackBarProps] = useState({open: false, severity: 'success', message: 'Done!'});
  const toast = (severity, message) => setSnackBarProps({open: true, severity: severity, message: message});

  useEffect(() => {
    fetch(`${backendURL}/user_type`, {credentials: 'include'})
      .then((res) => res.json())
      .then((res) => {
        setUserType(res['user_type']);
        setEmail(res['email']);
      });
  });
  console.log(userType, email);
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar backendURL={backendURL} userType={userType}/>
        {/* <ViewIncidentsPage/> */}
        <Routes>
          <Route index element={<HomePage userType={userType} backendURL={backendURL} setUserType = {setUserType}/>}/>
          <Route path="/new-ticket" element={
            <NewTicketPage 
              backendURL={backendURL}
              categories={categories}
              email={email}
              toast={toast}
            />} />
          <Route path="/view-incidents" element={<ViewIncidentsPage/>} />
          <Route path="/view-oncall" element={<OnCallSchedule backendURL={backendURL} categories={categories}/>} />
          <Route path ="/test" element={<Test categories={categories}/>}/>
          {/*... etc ...*/}
        </Routes>
        <CustomizedSnackbars settings={snackbarProps} setProps={setSnackBarProps} />
      </BrowserRouter>
    </div>
  );
}

function HomePage(props) {
  const userType = props.userType;
  const backendURL = props.backendURL;

  switch(userType) {
    case STUDENT: return <StudentHome />;
    case RESPONDER: return <ResponderHome />;
    case ADMIN: return <AdminHome />;
    case LOGGEDOUT: return <LoginPage backendURL={backendURL}/>;
  }
}

export default App;
