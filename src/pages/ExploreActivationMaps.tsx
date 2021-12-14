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

  const selectedImages = useMemo(() =>
      csvTable?.csvData
        ?.filter(row => selectedRows.includes(row.UID))
        ?.map(({UID, SPM_T_png}) => ({UID, url: SPM_T_png})) || [],
    [csvTable, selectedRows]);

  return <>
    <Gallery images={selectedImages}/>

    <Row>
      <Col md={{span: 12}}>
        {
          (csvTable?.csvData?.length || 0) > 0 &&
          <CSVTable
              rows={csvTable?.csvData ? csvTable.csvData : []}
              columns={csvTable?.columns ? csvTable.columns : []}
              onSelectionChange={setSelectedRows}
          />
        }
      </Col>
    </Row>
  </>;
}
