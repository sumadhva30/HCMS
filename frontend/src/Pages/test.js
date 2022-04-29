import { Button, Container, MenuItem, Select, TextField, Stack } from "@mui/material";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function generate_events(schedule) {
    var days = ["sunday","monday","tuesday","wednesday","thursday","friday","saturday","sunday"]
    var todate = new Date(), date = new Date();
    var today = todate.getDay();
    var events = [];
    for (var i=0; i < days.length; i++) {
        date.setDate((todate.getDate()-today)+i);
        events.push({'title': schedule[days[i]]["Fn"],
                     'start': date.setHours(9, 0, 0),
                     'end': date.setHours(15, 0, 0)})
        events.push({'title': schedule[days[i]]["An"],
                     'start': date.setHours(15, 0, 0),
                     'end': date.setHours(21, 0, 0)})
    }
    return events;
}

function Test(props) {
  const categories = props.categories;
  const oncall = props.oncall;
  const [category, setCategory] = useState('');
  const [onc, setOnc] = useState([]);

  var events = [];
  for (var i=0; i < oncall.length; i++) {
      events.push(...generate_events(oncall[i]));
  }

  console.log(events)

  return (
    <Container>
      <Stack>
        <Select
          label="Category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          {categories.map((category) => (
            <MenuItem value={category} key={category}>{category}</MenuItem>
          ))}
        </Select>
        <Select
          label="OnCall"
          value={onc}
          onChange={(e) => setOnc(e.target.value)}
        >
          {oncall.map((onc) => (
            <MenuItem value={onc} key={onc}>{onc}</MenuItem>
          ))}
        </Select>
      </Stack>
    </Container>
  );
}

export default Test;