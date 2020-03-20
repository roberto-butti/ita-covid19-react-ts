import * as React from 'react';
import DataTable from 'react-data-table-component';


interface ITableProps {
    data: []
}

const Table: React.FunctionComponent<ITableProps> = (props) => {


        interface IPropsCustomNumber {
        row: any
        columnName: string

    }
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
            name: 'Data',
            selector: 'data',
            sortable: true,
            format: (row: any) => `${(new Date(row.data)).toLocaleDateString('it-IT', { month: 'short', day: 'numeric' })}`,
        },
        /*
        {
          name: 'Stato',
          selector: 'stato',
        },
        */
        {
            name: 'Ricoverati con sintomi',
            //selector: 'ricoverati_con_sintomi',
            cell: (row: any) => <CustomNumber row={row} columnName="ricoverati_con_sintomi" />,
        },
        {
            name: 'Terapia Intensiva',
            //selector: 'terapia_intensiva',
            cell: (row: any) => <CustomNumber row={row} columnName="terapia_intensiva" />,
        },
        {
            name: 'Tot Ospedalizzati',
            //selector: 'totale_ospedalizzati',
            cell: (row: any) => <CustomNumber row={row} columnName="totale_ospedalizzati" />,
        },
        {
            name: 'Isolamento Domiciliare',
            //selector: 'isolamento_domiciliare',
            cell: (row: any) => <CustomNumber row={row} columnName="isolamento_domiciliare" />,
        },
        {
            name: 'Totale Attualmente Positivi',
            //selector: 'totale_attualmente_positivi',
            cell: (row: any) => <CustomNumber row={row} columnName="totale_attualmente_positivi" />,
        },
        {
            name: 'Nuovi Attualmente Positivi',
            //selector: 'nuovi_attualmente_positivi',
            cell: (row: any) => <CustomNumber row={row} columnName="nuovi_attualmente_positivi" />,
        },
        {
            name: 'Dimessi Guariti',
            //selector: 'dimessi_guariti',
            cell: (row: any) => <CustomNumber row={row} columnName="dimessi_guariti" />,
        },
        {
            name: 'Deceduti',
            //selector: 'deceduti',
            cell: (row: any) => <CustomNumber row={row} columnName="deceduti" />,
        },
        {
            name: 'Totale Casi',
            //selector: 'totale_casi',
            cell: (row: any) => <CustomNumber row={row} columnName="totale_casi" />,
        },
        {
            name: 'Tamponi',
            //selector: 'tamponi',
            cell: (row: any) => <CustomNumber row={row} columnName="tamponi" />,
        },
    ];

  return <>
<DataTable
                title="COVID19 storico dati"
                columns={columns}
                //customStyles={customStyles}
                data={props.data}
                defaultSortField="data"
                defaultSortAsc={false}
                fixedHeader
                fixedHeaderScrollHeight="300px"
            />
  </>;
};

export default Table;
