import { food } from "./types";
import "./testData";
import { pokucaree, rikishiIdeal } from "./testData";

const Matching = (human: food, ryouri: food) => {
  const keys: string[] = Object.keys(ryouri);
  const values_1: number[] = Object.values(ryouri);
  const values_2: number[] = Object.values(human);
  var value_3: number[] = [];
  for (let index: number = 0; index < values_1.length; index++) {
    value_3.push(values_1[index] / values_2[index]);
    console.log(value_3);
  }
  let total = value_3.reduce(function (sum, element) {
    return sum + element;
  }, 0);

  console.log(total);
};

export default Matching;
