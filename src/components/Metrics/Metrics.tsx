import * as React from 'react';

interface IMetricsProps {
  data: any[]
}

export default function Metrics(props: IMetricsProps) {

  console.log("AAA",props.data);

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
                <h5 className="uppercase text-grey">Data aggiornamento</h5>
                <h3 className="text-3xl">{new Date(props.data[idx].data).toLocaleDateString('it-IT', { weekday: 'long', month: 'long', day: 'numeric'}) } <span className="text-green"><i className="fas fa-caret-up"></i></span></h3>
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
                <h3 className="text-3xl">{props.data[idx].nuovi_attualmente_positivi} <span className="text-green"><i className="fas fa-caret-up"></i></span></h3>
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


