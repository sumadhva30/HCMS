import { Button, Container, MenuItem, Select, TextField } from "@mui/material";
import { useState } from "react";

function NewTicketPage(props) {
  const categories = props.categories;
  const backendURL = props.backendURL;
  const [subject, setSubject] = useState('');
  const [category, setCategory] = useState('');
  const [message, setMessage] = useState('');

  const raiseTicket = (e) => {
    fetch(`${backendURL}/student/raiseticket`, {
      method: 'POST',
      credentials: 'include',
      body: {
        cat: category,
        sub: subject,
        desc: message
      }
    }).then((res) => {
      // if (res.ok) {}
    });
  };
  console.log(categories)
  return (
    <Container>
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
      />
    </Container>
  );
}

export default NewTicketPage;