import React, {useCallback, useEffect, useState} from "react";
import {IRow} from "../types/CSV";
import {ArrowLeft, ArrowRight} from "react-bootstrap-icons";

type GalleryProps = {
  experiments?: IRow[];
};

export default function Gallery(props: GalleryProps) {
  const [experiments, setExperiments] = useState<IRow[]>([]);
  const [currentExperiment, setCurrentExperiment] = useState<number | null>(null);

  useEffect(() => {
    if (!props.experiments) return;
    setExperiments(props.experiments);
    if (props.experiments.length > 0) {
      setCurrentExperiment(0);
    } else {
      setCurrentExperiment(null);
    }
  }, [props.experiments]);

  const nextImage = useCallback((direction: number) =>
    (_: React.MouseEvent<HTMLElement>) => {
      if (currentExperiment === null) {
        return;
      }
      setCurrentExperiment(Math.min(experiments.length - 1, Math.max(0, currentExperiment + direction)));
    }, [experiments, currentExperiment]);

  if (currentExperiment === null) {
    return <></>;
  }

  return <>
    <div className="d-flex justify-content-around align-items-center mb-1">
      {(currentExperiment > 0 &&
          <div className="galleryControlBtn" onClick={nextImage(-1)}>
              <ArrowLeft />
          </div>
      ) || <div style={{flexBasis: '5%'}} />}
      <div className="d-flex flex-column align-items-center">
        <img height="200" src={process.env.REACT_APP_BACKEND_URL + "/" + experiments[currentExperiment].SPM_T_png}
             alt={"SPM " + currentExperiment} />
        <div className="flex-row align-content-center">
          <img height="200" src={process.env.REACT_APP_BACKEND_URL + "/" + experiments[currentExperiment].FS_sig_lh_png}
               alt={"LH FS " + currentExperiment} />
          <img height="200" src={process.env.REACT_APP_BACKEND_URL + "/" + experiments[currentExperiment].FS_sig_rh_png}
               alt={"RH FS " + currentExperiment} />
        </div>
        <div className="alert alert-primary flex-grow-1">
          <table>
            <tr>
              <td className={"p-1"}><b>UID</b></td>
              <td className={"p-1"}>{experiments[currentExperiment].UID}</td>
            </tr>
            <tr>
              <td className={"p-1"}><b>Age</b></td>
              <td className={"p-1"}>{experiments[currentExperiment].Age}</td>
            </tr>
            <tr>
              <td className={"p-1"}><b>Gender</b></td>
              <td className={"p-1"}>{experiments[currentExperiment].Gender}</td>
            </tr>
            <tr>
              <td className={"p-1"}><b>Handedness</b></td>
              <td className={"p-1"}>{experiments[currentExperiment].Handedness}</td>
            </tr>
            <tr>
              <td className={"p-1"}><b>Native English</b></td>
              <td className={"p-1"}>{experiments[currentExperiment].NativeEnglish}</td>
            </tr>
            <tr>
              <td className={"p-1"}><b>Date of Scan</b></td>
              <td className={"p-1"}>{experiments[currentExperiment].ScanDate}</td>
            </tr>
            <tr>
              <td className={"p-1"}><b>Lateralization</b></td>
              <td className={"p-1"}>{experiments[currentExperiment].Lateralization}</td>
            </tr>
          </table>
        </div>
      </div>
      {(currentExperiment < experiments.length - 1 &&
          <div className="galleryControlBtn" onClick={nextImage(1)}>
              <ArrowRight />
          </div>
      ) || <div style={{flexBasis: '5%'}} />}
    </div>
  </>;
};
