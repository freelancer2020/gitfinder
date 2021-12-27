import React from "react";
import { Box, Typography, Stack } from "@mui/material";
import { styled } from "@mui/system";
import { Favorite } from "@mui/icons-material";

const FooterContainer = styled(Box)(({ theme }) => ({
  width: "100vw",
  marginTop: "50px",
  height: "fit-content",
  boxSizing: "border-box",
  padding: "10px",
  display: "flex",
  justifyContent: "space-between",
  backgroundColor: "#1976d2",
}));
const Typo = styled(Typography)(({ theme }) => ({
  color: "#fff",
}));

const StackRight = styled(Stack)(({ theme }) => ({
  boxSizing: "border-box",
  paddingRight: "10px",
}));

const Footer: React.FC = () => {
  return (
    <FooterContainer>
      <Typo variant="body2" children="&copy; 2022 mostafa Mohamed, Carbon" />

      <StackRight spacing={2} direction="row">
        <Favorite sx={{ color: "#fff", cursor: "pointer" }} />
        <Typography variant="body2" children="Contact" sx={{ color: "#fff" }} />
      </StackRight>
    </FooterContainer>
  );
};

export default Footer;
