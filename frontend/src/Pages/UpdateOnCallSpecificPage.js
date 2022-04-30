import { Button, Container, MenuItem, Select, TextField, Stack, InputLabel } from "@mui/material";
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function UpdateOnCallSpecific(props) {
  const categories = props.categories;
  const backendURL = props.backendURL;
  const toast = props.toast;
  let navigate = useNavigate();
  const [category, setCategory] = useState('');
  const [slot, setSlot] = useState('');
  const [responder, setResponder] = useState('');
  const [date, setDate] = useState('');
  

  const updateSchedule = (e) => {
      console.log(date);
    fetch(`${backendURL}/admin/updateOncallSpecific/`, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      credentials: 'include',
      body: JSON.stringify({
        cat: category,
        slot: {
            Date: date,
            Time: slot
        },
        resp_id: responder
      })
    }).then((res) => {
      if (res.ok) {
        toast("success", "Schedule Updated!");
        navigate("/view-oncall");
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
        <InputLabel id="Select-Date">Date</InputLabel>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
        <DatePicker
            labelId="Select-Date"
            label="Select Date"
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
          label="Enter new Responder"
          value={responder}
          onChange={(e)=>{setResponder(e.target.value)}}
          multiline
        />
        <Button
          variant="contained"
          onClick={updateSchedule}
        >
          Update Schedule
        </Button>
      </Stack>
    </Container>
  );
}

export default UpdateOnCallSpecific;