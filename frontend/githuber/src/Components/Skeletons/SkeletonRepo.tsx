import React from "react";
import { Skeleton, Stack, Paper } from "@mui/material";
import { styled } from "@mui/system";

const SketContainer = styled(Paper)(({ theme }) => ({
  width: "100%",
  boxSizing: "border-box",
  padding: "10px",
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  marginBottom: "5px",
  marginTop: "5px",
}));

const SkeletonRepo: React.FC = () => {
  return (
    <SketContainer>
      <Stack
        direction="row"
        spacing={2}
        sx={{ justifyContent: "space-between" }}
      >
        <Skeleton variant="text" width={100} height={25} />
        <Skeleton variant="text" width={50} height={20} />
      </Stack>
      <Skeleton variant="text" width={250} height={25} />
    </SketContainer>
  );
};

export default SkeletonRepo;
