#!/usr/bin/env node
import inquirer from "inquirer";
import { differenceInSeconds } from "date-fns";
const res = await inquirer.prompt({
  name: "UserInput",
  type: "number",
  message: "Please enter an amount of seconds",
  validate: (input) => {
    if (isNaN(input)) {
      return "Plz enter a valid number";
    } else if (input > 60) {
      return "Seconds must be in 60";
    } else {
      return true;
    }
  },
});
let input = res.UserInput;
function startTime(val: number) {
  const initialTime = new Date().setSeconds(new Date().getSeconds() + val);
  const intervalTime = new Date(initialTime);
  setInterval(() => {
    const currentTime = new Date();
    const timeDiff = differenceInSeconds(intervalTime, currentTime);
    if (timeDiff <= 0) {
      console.log("Timer Has been expired");
      process.exit();
    }
    const min = Math.floor((timeDiff % (3600 * 24)) / 3600);
    const sec = Math.floor(timeDiff % 60);
    console.log(
      `${min.toString().padStart(2, "0")}:${sec.toString().padStart(2, "0")}`
    );
  }, 1000);
}
startTime(input);
