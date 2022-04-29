import { Button, TextField, Container, Stack } from "@mui/material";
import { STUDENT,RESPONDER, ADMIN, LOGGEDOUT } from "../App";
import * as React from 'react';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import { useNavigate } from "react-router-dom";
import { useState } from "react";



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

  const incident = [{
    "_id": "134235246364234123",
    "sub": "reg water dispenser",
    "cat": "Water_Dispensers",
    "assigned": true,
    "resolved": true,
    "severity": 0,
    "resp_id": "responder@iith.ac.in",
    "std_info": {
      "id": "es18btech11021",
      "name": "Vamshi",
      "room_no": "D-613",
      "ph_no": "9618928321"
    },
    "notes": [
      {
        "sender_id": "admin@iith.ac.in",
        "note": "Category has been changed",
        "timeStamp": "2022-04-28T19:33:03.313Z"
      },
      {
        "sender_id": "responder@iith.ac.in",
        "note": "Ticket severity has been changed",
        "timeStamp": "2022-04-28T19:33:03.313Z"
      }
    ],
    "msgs": [
      {
        "sender_id": "student@iith.ac.in",
        "msg": "hello",
        "timeStamp": "2022-04-28T19:33:03.313Z"
      },
      {
        "sender_id": "responder@iith.ac.in",
        "msg": "hi",
        "timeStamp": "2022-04-28T19:33:03.313Z"
      },
      {
        "sender_id": "student@iith.ac.in",
        "msg": "is issue resolved",
        "timeStamp": "2022-04-28T19:33:03.313Z"
      },
      {
        "sender_id": "responder@iith.ac.in",
        "msg": "no we are working on it",
        "timeStamp": "2022-04-28T19:33:03.313Z"
      }
    ],
    "feedback": {
      "resolved": true,
      "act_rating": 0,
      "respTime_rating": 0,
      "comments": "string"
    }
  }];

function ViewIncident(props) {
    const userType = ADMIN
    let navigate = useNavigate();
    const id_body = incident[0]._id
    const [sender_msg, setMessage] = useState(''); 
    const [sender_note, setNote] = useState('');
    const sender_email = "responder@iith.ac.in";
    const timestamp = "2022-04-28T19:33:03.313Z";
    const backendURL = "http://localhost:8000"; 

    const updateIncidentnotes = (e) => {
        fetch(`${backendURL}/updateincident`, {
          method: 'POST',
          headers: {'Content-Type': 'application/json'},
          credentials: 'include',
          body: JSON.stringify({
            _id: id_body,
            notes: JSON.stringify({
                sender_id: sender_email,
                note: sender_note,
                timeStamp: timestamp
            })
    
          })
        }).then((res) => {
          if (res.ok) {
            // toast("success", "Ticket raised!");
            navigate("/");
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
          msgs: JSON.stringify({
              sender_id: sender_email,
              msg: sender_msg,
              timeStamp: timestamp
          })
  
        })
      }).then((res) => {
        if (res.ok) {
          // toast("success", "Ticket raised!");
          navigate("/");
        }
      });
    };
    return (
        <Container>
            <Stack direction="row" spacing={2}>
                <Item>id: {incident[0]._id} </Item>
                <Item>sub: {incident[0].sub} </Item>
                <Item>cat: {incident[0].cat} </Item>
                <Item>assigned: {incident[0].assigned ? "Assigned": "Unassigned" } </Item>
                <Item>resolved: {incident[0].resolved ? "Resolved": "Unresolved" } </Item>
                <Item>severity: {incident[0].severity} </Item>
                <Item>resp_id: {incident[0].resp_id} </Item>
                {/* <Item>std_info: {std_info.id} </Item> */}
            </Stack>
            <br/>
            <br/>
            <br/>
            <br/>
            {userType != STUDENT ? 
            <Stack spacing={2}>
                <Item3>Incident notes:</Item3>
                {(incident[0].notes||[]).map((note)=> (
                    <Item4>{note.timeStamp.substring(11,16)} $ {note.sender_id}: {note.note}</Item4>
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
                {(incident[0].msgs||[]).map((msg)=> (
                    <Item2>{msg.timeStamp.substring(11,16)} $   {msg.sender_id}: {msg.msg}</Item2>
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
        </Container>
    );}
  
  export default ViewIncident;