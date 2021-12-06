import React from "react";
import {Container} from "react-bootstrap";

export default function Home() {
  return (
    <Container>
      <h1>Welcome to LanA!</h1>
      <p>
        LanA (<b>Lan</b>guage <b>A</b>tlas) is the Fedorenko Lab probabilistic atlas of the
        language network created based on language localizer data from &gt;800 individuals.
      </p>
    </Container>
  )
}
