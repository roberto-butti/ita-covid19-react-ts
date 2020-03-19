import * as React from 'react';

export interface ILoadingProps {
}

export interface ILoadingState {
}

export default class Loading extends React.Component<ILoadingProps, ILoadingState> {
  constructor(props: ILoadingProps) {
    super(props);

    this.state = {
    }
  }

  public render() {
    return (
      <div>
        
      </div>
    );
  }
}
