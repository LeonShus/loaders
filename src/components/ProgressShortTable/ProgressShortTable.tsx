import { mockProcess } from "../../moks";
import { changeDate } from "../../utils";
import { Progress } from "../Progress/Progress";
import { StyledContainer, StyledProcessWrapper, StyledTable } from "./styles";

const COLUMN_WIDTH = 24;

export const ProgressShortTable = () => {
  const data = mockProcess;

  console.log('data', data)

  const getExistingHours = () => {
    let hours: number[] = [];

    data.forEach((item) => {
      const startDate = `${changeDate(item.start_dttm).split(" ")[0]}, ${
        item.start_dttm.split(" ")[1]
      }`;
      const planDate = `${changeDate(item.plan_dttm).split(" ")[0]}, ${
        item.plan_dttm.split(" ")[1]
      }`;

      const startHour = new Date(startDate).getHours();
      const planHour = new Date(planDate).getHours();

      if (!hours.includes(startHour)) {
        hours.push(startHour);
      }
      if (!hours.includes(planHour)) {
        hours.push(planHour);
      }
    });

    return hours;
  };

  const existingHours = getExistingHours();

  const minutes = existingHours.length * 60;

  const columns = Array(minutes)
    .fill(0)
    .map((_, index) => index + 1);

  return (
    <StyledContainer>
      <StyledTable cellSpacing={0} cellPadding={0} itemWidth={COLUMN_WIDTH}>
        <tbody>
          <tr>
            {["", ...existingHours].map((el, index) => {
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

          {data.map((item, index) => {
            const startDate = `${changeDate(item.start_dttm).split(" ")[0]}, ${
              item.start_dttm.split(" ")[1]
            }`;

            const startHour = new Date(startDate).getHours();
            const startMin = new Date(startDate).getMinutes();
            const startSeconds = new Date(startDate).getSeconds();

            const hourColumnIndex = existingHours.findIndex(
              (item) => item === startHour
            );

            const startSec = new Date(
              changeDate(item.start_dttm.split(" ")[0]) +
                " " +
                item.start_dttm.split(" ")[1]
            ).getTime();
            const planSec = new Date(
              changeDate(item.plan_dttm.split(" ")[0]) +
                " " +
                item.plan_dttm.split(" ")[1]
            ).getTime();

            const minutesLoading = Math.ceil((planSec - startSec) / 1000 / 60);

            const fullStartMinutes = hourColumnIndex * 60 + (startMin + 1);

            const secondOfMinPersent = Math.ceil(startSeconds / (60 / 100));

            const left = Math.ceil(secondOfMinPersent * (COLUMN_WIDTH / 100));

            console.log('minutesLoading', minutesLoading)

            return (
              <tr key={index}>
                <td className="item_name">{item.name}</td>
                {columns.map((el, index) => {
                  if (el === fullStartMinutes) {
                    return (
                      <td key={index}>
                        <div className="item">
                          <StyledProcessWrapper toLeft={left}>
                            <Progress
                              process={item}
                              width={minutesLoading * (COLUMN_WIDTH)}
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
        </tbody>
      </StyledTable>
    </StyledContainer>
  );
};
