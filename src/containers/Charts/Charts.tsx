import React, { useState, useEffect } from 'react';
import Chart from "../../components/Chart/Chart";

import SelectRegions from "../../components/Select/Regions";


export interface IChartsProps {
}

export default function Charts (props: IChartsProps) {
    const [hasError, setErrors] = useState(false)
    const [data, setData] = useState<[]>([])
    const [region, setRegion] = useState("all")

    async function fetchData(region: string) {
        let url = "https://raw.githubusercontent.com/pcm-dpc/COVID-19/master/dati-json/dpc-covid19-ita-andamento-nazionale.json";
        if (region !== "all") {
            url = "https://raw.githubusercontent.com/pcm-dpc/COVID-19/master/dati-json/dpc-covid19-ita-regioni.json";
        }

        const res = await fetch(url,
            {
                cache: "default"
            }
            );
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
        <SelectRegions region={region} selectRegion={selectRegion}></SelectRegions>
        <Chart data={data} region={region} />
        <hr />
        {hasError &&
            <div className="bg-orange-100 border-l-4 border-red-500 text-red-700 p-4" role="alert">
                <p className="font-bold">Ooops</p>
                <p>C'è stato un piccolo errore nel recupero dei dati aggiornati. Per favore riprova più tardi. Grazie!</p>
            </div>
        }
    </>;
}
