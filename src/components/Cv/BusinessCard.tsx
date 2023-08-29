import React, { useState } from "react";
//const html2pdf = require("html2pdf");

interface BusinessCardProps {
  name: string;
  phone: string;
  linkedin: string;
}

const BusinessCard: React.FC<BusinessCardProps> = ({
  name,
  phone,
  linkedin,
}) => {
  const [expanded, setExpanded] = useState(false);

  const handleExpandToggle = () => {
    setExpanded(!expanded);
  };

  const handleWhatsAppClick = () => {
    window.open(`https://wa.me/${phone}`, "_blank");
  };

  return (
    <div className="row-container" id="business-card">
      {/* <div className="column-container">
        <img src="src/images/profile.jpg" alt="Profile" />
      </div> */}
      <div className="column-container">
        <h3>My details:</h3>
        <p>
          <b>Name:</b> {name}
        </p>
        <p>
          <b>Phone Number:</b> {phone} <br />
          <button onClick={handleWhatsAppClick}>Whatsapp Me!</button>{" "}
        </p>
        <div>
          <b>LinkedIn: </b>
          <a href={linkedin} target="_blank" rel="noopener noreferrer">
            {linkedin}
          </a>
        </div>
      </div>
      <div className="column-container">
        <p>
          {" "}
          <h4>quick intro about me</h4>
          {expanded && (
            <>
              Software developer with a strong background in Product Management
              and Data Analysis, holding a Computer Science degree with a GPA of
              90/100. An alumni of 8200, with a passion for Data Science. A
              highly motivated analytical thinker, quick learner, and possess
              excellent interpersonal skills. Fluent in English, Italian, and
              Hebrew. Moving to Amsterdam in September and holds European
              citizenship. Looking for: Software developer (Junior-Mid), Data
              scientist, highly technical product manager.
            </>
          )}
        </p>
        <button onClick={handleExpandToggle}>
          {expanded ? "Show Less" : "Show More"}
        </button>
        <p>
          <a href="/CV_Iris_Kella.pdf" download>
            Download Full CV
          </a>
        </p>
      </div>
    </div>
  );
};

export default BusinessCard;
