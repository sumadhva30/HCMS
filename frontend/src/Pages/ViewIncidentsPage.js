import * as React from "react";
import * as ReactDOM from "react-dom";
import { Grid, GridColumn } from "@progress/kendo-react-grid";


const ViewIncidentsPage = (props) => {
  return (
    <Grid
      style={{
        height: "400px",
      }}
      data={[{"IncidentName": "Incident1", "StudentId":"es18btech11021", "Category":"Water_Dispenser", "Resolved": "unresolved","Severity":5},
      {"IncidentName": "Incident1", "StudentId":"es18btech11021", "Category":"Water_Dispenser", "Resolved": "unresolved","Severity":5}]}
    >
      <GridColumn field="IncidentName" title="ID" width="40px" />
      <GridColumn field="StudentId" title="Name" width="250px" />
      <GridColumn field="Category" title="CategoryName" />
      <GridColumn field="Resolved" title="Resolved" />
      <GridColumn field="Severity" title="Severity" />
    </Grid>
  );
};
export default ViewIncidentsPage;