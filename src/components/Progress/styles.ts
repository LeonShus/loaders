import styled from "@emotion/styled";
import { TStatuses } from "../../types/types";

export const StyledContainer = styled.div`
  display: grid;
  grid-template-columns: 300px 500px;
  gap: 20px;
  align-items: center;
`;

export const StyledProress = styled.div<{
  status: TStatuses;
  percent: number;
  width: number;
}>`
  position: relative;
  display: flex;

  justify-content: center;
  align-items: center;

  background-color: #f0f2f9;
  padding: 5px;
  border-radius: 5px;

  width: ${({ width }) => `${width}px`};
  height: 30px;

  box-shadow: 0px 3px 20px 2px rgba(0, 0, 0, 0.1);

  .process_info {
    z-index: 1;
  }

  border: 1px solid
    ${({ status }) => {
      switch (status) {
        case "process": {
          return "rgba(35,175,96,1)";
        }
        case "error": {
          return "rgba(210,23,74,1)";
        }
        default: {
          return "rgba(35,175,96,1)";
        }
      }
    }};

  &:before {
    content: "";
    height: 100%;
    width: ${({ percent, width }) => {
      const widthProcess = width * (percent / 100);
      return `${widthProcess}px`;
    }};
    position: absolute;
    left: 0;
    background: ${({ status }) => {
      switch (status) {
        case "process": {
          return "linear-gradient(90deg, rgba(121,224,170,1) 0%, rgba(43,196,113,1) 50%, rgba(35,175,96,1) 100%)";
        }
        case "error": {
          return "linear-gradient(90deg, rgba(226,91,105,1) 0%, rgba(210,23,74,1) 50%, rgba(226,31,64,1) 100%)";
        }
        default: {
          return "linear-gradient(90deg, rgba(121,224,170,1) 0%, rgba(43,196,113,1) 50%, rgba(35,175,96,1) 100%)";
        }
      }
    }};

    border-radius: 5px;
  }
`;
