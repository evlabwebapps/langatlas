import parcel from "../images/parcel.png";
import React from "react";

export default function ExploreNeuralMarkersText() {
    return (
        <div>
            <p>
                On this page, you can examine the distributions of various neural measures of
                language activity for all or a subset of 806 individuals.
            </p>
            <p>
                NB: For all these measures, we used a set of language network ‘parcels’, which we had
                created several years ago based on n=220 participants by applying a whole-brain
                Group-Constrained Subject-specific (GSS) analysis to the probabilistic overlap map,
                as
                described in Fedorenko et al. (2010; in this original paper, this procedure was
                performed
                on a smaller set of n=25 participants). The parcels are shown below.
            </p>
            <p style={{width: "100%", textAlign: "center"}}>
                <img src={parcel} alt={"parcel"} width={"45%"} style={{margin: "5px", marginLeft: "auto"}}/>
            </p>
            <p>
                We include three sets of measures:
            </p>
            <ol>
                <li>
                    Number of Significant LH / RH Voxels (Language&gt;Control contrast; p&lt;0.001
                    uncorrected whole-brain)<br/>
                    (this is the number of supra-threshold voxels for the language localizer contrast (see
                    Localizer Info for details) within the union of the language 'parcels')
                </li>
                <li>
                    Mean LH/RH Effect Size (Language&gt;Control contrast, % BOLD Signal Change) <br/>
                    (this is the effect size for the language localizer contrast, averaged across the six
                    LH/RH language fROIs; the fROIs were defined in each individual as the top 10% of most
                    language-responsive voxels within each parcel, and the magnitudes of response were
                    estimated using an across-runs cross-validation procedure, to ensure independence)
                </li>
                <li>
                    Mean LH/RH Spatial Correlation (Language&gt;Control contrast; stability of the
                    activation landscape between odd and even runs) <br/>
                    (this is a Fisher-transformed correlation between the values for the
                    Language&gt;Control contrast in the odd vs. even runs across the six LH/RH
                    language parcels)
                </li>
            </ol>
            <p>
                By default, selecting one of these measures, will display a histogram that includes all
                806 participants. However, using the header row of the Table below, you can filter
                participants by one or more variables, like age, gender, etc., and the histogram will
                be updated.
            </p>
            <p>
                The table includes some demographic variables, some details of the scanning session,
                and lateralization (as determined based on the language localizer), as described below.
            </p>
            <p>
                UID: Unique ID (number of the participant in our lab database, ranges from 1 to
                837) <br/>
                Age: age in years at the time of the scan <br/>
                Gender: Male/Female <br/>
                Handedness: Right(-handed)/Left(-handed)/Ambidextrous/NA (we are missing handedness
                information on a small fraction of the participants) <br/>
                Native English Speaker: Yes/No <br/>
                Date of Scan: a date when the scanning session took place (these participants were
                scanned at the Athinoula A. Martinos Imaging Center at the MIT McGovern Institute
                between September 2007 and June 2021) <br/>
                Localizer version: A-J (see Localizer Info page for details) <br/>
                Lateralization: LH (left-hemisphere lateralization) / RH (right-hemisphere
                lateralization) (this is determined by subtracting the number of supra-threshold voxels
                in the RH from the number of supra-threshold voxels in the LH, and dividing the result
                by the sum of the LH and RH supra-threshold voxels; this is done within the boundaries
                of the language parcels)
            </p>
        </div>
    );
}