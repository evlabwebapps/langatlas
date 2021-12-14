import {useMemo} from "react";
import {IRow} from "../types/CSV";
import Statistics from "../services/Statistics";

type SummaryDemographicsProps = {
  selectedRows?: IRow[];
};

export default function SummaryDemographics(props: SummaryDemographicsProps) {
  const stats = useMemo(() => {
    if (!props.selectedRows) return undefined;
    const age = props.selectedRows.map(row => row.Age);
    const gender = props.selectedRows.map(row => row.Gender);
    const hand = props.selectedRows.map(row => row.Handedness);
    const nativeEnglish = props.selectedRows.map(row => row.NativeEnglish);
    return {
      age: {
        average: Statistics.mean(age).toFixed(2),
        std: Statistics.standardDeviation(age).toFixed(2),
        min: Statistics.min(age),
        max: Statistics.max(age)
      },
      gender: {
        male: (gender.filter(g => g === "M").length / gender.length * 100).toFixed(2),
        female: (gender.filter(g => g === "F").length / gender.length * 100).toFixed(2)
      },
      hand: {
        left: (hand.filter(h => h === "left").length / hand.length * 100).toFixed(2),
        right: (hand.filter(h => h === "right").length / hand.length * 100).toFixed(2),
        ambidextrous: (hand.filter(h => h === "ambidextrous").length / hand.length * 100).toFixed(2),
        none: (hand.filter(h => h === "").length / hand.length * 100).toFixed(2),
      },
      nativeEnglish: {
        yes: (nativeEnglish.filter(e => e === "1").length / nativeEnglish.length * 100).toFixed(2),
        no: (nativeEnglish.filter(e => e === "0").length / nativeEnglish.length * 100).toFixed(2)
      }
    };
  }, [props.selectedRows]);

  return (
    <>
      <h3>Summary demographics of this population</h3>
      {(stats && <>
          <b>Age: </b>
            average {stats.age.average} (st. dev. {stats.age.std}),&nbsp;
            range {stats.age.min}-{stats.age.max} <br/>
          <b>Gender: </b>
            {stats.gender.male}% male,&nbsp;
            {stats.gender.female}% female <br/>
          <b>Handedness: </b>
            {stats.hand.right}% right-handed,&nbsp;
            {stats.hand.left}% left-handed,&nbsp;
            {stats.hand.ambidextrous}% ambidextrous&nbsp;
              ({stats.hand.none}% no handedness info) <br/>
          <b>Native English speaker status: </b>
            {stats.nativeEnglish.yes}% native speakers,&nbsp;
            {stats.nativeEnglish.no}% native speakers of other
              languages and proficient speakers of English
      </>) || <i>No rows selected</i>}

    </>
  );
}