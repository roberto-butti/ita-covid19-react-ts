import * as React from 'react';

interface IMetricItemProps {
  title: string,
  value: string,
  line1: string,
  line2: string,
  line3: string,
  color: string,
  icon: string
}

export default function MetricDataItem(props: IMetricItemProps) {
    return (
      <div className={`bg-${props.color}-100 border-b-4 border-${props.color}-600 rounded-lg shadow-lg p-5`}>
        <div className="flex flex-row items-center">
          <div className="flex-shrink pr-4">
            <div className={`rounded-full p-5 bg-${props.color}-600`}><i className={`fa fa-${props.icon} fa-2x fa-inverse`}></i></div>
          </div>
          <div className="flex-1 text-right md:text-center">
            <h5 className="font-bold uppercase text-gray-900">{props.title}</h5>
            <h3 className="font-bold text-3xl">{props.value}</h3>
            <div className="text-xs">{ props.line1}</div>
            <div className="text-xs">{props.line2}</div>
            <div className="text-xs">{props.line3}</div>
          </div>
        </div>
      </div>
    );
};
