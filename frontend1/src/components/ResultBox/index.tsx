import React, { ReactNode } from "react";
import { styled } from "styled-components";
import { Box, Paper, Typography } from "@material-ui/core";

const StyledPaper = styled(Paper)`
  height: 90%;
  width: 90%;
  margin: 20px;
  padding: 20px;
  background-color: #f5f5f5;
`;

const StyledTypography = styled(Typography)`
  white-space: pre-wrap;
`;

const ResultBox: React.FC<{ text: string }> = ({ text }) => {
  return (
    <StyledPaper elevation={3}>
      <StyledTypography variant="body1">{text}</StyledTypography>
    </StyledPaper>
  );
};

export default ResultBox;
