import React from "react";
import {Container} from "react-bootstrap";

export default function Download() {
  return (
    <Container>
      <div className="d-flex justify-content-center align-items-center flex-wrap align-content-stretch">
        <a className="bigDownloadBtn downloadSPMAtlas" href="http://evlabwebapps.mit.edu:8761/media/atlas/SPM.zip"><p>Download SPM Atlas</p></a>
        <a className="bigDownloadBtn downloadFSAtlas" href="http://evlabwebapps.mit.edu:8761/media/atlas/FS.zip"><p>Download FS Atlas</p></a>
        <a className="bigDownloadBtn downloadSPMAll" href="http://evlabwebapps.mit.edu:8761/media/archives/2c0e6ec2-3c52-4016-8c68-bcba4ca21e38.zip"><p>Download All SPM Data</p></a>
        <a className="bigDownloadBtn downloadFSAll" href="http://evlabwebapps.mit.edu:8761/media/archives/d2faa613-5dd9-4b29-a37d-25b0a6cda2d7.zip"><p>Download All FS Data</p></a>
      </div>
    </Container>
  )
}
