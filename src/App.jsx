import React, { useState, Suspense, lazy, useEffect } from "react";
import "./App.css";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import LandingPage from "./components/LandingPage/LandingPage";
import Temporary from "./Temporary";
import DetailedEvents from "./components/LandingPage/DetailedEvents";
import Registration from "./components/auth/Registration";
import Error from "./Error";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import UserProfile from "./components/user/UserProfile";
import ForgotPassword from "./components/auth/ForgotPassword";
import ResetPassword from "./components/auth/ResetPassword";
import EmailConfirmation from "./components/auth/EmailConfirmation";
import RegisterPrivate from "./components/auth/RegisterPrivate";
import Login from "./components/auth/Login";
import Cookies from "js-cookie";
import Sidebar from "./components/Sidebar/Sidebar";
import Topbar from "./components/user/Topbar";
import TeamInfo from "./components/user/TeamInfo";
import UpdateTeamInfo from "./components/user/UpdateTeamInfo";
import AddParticipant from "./components/user/AddParticipant";
import DisplayTeam from "./components/user/DisplayTeam";
import axios from "./features/Interceptors/apiInterceptor";
import AdminProfile from "./components/admin/AdminProfile";
import GetAllTeams from "./components/admin/GetAllTeams";
import AssignEvent from "./components/coordinator/AssignEvent";
import VolunteerProfile from "./components/volunteer/VolunteerProfile";
import VolunteerAttendance from "./components/volunteer/VolunteerAttendance";
import Payment from "./components/user/Payment";
import PaymentInfo from "./components/user/PaymentInfo";
import Schedule from "./components/LandingPage/Schedule";
import Rules from "./components/LandingPage/Rules";
import VerifyPayments from "./components/admin/VerifyPayments";
import AssignEventForm from "./components/coordinator/AssignEventForm";
import GetSpeificTeam from "./components/admin/GetSpeificTeam";
import GetEventsOfTeam from "./components/admin/GetEventsOfTeam";
import GetTeamsOfEvent from "./components/admin/GetTeamsOfEvent";
import EventwiseList from "./components/coordinator/EventwiseList";
import RemoveEventForm from "./components/coordinator/RemoveEventForm";
import AllowedEmail from "./components/admin/AllowedEmail";
import ScoreForm from "./components/admin/ScoreForm";
import ScoreBoard from "./components/admin/ScoreBoard";
import ActualParticipants from "./components/admin/AdminPaidDashBoard";

function App() {
  const user = Cookies.get("token");
  const [role, setRole] = useState("");
  const [profile, setProfile] = useState({});

  const [collapsed, setCollapsed] = useState(false);
  const [toggled, setToggled] = useState(false);

  const handleCollapsedChange = () => {
    setCollapsed(!collapsed);
  };

  const handleToggleSidebar = (value) => {
    setToggled(value);
  };

  const getRoleOrProfile = async (route) => {
    const { data } = await axios.get(route);
    if (route === "profile/me") {
      setProfile(data);
    } else if (route === "/auth/my-role") {
      setRole(data.role);
    }
  };

  // useEffect(() => {
  //   getRoleOrProfile("profile/me");
  getRoleOrProfile("/auth/my-role");
  // }, []);
  return (
    <div className="app">
      {user && (
        <Sidebar
          collapsed={collapsed}
          toggled={toggled}
          handleToggleSidebar={handleToggleSidebar}
          handleCollapsedChange={handleCollapsedChange}
        />
      )}
      <main className="content">
        {user && (
          <>
            <Topbar handleToggleSidebar={handleToggleSidebar} />
          </>
        )}
        <Routes>
          {user && role === "PARTICIPANT" && (
            <>
              <Route
                path="/"
                element={
                  <ProtectedRoute>
                    <UserProfile />
                  </ProtectedRoute>
                }
              />
              <Route
                path="team-info"
                element={
                  <ProtectedRoute>
                    <TeamInfo />
                  </ProtectedRoute>
                }
              />
              <Route
                path="update-team"
                element={
                  <ProtectedRoute>
                    <UpdateTeamInfo />
                  </ProtectedRoute>
                }
              />
              <Route
                path="add-participant"
                element={
                  <ProtectedRoute>
                    <AddParticipant />
                  </ProtectedRoute>
                }
              />
              <Route
                path="display-team"
                element={
                  <ProtectedRoute>
                    <DisplayTeam />
                  </ProtectedRoute>
                }
              />
              <Route
                path="payment"
                element={
                  <ProtectedRoute>
                    <Payment />
                  </ProtectedRoute>
                }
              />
              <Route
                path="payment-info"
                element={
                  <ProtectedRoute>
                    <PaymentInfo />
                  </ProtectedRoute>
                }
              />
            </>
          )}
          {user && role === "ADMIN" && (
            <>
              <Route
                path="/"
                element={
                  <>
                    <ProtectedRoute>
                      <AdminProfile />
                    </ProtectedRoute>
                  </>
                }
              />

              <Route
                path="/get-teams"
                element={
                  <>
                    <ProtectedRoute>
                      <GetAllTeams />
                    </ProtectedRoute>
                  </>
                }
              />

              <Route
                path="/get-teams/:id"
                element={
                  <>
                    <ProtectedRoute>
                      <GetSpeificTeam />
                    </ProtectedRoute>
                  </>
                }
              />

              <Route
                path="verifyPayments"
                element={
                  <ProtectedRoute>
                    <VerifyPayments />
                  </ProtectedRoute>
                }
              />

              <Route
                path="actual-participants"
                element={
                  <ProtectedRoute>
                    <ActualParticipants />
                  </ProtectedRoute>
                }
              />

              <Route
                path="get-team-events"
                element={
                  <ProtectedRoute>
                    <GetEventsOfTeam />
                  </ProtectedRoute>
                }
              />

              <Route
                path="get-events-teams"
                element={
                  <ProtectedRoute>
                    <GetTeamsOfEvent />
                  </ProtectedRoute>
                }
              />

              <Route
                path="add-allowed-emails"
                element={
                  <ProtectedRoute>
                    <AllowedEmail />
                  </ProtectedRoute>
                }
              />
              <Route
                path="update-score"
                element={
                  <ProtectedRoute>
                    <ScoreForm />
                  </ProtectedRoute>
                }
              />
              <Route
                path="score-board"
                element={
                  <ProtectedRoute>
                    <ScoreBoard />
                  </ProtectedRoute>
                }
              />
            </>
          )}
          {user && role === "COORDINATOR" && (
            <>
              <Route
                path="/"
                element={
                  <ProtectedRoute>
                    <AssignEvent />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/assign"
                element={
                  <ProtectedRoute>
                    <AssignEventForm />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/remove"
                element={
                  <ProtectedRoute>
                    <RemoveEventForm />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/eventwise"
                element={
                  <ProtectedRoute>
                    <EventwiseList />
                  </ProtectedRoute>
                }
              />
              <Route
                path="get-events-teams"
                element={
                  <ProtectedRoute>
                    <GetTeamsOfEvent />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/get-teams/:id"
                element={
                  <>
                    <ProtectedRoute>
                      <GetSpeificTeam />
                    </ProtectedRoute>
                  </>
                }
              />
            </>
          )}

          {user && role === "VOLUNTEER" && (
            <>
              <Route
                path="/"
                element={
                  <ProtectedRoute>
                    <VolunteerProfile />
                  </ProtectedRoute>
                }
              />
              <Route
                path="volunteer-attendance"
                element={
                  <ProtectedRoute>
                    <VolunteerAttendance />
                  </ProtectedRoute>
                }
              />

              <Route
                path="/get-teams/:id"
                element={
                  <>
                    <ProtectedRoute>
                      <GetSpeificTeam />
                    </ProtectedRoute>
                  </>
                }
              />
            </>
          )}
          {/* {user ? (
            <Route
              path="/"
              element={
                <ProtectedRoute>
                  <UserProfile />
                </ProtectedRoute>
              }
            />
          ) : (
            <Route path="/" element={<LandingPage />} />
          )} */}
          {!user && (
            <>
              <Route path="/" element={<LandingPage />} />
              {/* <Route path="/logintemp" element={<Login />} /> 
              <Route path="/schedule" element={<Schedule />} />
              <Route path="/rules" element={<Rules />} />
              <Route path="/registertemp" element={<Registration />} /> 
              <Route path="/register" element={<Registration />} />
              <Route path="/login" element={<Login />} />
              <Route exact path="/details/:id" element={<DetailedEvents />} />
              <Route
                exact
                path="/forgot-password"
                element={<ForgotPassword />}
              />
              <Route
                exact
                path="/email-confirm"
                element={<EmailConfirmation />}
              />
              <Route exact path="/reset-password" element={<ResetPassword />} />{" "}

            */}
            </>
          )}

          {/*Backend Routes*/}

          {/*
       <Route
       exact
       path="/backend-registration"
       element={<RegisterPrivate />}
     />
      */}

          {/* Error 404 handler */}

          <Route path="*" element={<Error />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
