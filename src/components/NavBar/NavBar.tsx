import * as React from 'react';
import {
  Link
} from "react-router-dom";


export interface INavBarProps {
}

export interface INavBarState {
}

export default class NavBar extends React.Component<INavBarProps, INavBarState> {
  constructor(props: INavBarProps) {
    super(props);

    this.state = {
    }
  }

  public render() {
    return (
    <nav id="header" className="bg-white fixed w-full z-10 pin-t shadow">


        <div className="w-full container mx-auto flex flex-wrap items-center mt-0 pt-3 pb-3 md:pb-0">

            <div className="w-1/2 pl-2 md:pl-0">
                <a className="text-black text-base xl:text-xl no-underline hover:no-underline font-bold" href="/">
                    <i className="fas fa-sun text-orange-dark pr-3"></i> COVID19 in Italia
                </a>
            </div>
            <div className="w-1/2 pr-0">
                <div className="flex relative inline-block float-right">



                    <div className="block lg:hidden pr-4">
                        <button id="nav-toggle" className="flex items-center px-3 py-2 border rounded text-grey border-grey-dark hover:text-black hover:border-teal appearance-none focus:outline-none">
                            <svg className="fill-current h-3 w-3" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                <title>Menu</title>
                                <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
                            </svg>
                        </button>
                    </div>
                </div>

            </div>


            <div className="w-full flex-grow lg:flex lg:items-center lg:w-auto hidden lg:block mt-2 lg:mt-0 bg-white z-20" id="nav-content">
                <ul className="list-reset lg:flex flex-1 items-center px-4 md:px-0">
                    <li className="mr-6 my-2 md:my-0">
                        <Link to="/" className="block py-1 md:py-3 pl-1 align-middle text-orange-dark no-underline hover:text-black border-b-2 border-orange-dark hover:border-orange-dark">Principale</Link>
                    </li>

                    <li className="mr-6 my-2 md:my-0">
                        <Link to="/italia" className="block py-1 md:py-3 pl-1 align-middle text-orange-dark no-underline hover:text-black border-b-2 border-orange-dark hover:border-orange-dark">Italia</Link>
                    </li>

                    <li className="mr-6 my-2 md:my-0">
                        <Link to="/regioni" className="block py-1 md:py-3 pl-1 align-middle text-orange-dark no-underline hover:text-black border-b-2 border-orange-dark hover:border-orange-dark">Regioni</Link>
                    </li>

                </ul>


            </div>

        </div>
    </nav>
        );
  }
}
