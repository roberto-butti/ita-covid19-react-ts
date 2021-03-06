import React, { useState,  useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Link,
  useLocation,
} from "react-router-dom";
export interface INavBarProps {
}
declare global {
  interface Window {
    gtag: any;
  }
}


export default function NavBar(props: INavBarProps) {

  const [menuMobileOpen, setMenuMobileOpen] = useState(false)
  let location = useLocation();
  let gtag = (window as any).gtag;
  useEffect(() => {
    if (gtag) {
      //console.log("GA", location.pathname,  gtag);

      gtag('config', process.env.REACT_APP_GA_ID,
        {
          //'page_title': 'Your custom title',
          'page_path': location.pathname
        });

    } else {
      //console.log("change location without GA")
    }

  }, [gtag, location.pathname]);
  interface ILinks {
    url: string
    label: string
  }
  const { t } = useTranslation();

  const links = [
    {
      url: "/",
      label: t('Dashboard') ,
      color:"orange",
      icon:"home",
    },
    {
      url: "/tabelle",
      label: t('Tabelle'),
      color: "blue",
      icon:"table"
    },
    {
      url: "/grafici",
      label: t('Grafici'),
      color: "red",
      icon:"chart-line"
    },
    {
      url: "/mappa",
      label: t('Mappa'),
      color: "green",
      icon:"globe"
    },




  ]

  return (
    <nav id="header" className="bg-white fixed w-full z-10 pin-t shadow">


      <div className="w-full container mx-auto flex flex-wrap items-center mt-0 pt-3 pb-3 md:pb-0">

        <div className="w-1/2 pl-2 md:pl-0">
          <a className="text-black text-base xl:text-xl no-underline hover:no-underline font-bold" href="/">
            {t('title')}

                    </a>
        </div>
        <div className="w-1/2 pr-0">
          <div className="flex relative inline-block float-right">



            <div className="block lg:hidden pr-4">
              <button onClick={() => setMenuMobileOpen(!menuMobileOpen)} id="nav-toggle" className="flex items-center px-3 py-2 border rounded text-grey-700 border-grey-dark hover:text-black hover:border-teal appearance-none focus:outline-none">
                <svg className="fill-current h-3 w-3" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <title>Menu</title>
                  <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
                </svg>
              </button>
              {menuMobileOpen &&
                <ul className="list-reset lg:flex flex-1 items-center px-4 md:px-0">
                  {links.map((el, i) =>
                    <li key={el.url} className="mr-6 my-2 md:my-0">
                      <Link to={el.url} className={`block py-1 md:py-3 pl-1 align-middle  no-underline hover:text-gray-900 border-b-2 border-${el.color}-600 hover:border-${el.color}-600`}>
                        <i className={`fas fa-${el.icon} fa-fw mr-3 text-${el.color}-600`}></i><span className="pb-1 md:pb-0 text-sm">{el.label}</span>
                      </Link>
                    </li>
                  )}

                </ul>
              }

            </div>
          </div>

        </div>


        <div className="w-full flex-grow lg:flex lg:items-center lg:w-auto hidden lg:block mt-2 lg:mt-0 bg-white z-20" id="nav-content">
          <ul className="list-reset lg:flex flex-1 items-center px-4 md:px-0">
            {links.map((el, i) =>
              <li key={el.url} className="mr-6 my-2 md:my-0">
                <Link to={el.url} className={`block py-1 md:py-3 pl-1 align-middle  no-underline hover:text-gray-900 border-b-2 border-${el.color}-600 hover:border-${el.color}-600`}>
                  <i className={`fas fa-${el.icon} fa-fw mr-3 text-${el.color}-600`}></i><span className="pb-1 md:pb-0 text-sm">{el.label}</span>
                </Link>
              </li>
            )}

          </ul>


        </div>

      </div>
    </nav>
  );
}
