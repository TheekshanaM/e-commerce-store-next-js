"use client";

import { Box, Card, CardMedia, IconButton } from "@mui/material";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { useRef, useState } from "react";

export default function ImagePreview({
  images,
  productName,
}: {
  images: Array<string>;
  productName: string;
}) {
  const [mainImage, setMainImage] = useState<string>(images[0]);
  const [sliderTransform, setSliderTransform] = useState<number>(0);
  const boxRef = useRef<HTMLDivElement>(null);

  const sliderImageSize = 70;
  const maxLengthOfSlider = (sliderImageSize + 16) * images.length;
  const sliderMovement = (sliderImageSize + 16) * 2;
  const sliderVisibleLength = Number(boxRef.current?.offsetWidth);

  const handlePrevClick = () => {
    // Transform slider, If available image in left side
    if (sliderTransform > 0) {
      if (sliderTransform > sliderMovement) {
        setSliderTransform((preValue) => preValue - sliderMovement);
      } else {
        setSliderTransform(0);
      }
    }
  };

  const handleNextClick = () => {
    const sliderVisibleLength = Number(boxRef.current?.offsetWidth);

    const pendingSliderLength =
      maxLengthOfSlider - (sliderVisibleLength + sliderTransform);

    // Transform slider, If available image in right side
    if (pendingSliderLength > 0) {
      if (pendingSliderLength > sliderMovement) {
        setSliderTransform((preValue) => preValue + sliderMovement);
      } else {
        setSliderTransform((preValue) => preValue + pendingSliderLength);
      }
    }
  };

  return (
    <>
      <Box display="flex" justifyContent={"center"}>
        <Card sx={{ maxWidth: 400 }}>
          <CardMedia
            component="img"
            alt={productName}
            image={mainImage}
            sx={{ height: { xs: 200, sm: 300, lg: 400 } }}
          />
        </Card>
      </Box>
      <Box display="flex" justifyContent="center" mt={2}>
        <>
          {/* Previous Button */}
          <IconButton onClick={handlePrevClick} disabled={sliderTransform <= 0}>
            <ArrowBackIosNewIcon />
          </IconButton>

          <Box
            display="flex"
            overflow="hidden"
            justifyContent="start"
            ref={boxRef}
          >
            <Box
              sx={{
                display: "flex",
                transition: "transform 0.5s ease-in-out",
                transform: `translateX(-${sliderTransform}px)`,
              }}
            >
              {images.map((image) => (
                <Box
                  key={image}
                  onClick={() => setMainImage(image)}
                  sx={{
                    cursor: "pointer",
                    border: mainImage === image ? "2px solid #1976d2" : "none",
                    marginX: 1,
                  }}
                >
                  <CardMedia
                    component="img"
                    alt={`thumbnail-${image}`}
                    image={image}
                    sx={{ width: sliderImageSize, height: sliderImageSize }}
                  />
                </Box>
              ))}
            </Box>
          </Box>
          {/* Next Button */}
          <IconButton
            onClick={handleNextClick}
            disabled={
              maxLengthOfSlider <= sliderTransform + sliderVisibleLength
            }
          >
            <ArrowForwardIosIcon />
          </IconButton>
        </>
      </Box>
    </>
  );
}
