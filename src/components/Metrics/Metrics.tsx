import * as React from 'react';

interface IMetricsProps {
  region: string
  data: any[]
}

export default function Metrics(props: IMetricsProps) {

  //console.log("AAA",props.data);

  if (props.data.length > 0) {
    let idx = props.data.length -1;
    return (
      <div className="flex flex-wrap">
        <div className="w-full md:w-1/2 xl:w-1/3 p-3">
          <div className="bg-white border rounded shadow p-2">
            <div className="flex flex-row items-center">
              <div className="flex-shrink pr-4">
                <div className="rounded p-3 bg-green-dark"><i className="fa fa-wallet fa-2x fa-fw fa-inverse"></i></div>
              </div>
              <div className="flex-1 text-right md:text-center">
                <h5 className="uppercase text-grey">{props.region === "all" ? "Tutta Italia" : props.region}</h5>
                <h3 className="text-3xl">{new Date(props.data[idx].data).toLocaleDateString('it-IT', { weekday: 'long', month: 'long', day: 'numeric'}) } </h3>
                <div>Ultimo aggiornamento</div>
              </div>
            </div>
          </div>
        </div>

        <div className="w-full md:w-1/2 xl:w-1/3 p-3">
          <div className="bg-white border rounded shadow p-2">
            <div className="flex flex-row items-center">
              <div className="flex-shrink pr-4">
                <div className="rounded p-3 bg-orange-dark"><i className="fa fa-wallet fa-2x fa-fw fa-inverse"></i></div>
              </div>
              <div className="flex-1 text-right md:text-center">
                <h5 className="uppercase text-orange">nuovi_attualmente_positivi</h5>
                <h3 className="text-3xl">{props.data[idx].nuovi_attualmente_positivi} </h3>
                <div className="text-xs">rispetto al precedente: {props.data[idx].nuovi_attualmente_positivi - props.data[idx- 1].nuovi_attualmente_positivi } </div>
              </div>
            </div>
          </div>
        </div>

        <div className="w-full md:w-1/2 xl:w-1/3 p-3">
          <div className="bg-white border rounded shadow p-2">
            <div className="flex flex-row items-center">
              <div className="flex-shrink pr-4">
                <div className="rounded p-3 bg-green-dark"><i className="fa fa-wallet fa-2x fa-fw fa-inverse"></i></div>
              </div>
              <div className="flex-1 text-right md:text-center">
                <h5 className="uppercase text-grey">Tamponi giornalieri</h5>
                <h3 className="text-3xl">{props.data[idx].tamponi - props.data[idx-1].tamponi} </h3>
                <div className="text-xs">rispetto al precedente: {(props.data[idx].tamponi - props.data[idx - 1].tamponi) - (props.data[idx-1].tamponi - props.data[idx - 2].tamponi)} </div>
              </div>
            </div>
          </div>
        </div>


      </div>
    );
  } else {
    return (<div>Loading Data</div>);
  }

};


