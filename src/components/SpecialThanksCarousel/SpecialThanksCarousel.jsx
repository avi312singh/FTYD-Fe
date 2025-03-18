import React from "react";
import { Typography, Box, Card, CardContent } from "@mui/material";
import Carousel from "react-material-ui-carousel";

// Placeholder content creators
const contentCreators = [
  { name: "Lord Wisel" },
  { name: "Llyweln Ap-Pudding" },
  { name: "| avi312singh" },
  { name: "OberTechno" },
];

const SpecialThanksCarousel = ({ notMobile }) => {
  return (
    <Box sx={{ display: "contents", justifyContent: "center", paddingTop: "16px", width: "100%" }}>
      <Carousel
        stopAutoPlayOnHover={false}
        interval={4000}
        navButtonsAlwaysInvisible={false}  
        swipe={false}  
        indicators={false}  
        sx={{marginTop: "16px"}}
      >
        {contentCreators.map((item, i) => (
          <Card
            key={i}
            sx={{
              maxWidth: "280px",  
              minWidth: "250px",
              minHeight: "120px",
              margin: "auto",
              textAlign: "center",
            }}
          >
            <CardContent>
              <Typography variant="subtitle1" gutterBottom>
                Content Creator
              </Typography>
              <Typography variant={notMobile ? "h4" : "h6"}>{item.name}</Typography>
            </CardContent>
          </Card>
        ))}
      </Carousel>
    </Box>
  );
};

export default SpecialThanksCarousel;
