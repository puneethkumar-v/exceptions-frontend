import React from "react";
import { Link } from "react-router-dom";
import EventsList from "../../data/EventsList";
import Solvathon from "./Solvathon";

function Events() {
  return (
    <div className="event my-8  " id="events">
      <h1 className="sub-heading text-secondary text-bold text-3xl ">EVENTS</h1>

      {/* Open Events */}

      <h1 className="text-center event-header text-3xl text-success my-5 lg:my-8">
        Open Events (For all branches of UG & PG)
      </h1>

      <div className="w-full flex items-center justify-center">
        <Solvathon />
      </div>

      {EventsList.map((data) => {
        return data.eventType == "open" ? (
          <div
            key={data.id}
            className={`event-box p-5`}
            style={{
              justifyContent: "space-around",
              alignItems: "center",
              margin: "2rem auto",
              textAlign: "center",
            }}
          >
            <div className="lg:w-1/2 sm:w-3/4 ">
              <h1
                className={`text-3xl my-5 ${data.text} text-center lg:text-left `}
              >
                {data.name.toUpperCase()}
              </h1>
              <p
                className="text-xl text-neutral-content text-justify lg:text-justify"
                style={{ lineHeight: "1.5" }}
              >
                {data.description}
              </p>
              <Link to={data.to} className={`btn ${data.color} btn-wide mt-8 `}>
                Details
              </Link>
            </div>
            <img src={data.img} alt={data.name} style={{ width: "20rem" }} />
          </div>
        ) : null;
      })}

      {/*  General Events */}

      <h1 className="text-center text-3xl text-success my-16 event-header">
        Group Events (Only for BCA , MCA , BSc and MSc)
      </h1>

      {EventsList.map((data) => {
        return data.eventType == "general" ? (
          <div
            key={data.id}
            className={`event-box p-5`}
            style={{
              justifyContent: "space-around",
              alignItems: "center",
              margin: "2rem auto",
              textAlign: "center",
            }}
          >
            <div className="lg:w-1/2 sm:w-3/4 ">
              <h1
                className={`text-3xl my-5 ${data.text} text-center lg:text-left `}
              >
                {data.name.toUpperCase()}
              </h1>
              <p
                className="text-xl text-neutral-content text-justify lg:text-justify"
                style={{ lineHeight: "1.5" }}
              >
                {data.description}
              </p>
              <Link to={data.to} className={`btn ${data.color} btn-wide mt-8 `}>
                Details
              </Link>
            </div>
            <img src={data.img} alt={data.name} style={{ width: "20rem" }} />
          </div>
        ) : null;
      })}

      {/*
     {EventsList.map((data) => (
        <div
          id={data.id}
          className={`event-box p-5`}
          style={{
            justifyContent: "space-around",
            alignItems: "center",
            margin: "2rem auto",
            textAlign: "center",
          }}
        >
          <div className="lg:w-1/2 sm:w-3/4 ">
            <h1
              className={`text-3xl my-5 ${data.text} text-center lg:text-left `}
            >
              {data.name.toUpperCase()}
            </h1>
            <p
              className="text-xl text-neutral-content text-justify lg:text-justify"
              style={{ lineHeight: "1.5" }}
            >
              {data.description}
            </p>
            <Link to={data.to} className={`btn ${data.color} btn-wide mt-8 `}>
              Details
            </Link>
          </div>
          <img src={data.img} alt={data.name} style={{ width: "20rem" }} />
        </div>
      ))}
    */}
    </div>
  );
}

export default Events;
