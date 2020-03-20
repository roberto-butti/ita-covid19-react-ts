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
        <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                Sesleziona l'area di interesse:
      </label>
            <div className="relative">



                <select value={region} onChange={selectRegion} className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500">
                    <option value="all">Tutta Italia</option>
                    <option value="Lombardia">Lombardia</option>
                    <option value="Veneto">Veneto</option>
                    <option value="Lazio">Lazio</option>
                </select>
            </div>
        </div>
            <Table
                data={data}
            />
            <hr />
            <span>Has error: {JSON.stringify(hasError)}</span>
        
    </>;
};

export default Main;
