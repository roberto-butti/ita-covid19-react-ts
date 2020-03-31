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

          <div className="bg-green-100 border-b-4 border-green-600 rounded-lg shadow-lg p-5">
            <div className="flex flex-row items-center">
              <div className="flex-shrink pr-4">
                <div className="rounded-full p-5 bg-green-600"><i className="fa fa-wallet fa-2x fa-inverse"></i></div>
              </div>
              <div className="flex-1 text-right md:text-center">
                <h5 className="font-bold uppercase text-gray-600">{props.region === "all" ? "Tutta Italia" : props.region}</h5>
                <h3 className="font-bold text-3xl">{new Date(props.data[idx].data).toLocaleDateString('it-IT', { weekday: 'long', month: 'long', day: 'numeric' })}</h3>
                <div className="text-xs">Ultimo aggiornamento</div>
              </div>
            </div>
          </div>



        </div>

        <div className="w-full md:w-1/2 xl:w-1/3 p-3">

          <div className="bg-green-100 border-b-4 border-orange-500 rounded-lg shadow-lg p-5">
            <div className="flex flex-row items-center">
              <div className="flex-shrink pr-4">
                <div className="rounded-full p-5 bg-orange-600"><i className="fa fa-wallet fa-2x fa-inverse"></i></div>
              </div>
              <div className="flex-1 text-right md:text-center">
                <h5 className="font-bold uppercase text-orange-600">Variazione del totale positivi</h5>
                <h3 className="font-bold text-3xl">{props.data[idx].variazione_totale_positivi}</h3>
                <div className="text-xs">rispetto al precedente: {props.data[idx].variazione_totale_positivi - props.data[idx - 1].variazione_totale_positivi} </div>
              </div>
            </div>
          </div>

        </div>

        <div className="w-full md:w-1/2 xl:w-1/3 p-3">

          <div className="bg-yellow-100 border-b-4 border-yellow-600 rounded-lg shadow-lg p-5">
            <div className="flex flex-row items-center">
              <div className="flex-shrink pr-4">
                <div className="rounded-full p-5 bg-yellow-600"><i className="fas fa-user-plus fa-2x fa-inverse"></i></div>
              </div>
              <div className="flex-1 text-right md:text-center">
                <h5 className="font-bold uppercase text-gray-600">Tamponi giornalieri</h5>
                <h3 className="font-bold text-3xl">{props.data[idx].tamponi - props.data[idx - 1].tamponi}</h3>
                <div className="text-xs">rispetto al precedente: {(props.data[idx].tamponi - props.data[idx - 1].tamponi) - (props.data[idx - 1].tamponi - props.data[idx - 2].tamponi)} </div>
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


