import {Col, Row} from "react-bootstrap";
import CSVTable from "../components/CSVTable";
import React, {useEffect, useMemo, useState} from "react";
import {ICSVTable} from "../types/CSV";
import CSVTableService from "../services/CSVTableService";
import Gallery from "../components/Gallery";

export default function ExploreActivationMaps(props: any) {
  const table_name = "test_2";
  const [csvTable, setCSVTable] = useState<ICSVTable | null>(null);
  const [selectedRows, setSelectedRows] = useState<number[]>([]);

  useEffect(() => {
    CSVTableService.get(table_name)
      .then((table: ICSVTable) => setCSVTable(table));
  }, []);

  return <>
    <Gallery experiments={csvTable?.csvData}/>
  </>;
}
