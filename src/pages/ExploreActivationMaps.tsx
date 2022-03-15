import React, {useEffect, useState} from "react";
import {ICSVTable} from "../types/CSV";
import LangAtlasService from "../services/LangAtlasService";
import Gallery from "../components/Gallery";
import ExploreActivationMapsText from "../texts/ExploreActivationMapsText";

export default function ExploreActivationMaps(props: any) {
    const table_name = "test_2";
    const [csvTable, setCSVTable] = useState<ICSVTable | null>(null);

    useEffect(() => {
        LangAtlasService.getCSVTable(table_name)
            .then((table: ICSVTable) => setCSVTable(table));
    }, []);

    return (
        <div className="w-75 mx-auto">
            <div className="d-flex flex-column align-content-center justify-content-center">
                <ExploreActivationMapsText/>
            </div>
            <Gallery experiments={csvTable?.csvData}/>
        </div>
    );
}
