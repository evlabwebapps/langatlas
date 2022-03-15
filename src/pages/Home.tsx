import React, {useCallback, useEffect, useMemo, useState} from "react";
import {Container, Spinner} from "react-bootstrap";
import FSP from "../images/FSP.gif";
import LangAtlasService from "../services/LangAtlasService";
import {ISiteText} from "../types/CSV";

export default function Home() {
    const [texts, setTexts] = useState<Array<ISiteText>>([]);

    const getHtmlText = useMemo(() => {
        let result: any = {};
        texts.map((text) => {
            result[text.key] = <div dangerouslySetInnerHTML={{ __html: text.value }} />
        });
        return (text_name: string) => {
            return result[text_name] || <Spinner animation="border"/>;
        };
    }, [texts]);

    useEffect(() => {
        LangAtlasService.getTexts().then((response: any) => {
            setTexts(response.data);
        });
    }, []);

    return (
        <Container>
            <h1>Welcome to LanA!</h1>
            <p>
                LanA (<b>Lan</b>guage <b>A</b>tlas) is the Fedorenko Lab probabilistic atlas of the
                language network created based on language localizer data from &gt;800 individuals.
            </p>
            <div className="alert alert-dark">
                <h4 className="alert-heading">Citation</h4>
                { getHtmlText("citation") }
            </div>
            <div className="d-flex justify-content-around align-items-center mb-1 mr-1">
                <img height="300" src={FSP} alt="FSP animation"/>
            </div>
            <p>
                <h3>Common uses</h3>
                { getHtmlText("common_uses") }
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
                        questions, it will not be possible to obtain clear answers without analyzing responses
                        to critical conditions in individually defined language areas. As a result, we
                        continue encouraging researchers to adopt functional localization in their work (see&nbsp;
                        <a href="http://evlab.mit.edu/funcloc">evlab.mit.edu/funcloc</a>), and hope that LanA
                        can help establish a common reference frame for the language network in cases where
                        individual-level analyses may not be possible.
                    </li>
                </ol>
            </p>
        </Container>
    )
}
