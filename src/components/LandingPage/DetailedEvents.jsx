import React from "react";
import { useParams } from "react-router-dom";
import EventDetailList from "../../data/EventDetailList";

const DetailedEvents = () => {
  const { id } = useParams();
  console.log(id);
  return (
    <div>
      {EventDetailList.map((event) => {
        if (event.name === id)
          return (
            <>
              <h1>Event: {event.name.toUpperCase()}</h1>
              <img src={event.img} alt={event.name} />
              <h4>Description</h4>
              {<p>{event.description}</p>}
              <h4>RULES</h4>
              <ul>
                {event.rules.map((rule) => (
                  <li>{rule}</li>
                ))}
              </ul>
              <h4>REQUIREMENTS</h4>
              <ul>
                {event.requirements.map((requirement) => (
                  <li>{requirement}</li>
                ))}
              </ul>
              <h4>Contact:</h4>
              {
                <>
                  <p>{event.contact.name}</p>
                  <p>{event.contact.email}</p>
                  <p>{event.contact.phone}</p>
                </>
              }
            </>
          );
      })}
    </div>
  );
};

export default DetailedEvents;