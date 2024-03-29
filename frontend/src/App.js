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
import UpdateOnCallSpecific from './Pages/UpdateOnCallSpecificPage';
import UpdateOnCallWeekly from './Pages/UpdateOnCallWeeklyPage';
import Test from "./Pages/test";
import ViewIncident from './Pages/ViewIncident';
import ViewRespondersPage from './Pages/ViewRespondersPage';
import AddResponder from './Pages/AddResponder';

export const STUDENT = '0', RESPONDER = '1', ADMIN = '2', LOGGEDOUT = '3';


function App() {
  // const [isLoggedIn, setIsLoggedIn] = useState(document.cookie.match(/^(.*;)?\s*session\s*=\s*[^;]+(.*)?$/));
  const [email, setEmail] = useState('');
  const [userType, setUserType] = useState(LOGGEDOUT);
  const [categories, setCategories] = useState([]);
  const [incidentList, setIncidentList] = useState([]);
  const [responderList, setResponderList] = useState([]);
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
          <Route path="/view-incidents" element={
            <ViewIncidentsPage 
              backendURL={backendURL} 
              userType={userType}
              categories={categories}
              email = {email}
              incidents = {incidentList}
              setIncidents = {setIncidentList}
            />} />
          <Route path="/view-incident" element={
            <ViewIncident incidents ={incidentList} 
              userType={userType} 
              backendURL={backendURL} 
              email={email}
              toast={toast}/>} />
          <Route path="/view-responders" element={
            <ViewRespondersPage 
              backendURL={backendURL} 
              userType={userType}
              categories={categories}
              email = {email}
              responders = {responderList}
              setResponders = {setResponderList}
            />} />
          <Route path="/add-responder" element={<AddResponder backendURL={backendURL} categories={categories} toast={toast}/>} />
          <Route path="/view-oncall" element={<OnCallSchedule backendURL={backendURL} categories={categories}/>} />
          <Route path="/update-oncallweekly" element={
            <UpdateOnCallWeekly backendURL={backendURL} 
              userType={userType}
              categories={categories}
              toast = {toast}
            />} />
          <Route path="/update-oncallspecific" element={
            <UpdateOnCallSpecific backendURL={backendURL} 
              userType={userType}
              categories={categories}
              toast = {toast}
            />} />
          <Route path="/admin-home" element={<AdminHome/>}/>
          {/* <Route path ="/test" element={<Test categories={categories} oncall={oncall}/>}/> */}
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
