import { foods } from "./types";
import "./testData";
import { pokucaree, rikishiIdeal } from "./testData";

const Matching = () => {
  const keys: string[] = Object.keys(pokucaree);
  const values_1: number[] = Object.values(pokucaree);
  const values_2: number[] = Object.values(rikishiIdeal);
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
