import React, {useEffect, useMemo, useState} from 'react';
import Plot from 'react-plotly.js';
import {IRow} from "../types/CSV";

interface BoxPlotProps {
  data?: IRow[];
}

export default function BoxPlot(props: BoxPlotProps) {
  const [LH_S, setLH_S] = useState<any[]>([]);
  const [LH_N, setLH_N] = useState<any[]>([]);
  const [RH_S, setRH_S] = useState<any[]>([]);
  const [RH_N, setRH_N] = useState<any[]>([]);

  useEffect(() => {
    if (!props.data) return;
    setLH_S(props.data.map(row => row.LH_EffectSize_S));
    setLH_N(props.data.map(row => row.LH_EffectSize_N));
    setRH_S(props.data.map(row => row.RH_EffectSize_S));
    setRH_N(props.data.map(row => row.RH_EffectSize_N));
  }, [props.data]);

  const x = useMemo(
    () => [...(LH_S.map(_ => 'LH')), ...(RH_S.map(_ => 'RH'))],
    [LH_S, RH_S]
  );

  return (
    <Plot
      data={[
        {
          x: x,
          y: [...LH_S, ...RH_S],
          name: 'Language>Fixation',
          type: 'box',
          marker: {color: 'red'},
          boxpoints: 'all'
        },
        {
          x: x,
          y: [...LH_N, ...RH_N],
          name: 'Control>Fixation',
          type: 'box',
          marker: {color: 'brown'},
          boxpoints: 'all'
        },
      ]}
      layout={{
        yaxis: {
          title: '% BOLD Signal Change',
          zeroline: false
        },
        autosize: true,
        boxmode: 'group',
      }}
    />
  );
}