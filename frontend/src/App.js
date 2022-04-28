import './App.css';
import React, {useState, useEffect} from "react";
import { Routes, BrowserRouter, Route } from "react-router-dom";
import NewTicketPage from "./Pages/NewTicketPage";
import ViewIncidentsPage from "./Pages/ViewIncidentsPage";
import LoginPage from "./Pages/LoginPage";
import StudentHome from "./Pages/StudentHome";
import ResponderHome from './Pages/ResponderHome';
import AdminHome from './Pages/AdminHome';

const STUDENT = '0', RESPONDER = '1', ADMIN = '2', LOGGEDOUT = '3';


function App() {
  // const [isLoggedIn, setIsLoggedIn] = useState(document.cookie.match(/^(.*;)?\s*session\s*=\s*[^;]+(.*)?$/));
  const [email, setEmail] = useState('');
  const [userType, setUserType] = useState(LOGGEDOUT);

  const backendURL = "http://localhost:8000";

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
        {/*TODO NavPage later ({
              LOGGEDOUT: <LoggedOutNav />,
              STUDENT: <StudentNav />,
              RESPONDER: <ResponderNav />,
              ADMIN: <AdminNav />
          })[userType] }*/
        }
      <BrowserRouter>
        <Routes>
          <Route index element={<HomePage userType={userType} backendURL={backendURL} setUserType = {setUserType}/>}/>
          <Route path="/new-ticket" element={<NewTicketPage/>} />
          <Route path="/view-incidents" element={<ViewIncidentsPage/>} />
          {/*... etc ...*/}
        </Routes>
      </BrowserRouter>
    </div>
  );
}

function HomePage(props) {
  const userType = props.userType;
  const backendURL = props.backendURL;
  const setUserType = props.setUserType;

  switch(userType) {
    case STUDENT: return <StudentHome />;
    case RESPONDER: return <ResponderHome />;
    case ADMIN: return <AdminHome />;
    case LOGGEDOUT: return <LoginPage backendURL={backendURL}/>;
  }
}

export default App;
