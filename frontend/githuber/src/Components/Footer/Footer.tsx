import React from "react";
import { Box, Typography } from "@mui/material";
import { styled } from "@mui/system";

const FooterContainer = styled(Box)(({ theme }) => ({
  width: "100vw",
  marginTop: "50px",
  height: "fit-content",
  boxSizing: "border-box",
  padding: "10px",
  display: "flex",
  backgroundColor: "#1976d2",
}));
const Typo = styled(Typography)(({ theme }) => ({
  color: "#fff",
}));

const Footer: React.FC = () => {
  return (
    <FooterContainer>
      <Typo
        variant="body2"
        children="mit license. Authorized by mostafa mohamed"
      />
    </FooterContainer>
  );
};

export default Footer;
