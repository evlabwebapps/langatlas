export default function ExploreActivationMapsText() {
    return (<>
        <p>
            On this page, you can explore the individual activation maps for the Language&gt;Control contrast. For each
            of 806 individuals in the atlas, we show complementary maps from the volume-based analysis and the
            surface-based analysis.
        </p>
        <p>
            For the volume-based maps, the visualizations were created in <a target="_blank" href="https://nilearn.github.io/plotting/index.html">NiLearn</a> on a consistent t-scale
            from 0 to 10, with a threshold at 3.09, which approximates a cutoff of p&lt;0.001 as N→∞. These plots
            should provide insight into the significance landscape of the Language&gt;Control contrast for individual
            participants.
        </p>
        <p>
            For the surface-based maps, the visualizations were created in <a target="_blank" href="https://surfer.nmr.mgh.harvard.edu/fswiki/FreeviewGuide">FreeView</a> using a
            percentile-based thresholding method, with min, mid, and max defined at 70%, 80% and 99%, respectively.
            Following this thresholding, contiguous patches smaller than 50mm^2 were removed to provide clean activation
            landscapes. These plots should provide insight into the core driving regions of each participant,
            independent of their mean activation strength.
        </p>
        <p>
            The full set of maps is available from <a href="#/download">Download</a>.
            Below the maps, we provide the following information: UID (unique identifier of the participant in our
            database), age (in full years at the time of the scan), gender, handedness (right, left, or ambidextrous),
            whether or not the individual is a native speaker of English (1=yes/0=no), date of the scan, and
            lateralization information (LH=left-hemisphere, RH=right-hemisphere; calculated as described in <a href="#/explore-neural-markers">Explore
            Neural Markers</a>). If a value is missing, it means it’s not available / was not collected.
        </p>
    </>)
}