import React, { useState, useEffect } from 'react';

import Table from "../../components/Table/Table";

interface IMainProps {
}

const Main: React.FunctionComponent<IMainProps> = (props) => {
    const [hasError, setErrors] = useState(false)
    const [data, setData] = useState<[]>([])
    const [region, setRegion] = useState("all")

    async function fetchData(region: string) {
        let url = "https://raw.githubusercontent.com/pcm-dpc/COVID-19/master/dati-json/dpc-covid19-ita-andamento-nazionale.json";
        if (region !== "all") {
            url = "https://raw.githubusercontent.com/pcm-dpc/COVID-19/master/dati-json/dpc-covid19-ita-regioni.json";
        }

        const res = await fetch(url);
        res
            .json()
            .then((res) => {
                console.log(res)
                if (region !== "all") {
                    res = res.filter((d: any) => d.denominazione_regione === region)
                }
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
        fetchData(region);
    }, [region]);

    function selectRegion(event: any) {
        setRegion(event.target.value)
        //fetchData(region);
    };


    return <>
        <div> Seleziona l'area di interesse:
            <select value={region} onChange={selectRegion}>
                <option value="all">Tutta Italia</option>
                <option value="Lombardia">Lombardia</option>
                <option value="Veneto">Veneto</option>
                <option value="Lazio">Lazio</option>
            </select>
            <Table
                data={data}
            />
            <hr />
            <span>Has error: {JSON.stringify(hasError)}</span>
        </div>
    </>;
};

export default Main;
