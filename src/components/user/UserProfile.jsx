import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import axios from "../../features/Interceptors/apiInterceptor";
import Header from "../Sidebar/Header";
import { Box } from "@mui/system";
import useMediaQuery from "@mui/material/useMediaQuery";
import Table from "@mui/material/Table";
import AstronautImage from "../../assets/images/astronaut.png";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import Loading from "../../Loading";
import Swal from "sweetalert2/dist/sweetalert2.js";
import "sweetalert2/src/sweetalert2.scss";
import { useNavigate } from "react-router-dom";

function UserProfile() {
  const dispatch = useDispatch();
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const [teamDetails, setTeamDetails] = useState([]);
  const [teamCount, setTeamCount] = useState(0);
  const [isRegistered, setIsRegistered] = useState(true);
  const [pageLoading, setPageLoading] = useState(true);
  const [isVerified, setIsVerified] = useState(false);
  const [isPaid, setIsPaid] = useState(false);
  const navigate = useNavigate();

  const getTeam = async () => {
    try {
      const { data } = await axios.get("/team/get-team-of-current-user");
      if (data.message == "This user has not registered any teams") {
        setIsRegistered(false);
      } else {
        setIsRegistered(true);
        const { data } = await axios.get("/team/get-team-of-current-user");
        setTeamDetails(data);
        const teamSize = await axios.get("/teamMember/get");
        setTeamCount(teamSize.data.length);

        const payment = await axios.get("/payment/is-paid");
        setIsVerified(
          payment.data.paymentData && payment.data.paymentData.isVerified
            ? true
            : false
        );
        setIsPaid(payment.data.isPaid);
      }
    } catch (err) {
      Swal.fire({
        title: "Error!",
        text: "Something went wrong!! check your internet connectivity",
        icon: "error",
        confirmButtonText: "Okay",
      });
    }

    setPageLoading(false);
  };

  useEffect(() => {
    getTeam();
  }, []);

  return !pageLoading ? (
    isRegistered ? (
      <Box
        sx={{ height: "100vh" }}
        className="p-8 flex justify-center items-center"
      >
        <Box>
          <Header
            title={`Welcome , ${
              teamDetails && teamDetails.headUser
                ? teamDetails.headUser.firstName
                : null
            } `}
            subtitle={`Cant wait to see you soon at RVCE`}
          />

          <Box
            sx={{
              color: "#fff",
              fontWeight: "bold",
            }}
            className="w-full flex justify-center items-center"
          >
            <div className="card w-72 lg:w-96 bg-neutral text-neutral-content">
              <div className="card-body">
                <h2 className=" text-center text-xl">
                  {teamDetails && teamDetails.teamName
                    ? teamDetails.teamName.label
                    : null}
                </h2>
                <h6>Team ID : {teamDetails ? teamDetails.teamId : null}</h6>
                <h6>
                  General Championship :{" "}
                  {teamDetails && teamDetails.isGCConsidered ? "Yes" : "No"}
                </h6>
                <h6>Total Participants : {teamCount ? teamCount : null}</h6>
                <h6>
                  Contact Number :{" "}
                  {teamDetails && teamDetails.headUser
                    ? teamDetails.headUser.contactNumber
                    : null}
                </h6>
                <h6>
                  Payment status:{" "}
                  {isPaid && isVerified
                    ? "Paid"
                    : isPaid && !isVerified
                    ? "Pending verification"
                    : "Not paid"}
                </h6>
                <div className="card-actions justify-center">
                  {!isVerified ? (
                    <button
                      className="btn text-neutral-content"
                      onClick={() => navigate("/payment")}
                    >
                      Proceed to payment
                    </button>
                  ) : null}
                </div>
              </div>
            </div>
          </Box>
        </Box>
      </Box>
    ) : (
      <Box
        m="20px"
        sx={{ height: "100vh" }}
        className="flex justify-center items-center"
      >
        <Header
          title="Pending registration!!!"
          subtitle="Please register your team name and event type in the Add team section"
        />
      </Box>
    )
  ) : (
    <Loading />
  );
}

export default UserProfile;
