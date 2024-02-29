import { mockProcess } from "../../moks";
import { changeDate } from "../../utils";
import { Progress } from "../Progress/Progress";
import { StyledContainer, StyledProcessWrapper, StyledTable } from "./styles";

const COLUMN_LENGTH = 24 * 60;
const COLUMN_WIDTH = 24;

export const ProgressTable = () => {
  const columns = Array(COLUMN_LENGTH)
    .fill(0)
    .map((_, index) => index + 1);

  const columsHour = Array(24)
    .fill(0)
    .map((_, index) => index + 1);

  return (
    <StyledContainer>
      <StyledTable cellSpacing={0} cellPadding={0} itemWidth={COLUMN_WIDTH}>
        <tr>
          {["", ...columsHour].map((el, index) => {
            return (
              <th
                colSpan={index === 0 ? 0 : 60}
                key={index}
                className={index === 0 ? "" : "hour_item"}
              >
                <div>{Number(el) <= 9 && el !== "" ? `0${el}` : el}</div>
              </th>
            );
          })}
        </tr>
        <tr>
          {["Process name", ...columns].map((el, index) => {
            const colMin = Number(el) % 60;
            const colName = colMin === 0 ? 60 : colMin;
            return (
              <th key={index} className={index === 0 ? "item_name" : ""}>
                <div className={index === 0 ? "" : "header"}>
                  {" "}
                  {index === 0 ? el : colName}
                </div>
              </th>
            );
          })}
        </tr>

        {mockProcess.map((item, index) => {
          const date = `${changeDate(item.start_dttm).split(" ")[0]}, ${
            item.start_dttm.split(" ")[1]
          }`;

          const startHour = new Date(date).getHours();
          const startMin = new Date(date).getMinutes();

          const startSec = new Date(
            changeDate(item.start_dttm.split(" ")[0]) +
              " " +
              item.start_dttm.split(" ")[1]
          ).getTime();
          const endSec = new Date(
            changeDate(item.plan_dttm.split(" ")[0]) +
              " " +
              item.plan_dttm.split(" ")[1]
          ).getTime();

          const minutesLoading = Math.ceil((endSec - startSec) / 1000 / 60);

          const fullStartMinutes = startHour * 60 + startMin;

          return (
            <tr key={index}>
              <td className="item_name">{item.name}</td>
              {columns.map((el, index) => {
                if (el === fullStartMinutes) {
                  return (
                    <td key={index}>
                      <div className="item">
                        <StyledProcessWrapper>
                          <Progress
                            process={item}
                            width={minutesLoading * COLUMN_WIDTH}
                          />
                        </StyledProcessWrapper>
                      </div>
                    </td>
                  );
                }

                return (
                  <td key={index}>
                    <div className="item"></div>
                  </td>
                );
              })}
            </tr>
          );
        })}
      </StyledTable>
    </StyledContainer>
  );
};
