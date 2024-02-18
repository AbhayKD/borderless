import React from "react";
import { styled } from "styled-components";
import { Card, CardMedia } from "@material-ui/core";

const StyledCard = styled(Card)`
  width: 300px;
  height: 200px;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  margin-bottom: 20px;
`;

export type ImagePreviewProps = {
  imagePreview: string;
};

const ImageUploadPreview: React.FC<ImagePreviewProps> = ({ imagePreview }) => {
  return (
    <>
      {imagePreview && (
        <StyledCard>
          <CardMedia
            component="img"
            style={{
              maxHeight: "100%",
              maxWidth: "100%",
              objectFit: "contain",
            }}
            alt="Image preview"
            image={imagePreview}
            title="Image preview"
          />
        </StyledCard>
      )}
    </>
  );
};

export default ImageUploadPreview;
