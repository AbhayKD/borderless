import React, { ReactNode } from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import Container from "@material-ui/core/Container";
import { styled } from "styled-components";
import PaperCardContainer from "../PaperCard";

type RootContainerProps = {
  children?: ReactNode; // This allows any valid React child (elements, strings, numbers, fragments, etc.)
  className?: string; // Optional className prop for additional styling
};

const StyledContainer = styled(Container)`
  padding: 100px;
  background-color: #cfe8fc;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const RootContainer: React.FC<RootContainerProps> = () => {
  return (
    <React.Fragment>
      <CssBaseline />
      <StyledContainer maxWidth="xl">
        <PaperCardContainer />
      </StyledContainer>
    </React.Fragment>
  );
};

export default RootContainer;
