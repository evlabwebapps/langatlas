import React, {useCallback, useState} from 'react';

import ReactDataGrid from '@inovua/reactdatagrid-community';
import '@inovua/reactdatagrid-community/index.css'
import NumberFilter from "@inovua/reactdatagrid-community/NumberFilter";
import StringFilter from "@inovua/reactdatagrid-community/StringFilter";
import BoolFilter from "@inovua/reactdatagrid-community/BoolFilter";
import DateFilter from "@inovua/reactdatagrid-community/DateFilter";

import {IColumn, IRow} from "../types/CSV";

type CSVTableProps = {
  rows: IRow[];
  columns: IColumn[];
  onSelectionChange: (selected: number[]) => void;
}

const getFilterEditor = (column: IColumn) => {
  if (!column.filtering) {
    return undefined;
  }
  switch (column.type) {
    case  "string":
      return StringFilter;
    case "boolean":
      return BoolFilter;
    case  "number":
      return NumberFilter;
    case    "date":
      return DateFilter;
    default:
      return undefined;
  }
}

const getGridColumns = (columns: IColumn[]) => columns
  ?.filter(col => col.visible)
  ?.map(col => ({
      name: col.field,
      header: col.title,
      type: col.type,
      filterEditor: getFilterEditor(col),
    })
  );

const getGridDataSource = <T extends { [key: string]: any }>(columns: IColumn[], rows: T[]) => {
  const visibleColumns = columns?.filter(c => c.visible).map(c => c.field) || [];
  return rows?.map(
    (row: T) => visibleColumns.reduce(
      (obj, key) => ({...obj, [key]: row[key]}), {}
    )
  ) || [];
};

const getDefaultFilter = (column: IColumn) => {
  return {
    name: column.field,
    type: column.type || "string",
    operator: 'eq',
    value: '',
    active: false
  }
}

const getGridFilterValue = (columns: IColumn[]) =>
  columns
    .filter(col => col.filtering)
    .map(col => getDefaultFilter(col)
    );

export default function CSVTable(props: CSVTableProps) {
  const [selected, setSelected] = useState({});

  const onSelectionChange = useCallback(({selected}) => {
    setSelected(selected);
    // @ts-ignore
    props.onSelectionChange(Object.values(selected).map(row => row['UID']));
  }, [props]);

  const gridStyle = {minHeight: 550, overflowY: 'hidden'};
  const columns = getGridColumns(props.columns);
  const dataSource = getGridDataSource(props.columns, props.rows);
  const filterValue = getGridFilterValue(props.columns);

  return (
    <div style={{marginBottom: '30px'}}>
      <ReactDataGrid
        idProperty="UID"
        columns={columns}
        dataSource={dataSource}
        defaultFilterValue={filterValue}
        selected={selected}
        checkboxColumn
        onSelectionChange={onSelectionChange}
        style={gridStyle}
        nativeScroll={true}
      />
    </div>
  );
};
