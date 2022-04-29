import React, {useState} from 'react';
import {Calendar, momentLocalizer} from 'react-big-calendar';
import { Button, MenuItem, Select } from "@mui/material";
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';

moment.locale('en-GB');
const localizer = momentLocalizer(moment);

function generate_events(schedule) {
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
                   "end": end_date1};
      start_date2.setDate((todate.getDate()-today)+i);
      start_date2.setHours(15, 0, 0);
      end_date2.setDate((todate.getDate()-today)+i);
      end_date2.setHours(21, 0, 0);
      events[2*i+1] = {"title": schedule["cat"].concat("\n\n\n", schedule[days[i]]["An"]),
                   "start": start_date2,
                   "end": end_date2};
  }
  return events;
};

function OnCallSchedule(props) {

  const time = Date.now();
  
  const categories = props.categories;
  const oncall = props.oncall;
  const [category, setCategory] = useState('');
  const [all_events, setAllEvents] = useState('');

  function categorySchedule(category) {
    console.log("Entered function");
    var events = [];
    if (category == "All") {
      for (var i=0; i < oncall.length; i++) {
        events = events.concat(generate_events(oncall[i]));
      }
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
      events = generate_events(oncall[id]);
    }
    setAllEvents(events);
    console.log(all_events.length);
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