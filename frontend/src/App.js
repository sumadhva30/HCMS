import './App.css';
import React, {useState, useEffect} from "react";
import { Routes, BrowserRouter, Route } from "react-router-dom";
import NewTicketPage from "./Pages/NewTicketPage";
import ViewIncidentsPage from "./Pages/ViewIncidentsPage";

function App() {
  // const [isLoggedIn, setIsLoggedIn] = useState(document.cookie.match(/^(.*;)?\s*session\s*=\s*[^;]+(.*)?$/));
  const [email, setEmail] = useState('');
  const STUDENT = 0, RESPONDER = 1, ADMIN = 2, LOGGEDOUT = 3;
  const [userType, setUserType] = useState(LOGGEDOUT);

  const backendURL = "http://localhost:8000";

  useEffect(() => {
    fetch(`${backendURL}/user_type`, {credentials: 'include'})
      .then((res) => res.text())
      .then((res) => setUserType(res));
  });
  return (
    <div className="App">
        {/*TODO NavPage later {
              LOGGEDOUT: <LoggedOutNav />,
              STUDENT: <StudentNav />,
              RESPONDER: <ResponderNav />,
              ADMIN: <AdminNav />
          }[userType] }*/
        }
      <BrowserRouter>
        <Routes>
          <Route path="/new-ticket" element={<NewTicketPage/>} />
          <Route path="/view-incidents" element={<ViewIncidentsPage/>} />
          {/*... etc ...*/}
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
