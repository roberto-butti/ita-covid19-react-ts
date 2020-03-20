import React, { useState, useEffect } from 'react';
import DataTable from 'react-data-table-component';

interface IMainProps {
}

const Main: React.FunctionComponent<IMainProps> = (props) => {
    const [hasError, setErrors] = useState(false)
    const [data, setData] = useState([])

    async function fetchData() {
        const res = await fetch("https://raw.githubusercontent.com/pcm-dpc/COVID-19/master/dati-json/dpc-covid19-ita-andamento-nazionale.json");
        res
            .json()
            .then((res) => {
                console.log(res)
                let prevRow = {};
                for (let index = 0; index < res.length; index++) {
                    const element = res[index];
                    res[index]["prev"] = prevRow;
                    prevRow = element;
                }
                setData(res)
            })
            .catch(err => setErrors(err));
    }

    useEffect(() => {
        fetchData();
    }, []);


    interface IPropsCustomNumber {
        row: any
        columnName: string

    }
    const CustomNumber: React.FunctionComponent<IPropsCustomNumber> = (props: IPropsCustomNumber) => (
        <div>
            <div>{props.row[props.columnName]}</div>
            <div style={{ color: 'grey', overflow: 'hidden', textOverflow: 'ellipses' }}>
                {props.row[props.columnName] - props.row.prev[props.columnName]}
            </div>
            <div style={{ color: 'grey', overflow: 'hidden', textOverflow: 'ellipses' }}>
                {(100 - ((props.row.prev[props.columnName] / props.row[props.columnName]) * 100)).toFixed(2)}%
            </div>
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
        <div>
            <DataTable
                title="COVID19 italia"
                columns={columns}
                //customStyles={customStyles}
                data={data}
                defaultSortField="data"
                defaultSortAsc={false}
                fixedHeader
                fixedHeaderScrollHeight="300px"
            />
            <hr />
            <span>Has error: {JSON.stringify(hasError)}</span>
        </div>
    </>;
};

export default Main;
