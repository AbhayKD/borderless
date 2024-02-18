import React, { ChangeEvent, ReactNode } from "react";
import { Button, CircularProgress } from "@material-ui/core";
import styled from "styled-components";
import { useSelector } from "react-redux";
import { selectAppState } from "../../store/app/selector";
import { Status } from "../../store/enums";

type StyledButtonProps = {
  children: ReactNode;
  onClick: (e: ChangeEvent<HTMLInputElement>) => void;
  size?: "small" | "medium" | "large";
  type?: "button" | "file";
};

const StyledInput = styled.input`
  dispaly: none;
`;

const StyledButton: React.FC<StyledButtonProps> = ({
  children,
  onClick,
  size = "medium",
  type = "button",
}) => {
  const { status } = useSelector(selectAppState);
  const loading = status === Status.LOADING;
  return (
    <div>
      <StyledInput
        accept="image/*"
        style={{ display: "none" }}
        id="raised-button-file"
        multiple
        type={type}
        onChange={onClick}
      />
      <label htmlFor="raised-button-file">
        {!loading && (
          <Button
            component="span"
            size={size}
            color="primary"
            variant="contained"
          >
            {children}
          </Button>
        )}
        {loading && <CircularProgress size={20} color="primary" />}
      </label>
    </div>
  );
};

export default StyledButton;
