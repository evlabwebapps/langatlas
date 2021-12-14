import React, {useCallback, useState} from 'react';

import ReactDataGrid from '@inovua/reactdatagrid-community';
import '@inovua/reactdatagrid-community/index.css'
import NumberFilter from "@inovua/reactdatagrid-community/NumberFilter";
import StringFilter from "@inovua/reactdatagrid-community/StringFilter";
import BoolFilter from "@inovua/reactdatagrid-community/BoolFilter";
import DateFilter from "@inovua/reactdatagrid-community/DateFilter";

import {IColumn, IRow} from "../types/CSV";
import SelectFilter from "@inovua/reactdatagrid-community/SelectFilter";

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
    case  "select":
      return SelectFilter;
    default:
      return undefined;
  }
}

const getFilterEditorProps = (column: IColumn) => {
  if (!column.filtering || !column.lookup) {
    return undefined;
  }
  if (column.type === "select") {
    return {
      placeholder: 'All',
      dataSource: Object.entries(column.lookup).map(([key, value]) => ({id: key, label: value}))
    };
  }
  if (column.type === "date") {
    // @ts-ignore
    return (props, { index }) => {
      return {
        dateFormat: 'YYYY-MM-DD',
        cancelButton: false,
        highlightWeekends: false,
        placeholder: index === 1 ? 'before': 'after'
      }
    }
  }
}

const getGridColumns = (columns: IColumn[]) => columns
  ?.filter(col => col.visible)
  ?.map(col => ({
      name: col.field,
      header: col.title,
      type: col.type,
      filterEditor: getFilterEditor(col),
      filterEditorProps: getFilterEditorProps(col),
      width: col.width || 150
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
    operator: column.default_operator || "eq",
    value: column.type !== "date" ? null : ''
  }
}

const getGridFilterValue = (columns: IColumn[]) =>
  columns
    .filter(col => col.filtering)
    .map(col => getDefaultFilter(col));

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
