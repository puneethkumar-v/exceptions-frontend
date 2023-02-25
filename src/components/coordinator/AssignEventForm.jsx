import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Checkbox,
  Typography,
  FormGroup,
  useTheme,
  FormControlLabel,
} from "@mui/material";
import { Box } from "@mui/system";
import ErrorIcon from "@mui/icons-material/Error";
import { Field, Formik } from "formik";
import * as yup from "yup";
import React, { useEffect } from "react";
// import Topbar from "./Topbar";
// import { tokens } from "../theme";
import { useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
// import { adminregister, customerregister } from "../actions/auth";
// import axios, { all } from "axios";
// import Header from "./Header.js";

import axios from "../../features/Interceptors/apiInterceptor";
import Header from "../Sidebar/Header";
import { useState } from "react";
import useMediaQuery from "@mui/material/useMediaQuery";
import CircularProgress from "@material-ui/core/CircularProgress";
// import { CheckboxWithLabel } from "formik-material-ui";
import { MultiSelect } from "react-multi-select-component";

const AssignEventForm = () => {
  const theme = useTheme();
  // const isNonMobile = useMediaQuery("(min-width:650px)");
  let arr = [];
  const [loading, setLoading] = useState(false);
  const [teamMates, setTeamMates] = useState([]);
  const [error, setError] = useState("");
  const isNonMobile = useMediaQuery("(min-width:650px)");
  const [teamName, setTeamName] = useState([] || {});
  const [teamId, setTeamId] = useState("14");
  const [selected, setSelected] = useState([]);

  // console.log(teamName);
  console.log(teamMates);

  const getTeams = async () => {
    const { data } = await axios.get("/team/get");
    const temp = data.map((obj) => {
      return {
        id: obj.teamId,
        label: obj.teamName.label,
      };
    });

    // allTeams.push(temp);
    setTeamName(temp);
  };

  function handleSelectChange(e) {
    setTeamId(e.target.value);
    getTeamMembers();
  }

  const getTeamMembers = async () => {
    // setTeamId(values.team_id);
    // console.log(teamId);
    const { data } = await axios.post("/team/get-specific-team-details", {
      teamId: teamId,
    });
    // console.log(data[0].teamMembers);
    let tempArray = [];
    for (let i = 0; i < data[0].teamMembers.length; i++) {
      const getAllData = {
        label: `${data[0].teamMembers[i].firstName}`,
        value: `${data[0].teamMembers[i].memberId}`,
      };
      tempArray.push(getAllData);
    }
    console.log("tempArray", tempArray);
    setTeamMates(tempArray);
  };

  useEffect(() => {
    getTeams();
    getTeamMembers();
  }, []);
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    // try {
    //   setLoading(true);
    //   const existingSensors = [];
    //   selected.map(async (val) => {
    //     let actualValue = {
    //       device_id: values.device_id,
    //       sensor_idx: val.value.sensor_idx,
    //       sensor_name: val.value.sensor_name,
    //       sensor_uom: val.value.sensor_uom,
    //       sensor_report_group: val.value.sensor_report_group,
    //     };
    //     try {
    //       const { data } = await API.post("/sensorMaster/add", actualValue);
    //       console.log(data);
    //     } catch (err) {
    //       existingSensors.push(val.value.sensor_name);
    //       console.log("existingSensors ");
    //       console.log(existingSensors.join(", "));
    //       setError(
    //         `${existingSensors.join(", ")}: These sensors already exists`
    //       );
    //     }
    //   });

    //   resetForm({ values: initialValues });
    //   setSelected([]);
    //   setLoading(false);
    // } catch (err) {
    //   console.log(err.response.data.error);
    //   setError(err.response.data.error);
    // }

    // try {
    //   setLoading(true); //   let obj = { teamId: values.team_id };
    //   //   console.log("obj", obj);
    //   setTeamId(values.team_id);
    //   const { data } = await axios.post("/team/get-specific-team-details", {
    //     teamId: values.team_id,
    //   });
    //   // setTeamMates(data[0].teamMembers);
    //   console.log(data[0].teamMembers);
    //   resetForm({ values: initialValues });
    //   setLoading(false);
    // } catch (err) {
    //   setError(err.message);
    // }

    // console.log(teamId);
    setLoading(false);
  };

  // const options = [
  //   {
  //     label: "Uno",
  //     value: "one",
  //   },
  //   {
  //     label: "Dos",
  //     value: "two",
  //   },
  //   {
  //     label: "Tres",
  //     value: "three",
  //   },
  // ];

  return (
    <Box m="20px" sx={{ height: isNonMobile ? "90vh" : "100%" }}>
      <Header
        title="Add Sensors"
        subtitle="Fill up the form with the Sensors list"
      />
      <Box
        m="20px"
        sx={{
          height: isNonMobile ? "80vh" : "100%",
          // display: "flex",
          // justifyContent: "center",
          // alignItems: "center",
        }}
      >
        <form
          onSubmit={handleFormSubmit}
          style={{
            width: "100%",
            // boxShadow: "7px 7px 9px 0px rgba(0,0,0,0.47)",
            boxShadow: isNonMobile
              ? "0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24)"
              : null,
            maxWidth: "40rem",
            color: "#e0e0e0",
            margin: "0 auto",
            padding: isNonMobile ? "2rem" : null,
            borderRadius: "6px",
            background: isNonMobile ? "#1F2A40" : null,
            // display: "grid",
            // placeItems: "center",
            // height: "100%",
          }}
        >
          <Typography
            // variant={isNonMobile ? "h3" : "h4"}
            // color={colors.grey[100]}
            fontWeight="bold"
            mb="2rem"
          >
            SENSORS DETAILS
          </Typography>
          {error && (
            <Box
              mb="1rem"
              sx={{
                color: "#e87c03",
                display: "flex",
                // justifyContent: "center",
                gap: "0.5rem",
                alignItems: "center",
                borderRadius: "5px",
              }}
              p=".5rem"
            >
              <ErrorIcon />
              {error}
            </Box>
          )}
          <Box
            // display="grid"
            // placeItems="center"
            // color={colors.grey[100]}
            // gap="30px"
            // gridTemplateColumns="repeat(4, minmax(0, 1fr))"
            sx={{
              "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
            }}
          >
            <div
              style={{
                gridColumn: "span 4",
                width: "50%",
              }}
            >
              <InputLabel id="team_id">Team Name</InputLabel>
              <Select
                fullWidth
                variant="filled"
                // type="text"
                label="Team ID"
                // onBlur={handleBlur}
                onChange={handleSelectChange}
                value={teamId}
                name="team_id"
                labelId="team"
                id="team_id"
                // error={!!touched.team_id && !!errors.team_id}
                // helperText={touched.team_id && errors.team_id}
                sx={{ gridColumn: "span 4" }}
              >
                {teamName
                  ? teamName.map((eachTeam) => (
                      <MenuItem value={eachTeam.id} key={eachTeam.id}>
                        {eachTeam.label}
                      </MenuItem>
                    ))
                  : null}
              </Select>
            </div>

            <div style={{ background: "black", color: "white" }}>
              <InputLabel id="sensor_list" sx={{ marginTop: "1.2rem" }}>
                Sensors List
              </InputLabel>
              <MultiSelect
                options={teamMates}
                value={selected}
                onChange={setSelected}
                labelledBy="Team Members"
              />
            </div>
          </Box>
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            mt="20px"
          >
            {loading ? (
              <CircularProgress />
            ) : (
              <Button
                type="submit"
                color="secondary"
                variant="contained"
                sx={{
                  padding: isNonMobile ? "10px 20px" : null,
                  width: "100%",
                  fontSize: isNonMobile ? "16px" : null,
                  letterSpacing: "0.15rem",
                  fontWeight: "bold",
                }}
              >
                ASSIGN
              </Button>
            )}
          </Box>
        </form>
      </Box>
    </Box>
  );
};

export default AssignEventForm;
