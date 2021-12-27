import React, { useState, useEffect } from "react";
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
  alignItems: "center",
}));

const Footer: React.FC = () => {
  const [like, setLike] = useState<boolean>(false);
  const [likes, setLikes] = useState<number>(0);

  useEffect(() => {
    const isLiked = window.localStorage.getItem("like");
    if (isLiked) {
      setLike(true);
      window
        .fetch("/api/totallikes")
        .then((response) => {
          if (response.status !== 200) throw new Error();
          return response.json();
        })
        .then((data) => {
          const totalLikes = data["total"];
          setLikes(totalLikes);
        });
    }
  }, []);

  const sendLike = () => {
    const isLiked = window.localStorage.getItem("like");
    if (isLiked) {
      return false;
    }
    window
      .fetch("/api/like")
      .then((response) => {
        if (response.status === 200) {
          setLike(true);
          window.localStorage.setItem("like", "1");
          return response.json();
        }
      })
      .then((data) => {
        const total = data["total"];
        setLikes(total);
      });
  };
  return (
    <FooterContainer>
      <Typo variant="body2" children="&copy; 2022 mostafa Mohamed, Carbon" />

      <StackRight spacing={2} direction="row">
        {like && (
          <Typography
            variant="body2"
            sx={{ color: "#fff" }}
          >{`You and ${likes} love this app!`}</Typography>
        )}
        <Favorite
          sx={{ color: like ? "#a62c2b" : "#fff", cursor: "pointer" }}
          onClick={sendLike}
        />
        <Typography
          variant="body2"
          children="Contact"
          sx={{ color: "#fff", cursor: "pointer" }}
        />
      </StackRight>
    </FooterContainer>
  );
};

export default Footer;
