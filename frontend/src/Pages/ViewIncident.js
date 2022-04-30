import { Button, TextField, Container, Stack, Select, MenuItem } from "@mui/material";
import { STUDENT,RESPONDER, ADMIN, LOGGEDOUT } from "../App";
import * as React from 'react';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import FeedbackForm from "../Components/FeedbackForm";

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#B2E7C8',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  }));
  const Item2 = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#E3D0CD',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  }));
  const Item3 = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#F9B5A6',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  }));
  const Item4 = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#B4ACAA',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  }));


function ViewIncident(props) {
  console.log("check below")
  const incidents = props.incidents;
  const backendURL = props.backendURL;
  const toast = props.toast;
  console.log(incidents)
  const location = useLocation()
  const { id } = location.state
  console.log(id)
  const incident = incidents.find(x => x._id.$oid === id)
  console.log(incident)

  const userType = props.userType
  let navigate = useNavigate();
  const id_body = incident._id.$oid
  const [sender_msg, setMessage] = useState(''); 
  const [sender_note, setNote] = useState('');
  const sender_email = props.email;
  const timestamp = new Date();
  const [reso, setReso] = useState(incident.resolved);
  useEffect(() => setReso(incident.resolved), [incident.resolved]);
  useEffect(() => {
    if (reso != incident.resolved)
      updateIncidentReso();
  }, [reso]);
  // const backendURL = "http://localhost:8000"; 

    
    const updateIncidentnotes = (e) => {
        fetch(`${backendURL}/updateincident`, {
          method: 'POST',
          headers: {'Content-Type': 'application/json'},
          credentials: 'include',
          body: JSON.stringify({
            _id: id_body,
            notes: [{

                sender_id: sender_email,
                note: sender_note,
                timeStamp: timestamp.toISOString()
            }]
    
          })
        }).then((res) => {
          if (res.ok) {
            // toast("success", "Ticket raised!");
            navigate("/view-incidents");
          }
        });
      };

      const updateIncidentReso = () => {
        fetch(`${backendURL}/updateincident`, {
          method: 'POST',
          headers: {'Content-Type': 'application/json'},
          credentials: 'include',
          body: JSON.stringify({
            _id: id_body,
           resolved: reso
    
          })
        }).then((res) => {
          if (res.ok) {
            // toast("success", "Ticket raised!");
            console.log("check below");
            reso ? console.log("true"):console.log("false")
            navigate("/view-incidents");
          }
        });
      };
      

  
    const updateIncidentmsg = (e) => {
      fetch(`${backendURL}/updateincident`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        credentials: 'include',
        body: JSON.stringify({
          _id: id_body,
          msgs: [{
              sender_id: sender_email,
              msg: sender_msg,
              timeStamp: timestamp.toISOString()
          }]
  
        })
      }).then((res) => {
        if (res.ok) {
          // toast("success", "Ticket raised!");
          navigate("/view-incidents");
        }
      });
    };
    // useEffect()
    return (
        <Container>
          <br/>
          <br/>
            <Stack direction="row" spacing={2}>
                {/* <Item>id: {incident._id.$oid} </Item> */}
                
                <Item>Sub: {incident.sub} </Item>
                <Item>Category: {incident.cat} </Item>
                <Item>Assigned: {incident.assigned ? "Assigned": "Unassigned" } </Item>
                <Item>Status: {incident.resolved ? "Resolved": "Unresolved" } </Item>
                <Item>Severity: {incident.severity} </Item>
                <Item>Resp_id: {incident.resp_id} </Item>
                {/* <Item>std_info: {std_info.id} </Item> */}
            </Stack>
            <br/>
            <br/>
            <Stack direction="row" spacing={2}>
                {/* <Item>id: {incident._id.$oid} </Item> */}
                
                <Select
                  id="res"
                  labelId="demo-simple-select-label"
                  label="Resolved"
                  value={reso}
                  onChange={(e) => {setReso(e.target.value)}}
                >
                <MenuItem value={true} >Yes</MenuItem>
                <MenuItem value={false}>No</MenuItem>
              </Select>
                {/* <Item>std_info: {std_info.id} </Item> */}
            </Stack>
            <br/>
            <br/>
            {userType != STUDENT ? 
            <Stack spacing={2}>
                <Item3>Incident notes:</Item3>
                {(incident.notes||[]).map((note)=> (
                    <Item4>{note.timeStamp.$date.substring(11,16)} $ {note.sender_id}: {note.note}</Item4>
                ))}
            </Stack>
            : null}
            <br></br>
            <TextField
                label="Enter note"
                value={sender_note}
                onChange={(e)=>{setNote(e.target.value)}}
                multiline
            />
            <br></br>
            <br></br>
            <Button
                variant="contained"
                onClick={updateIncidentnotes}
            >
                Add Note
            </Button>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <Stack spacing={2}>
                <Item3>Messages:</Item3>
                {(incident.msgs||[]).map((msg)=> (
                    <Item2>{msg.timeStamp.$date.substring(11,16)} $   {msg.sender_id}: {msg.msg}</Item2>
                ))}
            </Stack>
            <br></br>
            <TextField
                label="Enter the message"
                value={sender_msg}
                onChange={(e)=>{setMessage(e.target.value)}}
                multiline
            />
            <br></br>
            <br></br>
            <Button
                variant="contained"
                onClick={updateIncidentmsg}
            >
                Add Message
            </Button>
            <br></br>
            <br></br>
            <FeedbackForm incident={incident} backendURL={backendURL} userType={userType} toast={toast}/>
        </Container>
    );}
  
  export default ViewIncident;