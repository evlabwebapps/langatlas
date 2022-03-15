import React, {useCallback, useEffect, useState} from "react";
import {Container} from "react-bootstrap";
import LangAtlasService from "../services/LangAtlasService";
import {IDownloadCounter} from "../types/CSV";

export default function Download() {
    const [counters, setCounters] = useState<any>({});

    useEffect(() => {
        LangAtlasService.getDownloadCounters().then(
            (response: any) => {
                let countersObject = {};
                response.data.map(
                    (counter: IDownloadCounter) => {
                        countersObject = {...countersObject, [counter.name]: counter.counter};
                    }
                );
                setCounters(countersObject);
            }
        )
    }, []);

    const countDownloads = useCallback(
        (downloadName: string) => {
            LangAtlasService.countDownloaded(downloadName).then(
                (response: any) => {
                    setCounters({...counters, [response.data.name]: response.data.counter})
                }
            );
        }, [counters]
    )

    return (
        <Container>
            <div className="d-flex justify-content-center align-items-center flex-wrap align-content-stretch">
                <a className="bigDownloadBtn downloadSPMAtlas"
                   href="http://evlabwebapps.mit.edu:8761/media/atlas/SPM.zip"
                   onClick={() => countDownloads('spm-atlas')}
                >
                    <div className={"bigDownloadBtnLabelWrapper"}>
                        <p>Download SPM Atlas</p>
                    </div>
                    <div className={"downloadCounter"}>{counters['spm-atlas'] || 0} downloads</div>
                </a>
                <a className="bigDownloadBtn downloadFSAtlas"
                   href="http://evlabwebapps.mit.edu:8761/media/atlas/FS.zip"
                   onClick={() => countDownloads('fs-atlas')}
                >
                    <p>Download FS Atlas</p>
                    <div className={"downloadCounter"}>{counters['fs-atlas'] || 0} downloads</div>
                </a>
                <a className="bigDownloadBtn downloadSPMAll"
                   href="http://evlabwebapps.mit.edu:8761/media/archives/2c0e6ec2-3c52-4016-8c68-bcba4ca21e38.zip"
                   onClick={() => countDownloads('spm-data')}
                >
                    <p>Download All SPM Data</p>
                    <div className={"downloadCounter"}>{counters['spm-data'] || 0} downloads</div>
                </a>
                <a className="bigDownloadBtn downloadFSAll"
                   href="http://evlabwebapps.mit.edu:8761/media/archives/d2faa613-5dd9-4b29-a37d-25b0a6cda2d7.zip"
                   onClick={() => countDownloads('fs-data')}
                >
                    <p>Download All FS Data</p>
                    <div className={"downloadCounter"}>{counters['fs-data'] || 0} downloads</div>
                </a>
            </div>
        </Container>
    )
}
