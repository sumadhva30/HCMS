import React from "react";
import { Stack, Button } from "@mui/material";
import { Link } from "react-router-dom";
import { LOGGEDOUT, STUDENT } from "../App";

export default function Navbar(props) {
  const backendURL = props.backendURL;
  const userType = props.userType;

  return (
    <Stack direction="row">
      {userType != LOGGEDOUT ?
        <Link to="/"><Button variant="outlined">Home</Button></Link> : null}
      {userType == STUDENT ?
        <Link to="/new-ticket"><Button variant="outlined">Raise Ticket</Button></Link> : null}
      {userType != LOGGEDOUT ? 
        <Logout backendURL={backendURL}/> : null }
    </Stack>);
}

function Logout(props) {
  const backendURL = props.backendURL;

  return <Button variant="outlined" href={`${backendURL}/signout`}>Logout</Button>;
}