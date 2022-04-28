import { Button, Container, MenuItem, Select, TextField, Stack } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function NewTicketPage(props) {
  const categories = props.categories;
  const backendURL = props.backendURL;
  const email = props.email;
  let navigate = useNavigate();
  const [subject, setSubject] = useState('');
  const [category, setCategory] = useState('');
  const [message, setMessage] = useState('');

  const raiseTicket = (e) => {
    fetch(`${backendURL}/student/raiseticket`, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      credentials: 'include',
      body: JSON.stringify({
        id: email,
        cat: category,
        sub: subject,
        desc: message
      })
    }).then((res) => {
      if (res.ok) {
        navigate("/");
      }
    });
  };
  console.log(categories)
  return (
    <Container>
      <Stack>
        <TextField
          label="Subject"
          variant="outlined" 
          value={subject} 
          onChange={(e) => setSubject(e.target.value)}
        />
        <Select
          label="Category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          {categories.map((category) => (
            <MenuItem value={category} key={category}>{category}</MenuItem>
          ))}
        </Select>
        <TextField
          label="Description"
          value={message}
          onChange={(e)=>{setMessage(e.target.value)}}
          multiline
        />
        <Button
          variant="contained"
          onClick={raiseTicket}
        >
          Create Ticket
        </Button>
      </Stack>
    </Container>
  );
}

export default NewTicketPage;