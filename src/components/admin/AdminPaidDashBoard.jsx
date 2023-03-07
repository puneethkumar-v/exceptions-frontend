import React, { useState, useEffect } from "react";
import { Box } from "@mui/system";
import Header from "../Sidebar/Header";
import { Container } from "@mui/system";
import { Grid } from "@mui/material";
import axios from "../../features/Interceptors/apiInterceptor";
import Loading from "../../Loading";
import { DataArray, SignalCellularNoSimOutlined } from "@mui/icons-material";

const AdminProfile = () => {
  const [totalTeams, setTotalTeams] = useState("");
  const [pageLoading, setPageLoading] = useState(false);
  const [allGC, setAllGC] = useState("");
  const [totalParticipants, setTotalParticipants] = useState(0);
  const [AllOpen, setAllOpen] = useState(0);
  const [finalAmount, setFinalAmount] = useState(0);
  const getPayment = async (userId) => {
    try {
      const { data } = await axios.post("/payment/is-participant-paid", {
        participantId: userId,
      });

      if (data.isPaid && data.paymentData.isVerified) {
        return true;
      } else {
        return false;
      }
    } catch (err) {}
  };

  const getCollegeOfHeadUser = async (userId) => {
    try {
      const { data } = await axios.post("/user/get-user-by-id", {
        userId: userId,
      });

      return data.participantDetails
        ? data.participantDetails.collegeName
        : null;
    } catch (err) {
      console.log(err);
    }
  };

  const getTeamCount = async (teamId) => {
    try {
      const { data } = await axios.post("/team/get-specific-team-details", {
        teamId: teamId,
      });

      return data[0].teamMembers ? data[0].teamMembers.length : null;
    } catch (err) {
      console.log("Error occured!!");
    }
  };

  const fetchAllData = async () => {
    setPageLoading(true);
    try {
      const { data } = await axios.get("/team/get");
      //console.log(data);

      const temp1 = await Promise.all(
        data.map(async (obj) => {
          return {
            id: obj.teamId,
            label: obj.teamName.label,
            payment: await getPayment(
              obj.headUser ? obj.headUser.userId : null
            ),
            college: await getCollegeOfHeadUser(
              obj.headUser ? obj.headUser.userId : null
            ),
            total: await getTeamCount(obj.teamId ? obj.teamId : null),
            teamHead: obj.headUser ? obj.headUser.firstName : null,
            contactNumber: obj.headUser ? obj.headUser.contactNumber : null,
            isGCConsidered: obj.isGCConsidered,
          };
        })
      );

      //   console.log("LOL", temp1);

      const filteredData = temp1.filter((val) => {
        return val.payment;
      });

      const AllGC = temp1.filter((val) => {
        return val.payment && val.isGCConsidered;
      });

      const AllOpen = temp1.filter((val) => {
        return val.payment && !val.isGCConsidered;
      });

      setAllOpen(AllOpen.length);

      var sumOfTotalParticipants = 0;
      temp1.forEach((team) => {
        if (team.payment) {
          sumOfTotalParticipants += team.total;
        }
      });

      console.log(sumOfTotalParticipants);
      setTotalParticipants(sumOfTotalParticipants);
      setTotalTeams(filteredData.length);
      console.log(filteredData);

      setAllGC(AllGC.length);

      const finalAmount = await axios.get("/admin/get-total-fees");
      setFinalAmount(finalAmount.data);
    } catch (err) {}
    setPageLoading(false);
  };

  useEffect(() => {
    fetchAllData();
  }, []);

  return !pageLoading ? (
    <Box
      m="20px"
      sx={{
        height: "90vh",
      }}
      className="flex justify-center items-center flex-col"
    >
      <Header
        title="Actual Participants"
        subtitle="All teams that participated in EXCEPTIONS 2023"
      />
      <h2 className="text-2xl text-left font-bold w-full ml-8">
        General Updates
      </h2>

      <Grid container className="lg:px-20 py-8 overflow-auto mt-5" spacing={6}>
        <Grid item xs={12} sm={12} md={4} lg={4} xl={3}>
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            flexDirection="column"
          >
            <div className="card w-72 bg-primary text-primary-content">
              <div className="card-body">
                <h2 className="card-title text-center">Total teams verified</h2>

                <div className="card-actions w-full flex justify-center items-center">
                  <span className="text-5xl">{totalTeams}</span>
                </div>
              </div>
            </div>
          </Box>
        </Grid>
        <Grid item xs={12} sm={12} md={4} lg={4} xl={3}>
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            flexDirection="column"
          >
            <div className="card w-72 bg-primary text-primary-content">
              <div className="card-body">
                <h2 className="card-title">Total Participants</h2>

                <div className="card-actions w-full flex justify-center items-center">
                  <span className="text-5xl ">{totalParticipants}</span>
                </div>
              </div>
            </div>
          </Box>
        </Grid>
        <Grid item xs={12} sm={12} md={4} lg={4} xl={3}>
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            flexDirection="column"
          >
            <div className="card w-72 bg-primary text-primary-content">
              <div className="card-body">
                <h2 className="card-title">Group+open events teams</h2>
                <div className="card-actions w-full flex justify-center items-center">
                  <span className="text-5xl">{allGC}</span>
                </div>
              </div>
            </div>
          </Box>
        </Grid>
        <Grid item xs={12} sm={12} md={4} lg={4} xl={3}>
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            flexDirection="column"
          >
            <div className="card w-72 bg-primary text-primary-content">
              <div className="card-body">
                <h2 className="card-title">Total teams only in open events</h2>
                <div className="card-actions w-full flex justify-center items-center">
                  <span className="text-5xl">{AllOpen}</span>
                </div>
              </div>
            </div>
          </Box>
        </Grid>

        <Grid item xs={12} sm={12} md={4} lg={4} xl={3}>
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            flexDirection="column"
          >
            <div className="card w-72 bg-primary text-primary-content">
              <div className="card-body">
                <h2 className="card-title">Final Amount</h2>
                <div className="card-actions w-full flex justify-center items-center">
                  <span className="text-5xl">{finalAmount}</span>
                </div>
              </div>
            </div>
          </Box>
        </Grid>
      </Grid>
    </Box>
  ) : (
    <Loading />
  );
};

export default AdminProfile;
