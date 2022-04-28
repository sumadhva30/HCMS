import React from "react";
import { Stack, Button } from "@mui/material";
import { LOGGEDOUT } from "../App";

export default function Navbar(props) {
  const backendURL = props.backendURL;
  const userType = props.userType;

  return (<Stack direction="row">
    <Logout userType={userType} backendURL={backendURL}/>
    </Stack>);
}

function Logout(props) {
  const userType = props.userType;
  const backendURL = props.backendURL;

  if(userType != LOGGEDOUT)
    return <Button variant="outlined" href={`${backendURL}/signout`}>Logout</Button>;
  return null;
}