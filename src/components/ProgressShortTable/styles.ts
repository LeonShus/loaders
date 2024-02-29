import styled from "@emotion/styled";

export const StyledContainer = styled.div`
  overflow-x: scroll;
`;

export const StyledTable = styled.table<{ itemWidth: number }>`
  position: relative;
  border-spacing: 0;

  border: 1px solid black;

  tr {
    border-bottom: 1px solid black;
  }
  td {
    border-right: 1px solid black;
  }
  th {
    padding: 0;
    border-right: 1px solid black;
  }
  tr > td {
    /* padding: 10px; */
    /* border: 1px solid red; */
  }

  .hour_item{
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
  }

  .item {
    position: relative;
    height: 50px;
    width: ${({ itemWidth }) => `${itemWidth}px`};
  }
`;

export const StyledProcessWrapper = styled.div<{toLeft: number}>`
  position: absolute;
  left: ${({toLeft}) => {
    return `${toLeft}px`
  }};
`;
