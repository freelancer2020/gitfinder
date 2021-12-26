import React from "react";
import ReactDOM from "react-dom";
import { Box } from "@mui/material";
import { styled } from "@mui/system";

import LeavesImage from "../../assets/bg-leaves-sm.png";

const LeaveContainer = styled(Box)(({ theme }) => ({
  position: "absolute",
  margin: "auto",
  right: "0",
  top: "0",
  width: "700px",
  height: "600px",
  zIndex: 1,
  [theme.breakpoints.down("md")]: {
    width: "250px",
    height: "300px",
  },
  [theme.breakpoints.up("xl")]: {
    width: "900px",
    height: "800px",
  },
  overflow: "hidden",
}));

const Leaves: React.FC = () => {
  const preventSave = (e: React.MouseEvent) => {
    e.preventDefault();
    return false;
  };
  return (
    <LeaveContainer>
      <img
        onContextMenu={preventSave}
        alt="leaves ground"
        src={LeavesImage}
        style={{ width: "inherit", height: "inherit", zIndex: 1 }}
      />
    </LeaveContainer>
  );
};

const RootLeaves: React.FC = () => {
  const rootLeaves = document.getElementById("leaves") as HTMLDivElement;
  return ReactDOM.createPortal(<Leaves />, rootLeaves);
};

export default RootLeaves;
