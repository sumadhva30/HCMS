import { Button, Container, MenuItem, Select, TextField, Stack, InputLabel } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function UpdateOnCallWeekly(props) {
  const categories = props.categories;
  const backendURL = props.backendURL;
  const toast = props.toast;
  let navigate = useNavigate();
  const [category, setCategory] = useState('');
  const [slot, setSlot] = useState('');
  const [responder, setResponder] = useState('');
  const [day, setDay] = useState('');

  const days = ["sunday","monday","tuesday","wednesday","thursday","friday","saturday"];
  

  const updateSchedule = (e) => {
    var a = {}, b = {};
    a["cat"] = category;
    b[slot] = responder;
    a[day] = b;
    console.log(JSON.stringify(a));
    fetch(`${backendURL}/admin/updateOncallWeekly/`, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      credentials: 'include',
      body: JSON.stringify(a)
    }).then((res) => {
      if (res.ok) {
        toast("success", "Schedule Updated!");
        navigate("/view-oncall");
      }
    });
  };
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
        <InputLabel id="Select-Day">Day</InputLabel>
        <Select
          labelId="Select-Day"
          label="Day"
          value={day}
          onChange={(e) => setDay(e.target.value)}
        >
          {days.map((day) => (
            <MenuItem value={day} key={day}>{day}</MenuItem>
          ))}
        </Select>
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

export default UpdateOnCallWeekly;