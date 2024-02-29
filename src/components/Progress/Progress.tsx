import { IProcess } from "../../types/types";
import { StyledContainer, StyledProress } from "./styles";

interface IProps {
  process: IProcess;
  width?: number
}


export const Progress = ({ process, width = 500 }: IProps) => {
  const changeDate = (date: string) => {
    return date.split(" ")[0].split(".").reverse().join("-");
  };

  const startSec = new Date(
    changeDate(process.start_dttm.split(" ")[0]) +
      " " +
      process.start_dttm.split(" ")[1]
  ).getTime();
  const endSec = new Date(
    changeDate(process.plan_dttm.split(" ")[0]) +
      " " +
      process.plan_dttm.split(" ")[1]
  ).getTime();

  const processSec = new Date(
    changeDate(process.end_dttm.split(" ")[0]) +
      " " +
      process.end_dttm.split(" ")[1]
  ).getTime();


  const full = endSec - startSec;
  const current = processSec - startSec;


  const percent = Math.floor(current / (full / 100))


  return (
      <StyledProress status={process.status} percent={percent} width={width}>
        <p className="process_info">{percent}%</p>
      </StyledProress>
  );
};
