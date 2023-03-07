import { useState, useEffect } from "react";
import {
  ProSidebar,
  Menu,
  MenuItem,
  SidebarHeader,
  SidebarContent,
} from "react-pro-sidebar";
import { Box, IconButton, Typography, useTheme } from "@mui/material";
import { Link } from "react-router-dom";
import "react-pro-sidebar/dist/css/styles.css";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
// import PeopleOutlinedIcon from "@mui/icons-material/PeopleOutlined";
import PersonAddAltIcon from "@mui/icons-material/PersonAddAlt";
import WorkspacesIcon from "@mui/icons-material/Workspaces";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import PeopleIcon from "@mui/icons-material/People";
import Logo from "../../assets/exceptions/png/E1.png";
import axios from "../../features/Interceptors/apiInterceptor";
import GroupsIcon from "@mui/icons-material/Groups";
import useMediaQuery from "@mui/material/useMediaQuery";
import FilterListIcon from "@mui/icons-material/FilterList";
import Payment from "@mui/icons-material/Payment";
import { Info, PaymentOutlined } from "@mui/icons-material";
import { FaAngleDoubleLeft, FaAngleDoubleRight } from "react-icons/fa";
import { Money, Paid, GroupOutlined } from "@mui/icons-material";
import AddTaskIcon from "@mui/icons-material/AddTask";

const Item = ({ title, to, icon, selected, setSelected }) => {
  return (
    <MenuItem
      active={selected === title}
      //   style={{
      //     color: colors.grey[100],
      //   }}
      className="text-neutral-content"
      onClick={() => setSelected(title)}
      icon={icon}
    >
      <Typography>{title}</Typography>
      <Link to={to} />
    </MenuItem>
  );
};

const Sidebar = ({
  collapsed,
  toggled,
  handleToggleSidebar,
  handleCollapsedChange,
}) => {
  //   const theme = useTheme();
  //   const colors = tokens(theme.palette.mode);

  const isNonMobile = useMediaQuery("(max-width:700px)");
  const [isAdmin, setIsAdmin] = useState(false);
  const [role, setRole] = useState("");
  // const [isCollapsed, setIsCollapsed] = useState(true);
  const [selected, setSelected] = useState("User Profile");
  const [profile, setProfile] = useState({});

  const getRoleOrProfile = async (route) => {
    const { data } = await axios.get(route);
    if (route === "profile/me") {
      setProfile(data);
    } else if (route === "/auth/my-role") {
      setRole(data.role);
      if (data.role == "PARTICIPANT") {
        setSelected("Set Team Name");
      }
    }
  };

  useEffect(() => {
    getRoleOrProfile("profile/me");
    getRoleOrProfile("/auth/my-role");
  }, []);

  //   const user = JSON.parse(localStorage.getItem("profile"));

  //   const API = axios.create({ baseURL: process.env.REACT_APP_API });
  //   API.interceptors.request.use((req) => {
  //     if (localStorage.getItem("profile")) {
  //       req.headers.authorization = `Bearer ${
  //         JSON.parse(localStorage.getItem("profile")).accessToken
  //       }`;
  //     }

  //     return req;
  //   });

  //   API.get("auth/my-role", {
  //     headers: {},
  //   })
  //     .then(({ data }) => setRole(data.role))
  //     .catch((err) => console.log(err));
  //   API.get("/auth/is-admin", {
  //     headers: {},
  //   })
  //     .then(({ data }) => setIsAdmin(data.isAdmin))
  //     .catch((err) => console.log(err));
  return (
    <Box
      sx={{
        // "& .pro-sidebar-inner": {
        //   background: `${colors.primary[400]} !important`,
        // },
        // "& .pro-menu": {
        //   minHeight: "100vh",
        // },
        // "& .pro-icon-wrapper": {
        //   backgroundColor: "transparent !important",
        // },
        "& .pro-item-content": {
          display: "flex",
          justifyContent: "left",
          alignItems: "center",
        },

        "& .pro-inner-item:hover": {
          color: "#38BDF8 !important",
        },
        "& .MuiBox-root": {
          padding: "0px !important",
        },
        "& .pro-menu-item": {
          padding: "0px !important",
          borderBottom: "0px !important",
        },
        "& .pro-menu-item.active": {
          // color: "#6870fa !important",
          color: "#38BDF8 !important",
          // background: "#38BDF8",
        },
      }}
    >
      <ProSidebar
        sx={{ minHeight: "100vh" }}
        collapsed={collapsed}
        toggled={toggled}
        onToggle={handleToggleSidebar}
        breakPoint="md"
      >
        <SidebarHeader>
          <Menu iconShape="circle">
            {collapsed ? (
              <MenuItem
                icon={<FaAngleDoubleRight />}
                onClick={handleCollapsedChange}
              ></MenuItem>
            ) : (
              <>
                <div
                  style={{
                    padding: "1rem 0",
                  }}
                >
                  <MenuItem
                    suffix={<FaAngleDoubleLeft />}
                    onClick={handleCollapsedChange}
                  >
                    <img
                      src={Logo}
                      className="logo"
                      style={{
                        width: "50px",
                        maxWidth: "50px",
                        margin: "0px",
                        position: "absolute",
                        right: "200px",
                        // marginRight: "2rem",
                      }}
                    />
                  </MenuItem>
                </div>
                <Box mb="25px">
                  <Box
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                  ></Box>
                  <Box textAlign="center">
                    <Typography
                      className="text-neutral-content "
                      variant="h5"
                      sx={{ m: "10px 0 0 0" }}
                    >
                      {profile.firstName
                        ? profile.firstName.toString().toUpperCase()
                        : null}
                    </Typography>
                    <Typography variant="h6" className="text-primary">
                      {role}
                    </Typography>
                  </Box>
                </Box>
              </>
            )}
          </Menu>
        </SidebarHeader>

        <SidebarContent
          sx={{
            "& .pro-sidebar-inner": {
              // width: "20px",
            },
          }}
        >
          <Menu iconShape="circle">
            <Box paddingLeft={collapsed ? undefined : "10%"}>
              {role === "PARTICIPANT" && (
                <>
                  <Item
                    title="Set Team Name"
                    to="/team-info"
                    icon={<GroupsIcon />}
                    selected={selected}
                    setSelected={setSelected}
                  />
                  <Item
                    title="Add Participants"
                    to="/add-participant"
                    icon={<PersonAddAltIcon />}
                    selected={selected}
                    setSelected={setSelected}
                  />{" "}
                  <Item
                    title="Show Team Members"
                    to="/display-team"
                    icon={<FilterListIcon />}
                    selected={selected}
                    setSelected={setSelected}
                  />{" "}
                  <Item
                    title="Payment"
                    to="/payment"
                    icon={<Payment />}
                    selected={selected}
                    setSelected={setSelected}
                  />{" "}
                  <Item
                    title="Payment Info"
                    to="/payment-info"
                    icon={<Info />}
                    selected={selected}
                    setSelected={setSelected}
                  />{" "}
                  <Item
                    title="User Profile"
                    to="/"
                    icon={<WorkspacesIcon />}
                    selected={selected}
                    setSelected={setSelected}
                  />
                </>
              )}
              {role === "VOLUNTEER" && (
                <>
                  <Item
                    title="Volunteer Profile"
                    to="/"
                    icon={<WorkspacesIcon />}
                    selected={selected}
                    setSelected={setSelected}
                  />
                  <Item
                    title="Attendance status"
                    to="/volunteer-attendance"
                    icon={<GroupsIcon />}
                    selected={selected}
                    setSelected={setSelected}
                  />
                </>
              )}
              {role === "ADMIN" && (
                <>
                  <Item
                    title="Dashboard"
                    to="/"
                    icon={<PersonAddAltIcon />}
                    selected={selected}
                    setSelected={setSelected}
                  />
                  <Item
                    title="Actual Participants"
                    to="actual-participants"
                    icon={<AddTaskIcon />}
                    selected={selected}
                    setSelected={setSelected}
                  />
                  <Item
                    title="Get All Teams"
                    to="get-teams"
                    icon={<PeopleIcon />}
                    selected={selected}
                    setSelected={setSelected}
                  />
                  <Item
                    title="Verify Payments"
                    to="verifyPayments"
                    icon={<Paid />}
                    selected={selected}
                    setSelected={setSelected}
                  />
                  <Item
                    title="Get Events of team"
                    to="get-team-events"
                    icon={<GroupOutlined />}
                    selected={selected}
                    setSelected={setSelected}
                  />

                  <Item
                    title="Get Teams of Events"
                    to="get-events-teams"
                    icon={<GroupOutlined />}
                    selected={selected}
                    setSelected={setSelected}
                  />

                  <Item
                    title="Allowed emails"
                    to="add-allowed-emails"
                    icon={<AddTaskIcon />}
                    selected={selected}
                    setSelected={setSelected}
                  />
                  <Item
                    title="UPDATE SCORE"
                    to="update-score"
                    icon={<AddTaskIcon />}
                    selected={selected}
                    setSelected={setSelected}
                  />
                  <Item
                    title="SCORE BOARD"
                    to="score-board"
                    icon={<AddTaskIcon />}
                    selected={selected}
                    setSelected={setSelected}
                  />
                </>
              )}
              {role === "COORDINATOR" && (
                <>
                  <Item
                    title="Team Details"
                    to="/"
                    icon={<PersonAddAltIcon />}
                    selected={selected}
                    setSelected={setSelected}
                  />
                  <Item
                    title="Assign"
                    to="assign"
                    icon={<PeopleIcon />}
                    selected={selected}
                    setSelected={setSelected}
                  />
                  <Item
                    title="Remove"
                    to="remove"
                    icon={<PeopleIcon />}
                    selected={selected}
                    setSelected={setSelected}
                  />
                  <Item
                    title="Eventwise List"
                    to="eventwise"
                    icon={<PeopleIcon />}
                    selected={selected}
                    setSelected={setSelected}
                  />
                  <Item
                    title="Get Teams of Event"
                    to="get-events-teams"
                    icon={<PeopleIcon />}
                    selected={selected}
                    setSelected={setSelected}
                  />
                </>
              )}
            </Box>
          </Menu>
        </SidebarContent>

        {/* <Menu iconShape="square">
          <MenuItem
            onClick={() => {
              setIsCollapsed(!isCollapsed);
            }}
            icon={isCollapsed ? <MenuOutlinedIcon /> : null}
            style={{
              margin: "10px 0 20px 0",
              color: "#fff",
            }}
          >
            {!isCollapsed && (
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                ml="15px"
              >
                <img
                  src={Logo}
                  className="logo"
                  style={{ width: "50px", maxWidth: "50px" }}
                />

                <IconButton
                  onClick={() => {
                    setIsCollapsed(!isCollapsed);
                  }}
                >
                  <MenuOutlinedIcon
                    style={{
                      margin: "10px 0 20px 0",
                      color: "#fff",
                    }}
                  />
                </IconButton>
              </Box>
            )}
          </MenuItem>

          {!isCollapsed && (
            <Box mb="25px">
              <Box display="flex" justifyContent="center" alignItems="center">
              </Box>
              <Box textAlign="center">
                <Typography
                  className="text-neutral-content "
                  variant="h5"

                  sx={{ m: "10px 0 0 0" }}
                >
                  {profile.firstName
                    ? profile.firstName.toString().toUpperCase()
                    : null}
                </Typography>
                <Typography variant="h6" className="text-primary">
                  {role}
                </Typography>
              </Box>
            </Box>
          )}

          <Box paddingLeft={isCollapsed ? undefined : "10%"}>
            {role === "PARTICIPANT" && (
              <>
                <Item
                  title="Set Team Name"
                  to="/team-info"
                  icon={<GroupsIcon />}
                  selected={selected}
                  setSelected={setSelected}
                />
                <Item
                  title="Add Participants"
                  to="/add-participant"
                  icon={<PersonAddAltIcon />}
                  selected={selected}
                  setSelected={setSelected}
                />{" "}
                <Item
                  title="Show Team Members"
                  to="/display-team"
                  icon={<FilterListIcon />}
                  selected={selected}
                  setSelected={setSelected}
                />{" "}
                <Item
                  title="Payment"
                  to="/payment"
                  icon={<Payment />}
                  selected={selected}
                  setSelected={setSelected}
                />{" "}
                <Item
                  title="Payment Info"
                  to="/payment-info"
                  icon={<Info />}
                  selected={selected}
                  setSelected={setSelected}
                />{" "}
                <Item
                  title="User Profile"
                  to="/"
                  icon={<WorkspacesIcon />}
                  selected={selected}
                  setSelected={setSelected}
                />
              </>
            )}

            

       
          </Box>
        </Menu> */}
      </ProSidebar>
    </Box>
  );
};

export default Sidebar;
