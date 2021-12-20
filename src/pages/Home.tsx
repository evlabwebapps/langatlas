import React from "react";
import {Container} from "react-bootstrap";
import SPM from "../images/SPM.gif";
import FS from "../images/FS.gif";

export default function Home() {
  return (
    <Container>
      <h1>Welcome to LanA!</h1>
      <p>
        LanA (<b>Lan</b>guage <b>A</b>tlas) is the Fedorenko Lab probabilistic atlas of the
        language network created based on language localizer data from &gt;800 individuals.
      </p>
      <div className="alert alert-primary">
        <h4 className="alert-heading">Citation</h4>
        Lipkin B, Tuckute G, Affourtit J, Small H, Mineroff Z, Kean H, Jouravlev O, Rakocevic L,
        Pitchett B, Siegelman M, Hoeflin C, Pongos A, Blank I, Kline M, Ivanova A, Shannon S,
        Nieto-Castañón A, and Fedorenko E. (in prep). LanA (Language Atlas): A probabilistic
        atlas for the language network based on data from &gt;800 individuals.
      </div>
      <div className="d-flex justify-content-around align-items-center mb-1 mr-1">
        <img height="350" src={SPM} alt="SPM animation" />
        <img height="350" src={FS} alt="FS animation" />
      </div>
      <p>
        <h3>Common uses</h3>
        <ol>
          <li>
            LanA establishes a common reference frame that can facilitate comparisons of
            findings
            across studies, analytic approaches, and recording methodologies.
          </li>
          For example, LanA enables you to:
          <ol type="i">
            <li>
              estimate the probability that an activation peak / cluster from a group-averaging
              study falls within the language network;
            </li>
            <li>
              estimate the probability that a peak / cluster from a meta-analysis of activation
              peaks falls within the language network;
            </li>
            <li>
              estimate the probability that a patient’s lesion or lesion overlap location (as
              estimated in VBM/VLSM approaches) falls within the language network;
            </li>
            <li>
              estimate the probability that an ECoG/SEEG electrode is placed within the
              language network;
            </li>
            <li>
              estimate the probability that source-localized MEG activation cluster falls within
              the language network.
            </li>
          </ol>

          <li>
            LanA can have clinical applications, like guiding functional mapping during brain
            surgery, especially in cases where fMRI may not be possible.
          </li>
          <li>
            LanA can be used to relate the topography of the language network voxel-by-voxel to
            other whole-brain datasets, including structural data, gene expression data, or
            receptor
            density data, to establish links between the language system and other brain features.
          </li>
          <li>
            In the presence of language localizer data in other populations, LanA can serve as a
            normative topographic distribution (see also Explore Neural Markers) to which
            topographies
            from other populations (e.g., individuals from different age groups, populations with
            developmental or acquired brain disorders or psychiatric conditions, etc.) can be
            compared.
          </li>
        </ol>
      </p>
      <p>
        <h3>Important disclaimers</h3>
        <ol>
          <li>
            This is the atlas for the ‘high-level' language processing network, which supports
            language comprehension and production, including lexical and combinatorial
            syntactic/semantic processing, but to the exclusion of perceptual processes (speech
            perception / visual perception for reading) and motor processes (articulation /
            writing / typing).
          </li>
          <li>
            The language network is one of many functional networks in the human brain.
            Efforts by our and other groups are ongoing to create similar atlases for other
            functional networks. Some of these will serve as useful controls for some of the
            analyses outlined in ‘Common uses’.
          </li>

          <li>
            LanA is not a ‘replacement’ for functional localizers. For many research
            questions, it  will not be possible to obtain clear answers without analyzing responses
            to critical  conditions in individually defined language areas. As a result, we
            continue encouraging  researchers to adopt functional localization in their work (see&nbsp;
            <a href="http://evlab.mit.edu/funcloc">evlab.mit.edu/funcloc</a>), and hope that LanA
            can help establish a common reference frame for the language network in cases where
            individual-level analyses may not be possible.
          </li>
        </ol>
      </p>
    </Container>
  )
}
