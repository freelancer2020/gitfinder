import React from "react";
import ReactDOM from "react-dom";
import { Paper } from "@mui/material";
import { LinkedIn, GitHub } from "@mui/icons-material";
import { styled } from "@mui/system";

const ContactContainer = styled(Paper)(({ theme }) => ({
  width: "fit-content",
  height: "fit-content",
  padding: "10px",
  boxSizing: "border-box",
  display: "flex",
  position: "fixed",
  right: "0",
  marginRight: "10px",
  bottom: "0",
  marginBottom: "52px",
}));

const Contact: React.FC = () => {
  const openLinkedin = () => {
    window.open("https://www.linkedin.com/in/mostafa-m-33189270/", "_blank");
  };

  const openGitHub = () => {
    window.open("https://github.com/freelancer2020", "_blank");
  };

  return (
    <ContactContainer elevation={8}>
      <LinkedIn
        sx={{ color: "#2867B2", cursor: "pointer" }}
        onClick={openLinkedin}
      />
      <GitHub sx={{ color: "#333", cursor: "pointer" }} onClick={openGitHub} />
    </ContactContainer>
  );
};

const ContactRoot: React.FC = () => {
  const root = document.getElementById("contact") as HTMLDivElement;
  return ReactDOM.createPortal(<Contact />, root);
};

export default ContactRoot;
