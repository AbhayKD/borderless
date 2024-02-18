import React, { ChangeEvent } from "react";
import { styled } from "styled-components";
import { Paper } from "@material-ui/core";
import ResultBox from "../ResultBox";
import ImageUploadPreview from "../ImagePreview";
import Button from "../Button";
import { useDispatch, useSelector } from "react-redux";
import { defaultImageInfo } from "../../store/constants";
import { uploadImageAndExtractDates } from "../../store/app/thunk";
import {
  selectExtractionResult,
  selectImageInfo,
} from "../../store/app/selector";
import { setImageInfo } from "../../store/app/slice";

const StyledPaperCardContiner = styled(Paper)`
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: space-between;
  padding: 20px;
  height: 500px;
  width: 500px;
`;

const PaperCardContainer: React.FC = () => {
  const { preview } = useSelector(selectImageInfo);
  const extractionResult = useSelector(selectExtractionResult);
  const dispatch = useDispatch();

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type.startsWith("image")) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const fileName = file.name;
        dispatch(
          setImageInfo({
            fileName,
            fileType: file.type,
            preview: reader.result as string,
          })
        );
        dispatch(uploadImageAndExtractDates(file));
      };
      reader.readAsDataURL(file);
    } else {
      dispatch(setImageInfo(defaultImageInfo));
    }
  };

  return (
    <StyledPaperCardContiner elevation={3}>
      <ImageUploadPreview imagePreview={preview} />
      <Button type="file" size={"medium"} onClick={handleImageChange}>
        Select Passport
      </Button>
      <ResultBox text={`${JSON.stringify(extractionResult)}`} />
    </StyledPaperCardContiner>
  );
};

export default PaperCardContainer;
