import React, {useState, useEffect} from 'react';
import {Calendar, momentLocalizer} from 'react-big-calendar';
import { Button, MenuItem, Select } from "@mui/material";
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';

moment.locale('en-GB');
const localizer = momentLocalizer(moment);

function generateEvents(schedule) {
  var days = ["sunday","monday","tuesday","wednesday","thursday","friday","saturday"]
  var todate = new Date();
  var today = todate.getDay();
  var events = [];
  for (var i=0; i < days.length; i++) {
      var start_date1 = new Date(), start_date2 = new Date(), end_date1 = new Date(), end_date2 = new Date();
      start_date1.setDate((todate.getDate()-today)+i);
      start_date1.setHours(9, 0, 0);
      end_date1.setDate((todate.getDate()-today)+i);
      end_date1.setHours(15, 0, 0);
      events[2*i] = {"title": schedule["cat"].concat("\n\n\n", schedule[days[i]]["Fn"]),
                   "start": start_date1,
                   "end": end_date1,
                   "cat": schedule["cat"]};
      start_date2.setDate((todate.getDate()-today)+i);
      start_date2.setHours(15, 0, 0);
      end_date2.setDate((todate.getDate()-today)+i);
      end_date2.setHours(21, 0, 0);
      events[2*i+1] = {"title": schedule["cat"].concat("\n\n\n", schedule[days[i]]["An"]),
                   "start": start_date2,
                   "end": end_date2,
                   "cat": schedule["cat"]};
  }
  return events;
};

function updateSpecificEvents(events, schedule, cat) {
  for(var i=0; i < schedule.length; i++) {
    var date = new Date(schedule[i]["slot"]["Date"]), slot = schedule[i]["slot"]["Time"], cate = schedule[i]["cat"];
    if(cat !== "All" && cat !== cate)
      continue;
    var start = new Date();
    start.setDate(date.getDate());
    if (slot === "Fn")
      start.setHours(9, 0, 0);
    else
      start.setHours(15, 0, 0);
    var ind = events.findIndex(obj => obj.start.getTime() === start.getTime() && obj.cat === cate);
    if(ind !== -1)
      events[ind].title = cate.concat("\n\n\n", schedule[i]["resp_id"]);
    console.log(events[ind].title);
  }
  return events;
}

function OnCallSchedule(props) {

  const time = Date.now();
  
  const categories = props.categories;
  const [category, setCategory] = useState('');
  const [all_events, setAllEvents] = useState('');

  const [weekly, setOnCallWeekly] = useState([]);
  const fetchOnCallWeekly = () => {
    fetch(`${props.backendURL}/viewOnCallWeekly`, {credentials: 'include'})
      .then((res) => res.json())
      .then((res) => setOnCallWeekly(res))
  };
  useEffect(fetchOnCallWeekly, []);

  const [specific, setOnCallSpecific] = useState([]);
  const fetchOnCallSpecific = () => {
    fetch(`${props.backendURL}/viewOnCallSpecific`, {credentials: 'include'})
      .then((res) => res.json())
      .then((res) => setOnCallSpecific(res))
  };
  useEffect(fetchOnCallSpecific, []);

  function categorySchedule(category) {
    console.log("Entered function");
    var events = [];
    if (category === "All") {
      for (var i=0; i < weekly.length; i++) {
        events = events.concat(generateEvents(weekly[i]));
      }
      events = updateSpecificEvents(events, specific, "All");
    }
    else {
      const mapping= {"Civil_Complaints": 0,
                    "Housekeeping": 1,
                    "Washing_Machines": 2,
                    "Food_Facility": 3,
                    "Water_Dispensers": 4,
                    "Electrical_Complaints": 5,
                    "Furniture": 6,
                    "Green_office": 7,
                    "Other": 8,
                    "Pest_Control": 9}
      var id = mapping[category];
      events = generateEvents(weekly[id]);
      events = updateSpecificEvents(events, specific, category);
    }
    setAllEvents(events);
    return;
  };

  return (
    <div style={{ height: 700 }}>
      <Select
          label="Category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <MenuItem value="All" key={category}>All</MenuItem> 
          {categories.map((category) => (
            <MenuItem value={category} key={category}>{category}</MenuItem>
          ))}
      </Select>
      <Button
          variant="contained"
          onClick={() => categorySchedule(category)}
        >
        Show Schedule
      </Button>
      <Calendar
        localizer={localizer}
        events={all_events}
        step={60}
        defaultDate={new Date(time)}
      />
    </div>
  )
}

export default OnCallSchedule;