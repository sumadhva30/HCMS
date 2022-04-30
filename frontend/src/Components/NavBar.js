import React from "react";
import { Stack, Button } from "@mui/material";
import { Link } from "react-router-dom";
import { LOGGEDOUT, STUDENT, ADMIN } from "../App";

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
      {userType != LOGGEDOUT ?
        <Link to="/view-incidents"><Button variant="outlined">View Incidents</Button></Link> : null}
      {userType == ADMIN ?
        <Link to="/view-responders"><Button variant="outlined">View Responders</Button></Link> : null}
      {userType == ADMIN ?
        <Link to="/view-categories"><Button variant="outlined">View Categories</Button></Link> : null}
      {userType == ADMIN ?
        <Link to="/view-oncall"><Button variant="outlined">View On Call Schedule</Button></Link> : null}
    </Stack>);
}

function Logout(props) {
  const backendURL = props.backendURL;

  return <Button variant="outlined" href={`${backendURL}/signout`}>Logout</Button>;
}