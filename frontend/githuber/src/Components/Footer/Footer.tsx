import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store/store";
import { contactAction } from "../../store/contactState";
import { Box, Typography, Stack } from "@mui/material";
import { styled } from "@mui/system";
import { Favorite } from "@mui/icons-material";

const FooterContainer = styled(Box)(({ theme }) => ({
  width: "100vw",
  height: "50px",
  marginTop: "50px",
  boxSizing: "border-box",
  padding: "10px",
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  backgroundColor: "#1976d2",
  [theme.breakpoints.down("md")]: {
    height: "fit-content",
  },
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

  const contactState = useSelector<RootState, boolean>(
    (state) => state.contactState.toggle
  );

  const dispatch = useDispatch<AppDispatch>();

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

  const handleContact = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    return contactState
      ? dispatch(contactAction.toggleState("0"))
      : dispatch(contactAction.toggleState("1"));
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
          onClick={handleContact}
          variant="body2"
          children="Contact"
          sx={{ color: "#fff", cursor: "pointer", userSelect: "none" }}
        />
      </StackRight>
    </FooterContainer>
  );
};

export default Footer;
