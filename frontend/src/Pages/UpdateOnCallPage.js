import { Button, Container, MenuItem, Select, TextField, Stack, InputLabel } from "@mui/material";
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers/';
import { AdapterDateFns } from '@date-io/date-fns';
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function UpdateOnCall(props) {
  const categories = props.categories;
  const backendURL = props.backendURL;
  const email = props.email;
  const toast = props.toast;
  let navigate = useNavigate();
  const [category, setCategory] = useState('');
  const [slot, setSlot] = useState('');
  const [responder, setResponder] = useState('');
  const [date, setDate] = useState('');
  

  const updateSchedule = (e) => {
    fetch(`${backendURL}/admin/updateOncallSpecific`, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      credentials: 'include',
      body: JSON.stringify({
        cat: category,
        slot: slot,
        resp_id: responder
      })
    }).then((res) => {
      if (res.ok) {
        toast("success", "Ticket raised!");
        navigate("/");
      }
    });
  };
  console.log(categories)
  return (
    <Container>
      <Stack spacing={2}>
        <InputLabel id="Select-Category">Category</InputLabel>
        <Select
          labelId="Select-Category"
          label="Category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          {categories.map((category) => (
            <MenuItem value={category} key={category}>{category}</MenuItem>
          ))}
        </Select>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
        <DatePicker
            label="Basic example"
            value={date}
            onChange={(newValue) => {
            setDate(newValue);
            }}
            renderInput={(params) => <TextField {...params} />}
        />
        </LocalizationProvider>
        <InputLabel id="Select-TimeSlot">Time Slot</InputLabel>
        <Select
          labelId="Select-TimeSlot"
          label="Slot"
          value={slot}
          onChange={(e) => setSlot(e.target.value)}
        >
          <MenuItem value="Fn" key={slot}>Fn</MenuItem>
          <MenuItem value="An" key={slot}>An</MenuItem>
        </Select>
        <TextField
          label="New-Responder"
          value={responder}
          onChange={(e)=>{setResponder(e.target.value)}}
          multiline
        />
        <Button
          variant="contained"
          onClick={updateSchedule}
        >
          Create Ticket
        </Button>
      </Stack>
    </Container>
  );
}

export default UpdateOnCall;