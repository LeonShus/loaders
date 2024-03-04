import { Tooltip } from "antd";
import { mockProcess } from "../../moks";
import { changeDate } from "../../utils";
import { Progress } from "../Progress/Progress";
import { StyledContainer, StyledProcessWrapper, StyledTable } from "./styles";

const getTime = (time: string) => {
  return `${changeDate(time).split(" ")[0]}, ${time.split(" ")[1]}`;
};

function convertMsToMinAndSec(milliseconds: number) {
  let seconds = Math.floor(milliseconds / 1000);
  let minutes = Math.floor(seconds / 60);
  let hours = Math.floor(minutes / 60);

  seconds = seconds % 60;
  // 👇️ if seconds are greater than 30, round minutes up (optional)
  minutes = seconds >= 30 ? minutes + 1 : minutes;

  minutes = minutes % 60;

  // 👇️ If you don't want to roll hours over, e.g. 24 to 00
  // 👇️ comment (or remove) the line below
  // commenting next line gets you `24:00:00` instead of `00:00:00`
  // or `36:15:31` instead of `12:15:31`, etc.
  hours = hours % 24;

  // return Number(`${minutes}.${padTo2Digits(seconds)}`)
  return minutes + seconds / (60 / 100) / 100;
}

interface IProps {
  columnWidth: number;
  withBorder: boolean;
}

export const ProgressShortTable = ({ columnWidth, withBorder }: IProps) => {
  const data = mockProcess;

  const getExistingHours = () => {
    let hours: number[] = [];

    data.forEach((item) => {
      const startDate = getTime(item.start_dttm);
      const planDate = getTime(item.plan_dttm);

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
      <StyledTable
        cellSpacing={0}
        cellPadding={0}
        itemWidth={columnWidth}
        withBorder={withBorder}
      >
        <tbody>
          <tr>
            {["", ...existingHours].map((el, index) => {
              let time;

              if (Number(el) <= 9 && el !== "") {
                time = `0${el}:00`;
              } else if (el === "") {
                time = "";
              } else {
                time = `${el}:00`;
              }

              return (
                <th
                  colSpan={index === 0 ? 0 : 60}
                  key={index}
                  className={index === 0 ? "" : "hour_item"}
                >
                  <div>{time}</div>
                </th>
              );
            })}
          </tr>
          {/* <tr>
            {["Process name", ...columns].map((el, index) => {
              const colMin = Number(el) % 60;
              const colName = colMin === 0 ? 60 : colMin;
              return (
                <th key={index} className={index === 0 ? "item_name" : ""}>
                  <div className={index === 0 ? "" : "item_name"}>
                    {index === 0 ? el : colName}
                  </div>
                </th>
              );
            })}
          </tr> */}

          {data.map((item, index) => {
            const startDate = getTime(item.start_dttm);

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

            const fullStartMinutes = hourColumnIndex * 60 + (startMin + 1);

            const secondOfMinPersent = startSeconds / (60 / 100);

            const left = (secondOfMinPersent / 100) * columnWidth;

            const data = convertMsToMinAndSec(planSec - startSec);

            return (
              <tr key={index}>
                <td className="item_name">{item.name}</td>
                {columns.map((el, index) => {
                  if (el === fullStartMinutes) {
                    return (
                      <td key={index}>
                        <div className="item">
                          <StyledProcessWrapper toLeft={left}>
                            <Tooltip
                              title={
                                <div>
                                  {item.start_dttm.split(' ')[1]} - {item.plan_dttm.split(' ')[1]}
                                </div>
                              }
                            >
                              <div>
                                {" "}
                                <Progress
                                  process={item}
                                  width={(data - 1) * columnWidth}
                                />
                              </div>
                            </Tooltip>
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
