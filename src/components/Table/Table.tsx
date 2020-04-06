import * as React from 'react';
import DataTable from 'react-data-table-component';
import { useTranslation } from 'react-i18next';
import i18n from "i18next";


interface ITableProps {
  data: []
}

const Table: React.FunctionComponent<ITableProps> = (props) => {


  interface IPropsCustomNumber {
    row: any
    columnName: string

  }

  const { t } = useTranslation();
  let locale = i18n.language === "it" ? "it-IT" : "en-US";

  const CustomNumber: React.FunctionComponent<IPropsCustomNumber> = (props: IPropsCustomNumber) => (
    <div>
      <div>{props.row[props.columnName]}</div>
      {Object.keys(props.row.prev).length > 0 &&
        <>
          <div style={{ color: 'grey', overflow: 'hidden', textOverflow: 'ellipses' }}>
            {props.row[props.columnName] - props.row.prev[props.columnName]}
          </div>
          <div style={{ color: 'grey', overflow: 'hidden', textOverflow: 'ellipses' }}>
            {(100 - ((props.row.prev[props.columnName] / props.row[props.columnName]) * 100)).toFixed(2)}%
            </div>
        </>
      }
    </div>
  );
  const columns = [
    {
      name: t("Data"),
      selector: 'data',
      sortable: true,
      format: (row: any) => `${(new Date(row.data)).toLocaleDateString(locale, { month: 'short', day: 'numeric' })}`,
    },
    {
      name: t("metrica_ricoverati_con_sintomi"),
      cell: (row: any) => <CustomNumber row={row} columnName="ricoverati_con_sintomi" />,
    },
    {
      name: t("metrica_terapia_intensiva"),
      cell: (row: any) => <CustomNumber row={row} columnName="terapia_intensiva" />,
    },
    {
      name: t("metrica_totale_ospedalizzati"),
      cell: (row: any) => <CustomNumber row={row} columnName="totale_ospedalizzati" />,
    },
    {
      name: t("metrica_isolamento_domiciliare"),
      cell: (row: any) => <CustomNumber row={row} columnName="isolamento_domiciliare" />,
    },
    {
      name: t("metrica_totale_positivi"),
      cell: (row: any) => <CustomNumber row={row} columnName="totale_positivi" />,
    },
    {
      name: t("metrica_variazione_totale_positivi"),
      cell: (row: any) => <CustomNumber row={row} columnName="variazione_totale_positivi" />,
    },
    {
      name: t("metrica_dimessi_guariti"),
      cell: (row: any) => <CustomNumber row={row} columnName="dimessi_guariti" />,
    },
    {
      name: t("metrica_deceduti"),
      cell: (row: any) => <CustomNumber row={row} columnName="deceduti" />,
    },
    {
      name: t("metrica_totale_casi"),
      cell: (row: any) => <CustomNumber row={row} columnName="totale_casi" />,
    },
    {
      name: t("metrica_tamponi"),
      cell: (row: any) => <CustomNumber row={row} columnName="tamponi" />,
    },
  ];
console.log(props.data);
  return <>
    <DataTable
      title={t("storico_dati")}
      columns={columns}
      //customStyles={customStyles}
      data={props.data}
      defaultSortField="data"
      defaultSortAsc={false}
      fixedHeader={true}
      fixedHeaderScrollHeight="300px"
    />
  </>;
};

export default Table;
