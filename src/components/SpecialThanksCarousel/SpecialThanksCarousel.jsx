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
    <Box sx={{ display: "flex", justifyContent: "center", paddingTop: "16px" }}>
      <Carousel
        stopAutoPlayOnHover={false}
        interval={4000}
        navButtonsAlwaysInvisible={true}
        swipe={false}
        indicators={false}
      >
        {contentCreators.map((item, i) => (
          <Card key={i} sx={{ maxWidth: 220, margin: 1 }}>
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
