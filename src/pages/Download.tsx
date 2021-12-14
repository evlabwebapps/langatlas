import React from "react";
import {Container} from "react-bootstrap";

export default function Download() {
  return (
    <Container>
      <div className="d-flex justify-content-center align-items-center flex-wrap align-content-stretch">
        <a className="bigDownloadBtn" href=""><p>Download SPM Atlas</p></a>
        <a className="bigDownloadBtn" href=""><p>Download FS Atlas</p></a>
        <a className="bigDownloadBtn" href="http://evlabwebapps.mit.edu:8761/media/archives/8eb131da-8148-4f14-b564-8cee7e27cf8d.zip"><p>Download All SPM Data</p></a>
        <a className="bigDownloadBtn" href="http://evlabwebapps.mit.edu:8761/media/archives/9dbdc671-3215-47b4-83df-f5768655e33c.zip"><p>Download All FS Data</p></a>
      </div>
    </Container>
  )
}
