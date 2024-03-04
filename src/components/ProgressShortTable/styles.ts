import styled from "@emotion/styled";

export const StyledContainer = styled.div`
  overflow-x: scroll;
`;

export const StyledTable = styled.table<{
  itemWidth: number;
  withBorder: Boolean;
}>`
  position: relative;
  border-spacing: 0;

  border: 1px solid black;

  tr {
    border-bottom: 1px solid black;
  }
  td {
    position: relative;
    /* border-right: 1px solid black; */

    ${({ withBorder }) => {
      if (withBorder) {
        return `
        &:after {
          content: '';
          position: absolute;
          right: 0;
          top: 0;
          width: 1px;
          height: 100%;
          background-color: black;
        }
        `;
      }
      return "";
    }}
  }
  th {
    padding: 0;
    border-right: 1px solid black;
  }
  tr > td {
    /* padding: 10px; */
    /* border: 1px solid red; */
  }

  .hour_item {
    padding: 5px;
    border-bottom: 1px solid black;
  }

  .header {
    display: flex;
    align-items: center;
    justify-content: center;

    font-weight: 400;
  }

  .item_name {
    position: sticky;
    left: 0;
    background-color: #fff;

    z-index: 2;
    padding: 10px;

    ${({ withBorder }) => !withBorder && "border-right: 1px solid black"};
  }

  .item {
    display: flex;
    align-items: center;

    position: relative;
    height: 50px;
    width: ${({ itemWidth }) => `${itemWidth}px`};
  }
`;

export const StyledProcessWrapper = styled.div<{ toLeft: number }>`
  z-index: 1;
  position: absolute;
  left: ${({ toLeft }) => {
    return `${toLeft}px`;
  }};
`;
