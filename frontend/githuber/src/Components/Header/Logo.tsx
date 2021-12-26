import React, { useState } from "react";
import { Paper } from "@mui/material";
import { styled } from "@mui/system";
import LogoIcon from "../../assets/logo.png";

const LogoContainer = styled(Paper)(({ theme }) => ({
  width: "150px",
  height: "150px",
  borderRadius: "10px",
  zIndex: 2,
  [theme.breakpoints.down("sm")]: {
    width: "100px",
    height: "100px",
  },
  [theme.breakpoints.up("md")]: {
    width: "150px",
    height: "150px",
  },
}));

const Logo: React.FC = () => {
  const [logoTouch, setLogoTouch] = useState<boolean>(false);

  const preventSave = (e: React.MouseEvent) => {
    e.preventDefault();
    return false;
  };

  const preventDrag = (e: React.MouseEvent) => {
    e.preventDefault();
    return false;
  };

  const startTouchLogo = () => {
    setLogoTouch(true);
  };

  const moveOut = () => {
    setLogoTouch(false);
  };

  return (
    <LogoContainer
      elevation={logoTouch ? 8 : 4}
      onContextMenu={preventSave}
      onMouseMove={startTouchLogo}
      onMouseOut={moveOut}
    >
      <img
        onDragStart={preventDrag}
        alt="githuber logo"
        src={LogoIcon}
        style={{ width: "100%", height: "100%", borderRadius: "10px" }}
      />
    </LogoContainer>
  );
};

export default Logo;
