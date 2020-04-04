import * as React from 'react';

interface IFooterProps {
}

const Footer: React.FunctionComponent<IFooterProps> = (props) => {
  return <>
    <footer className="bg-white border-t border-gray-400 shadow">
      <div className="container  mx-auto flex py-8">
        <div className="w-full mx-auto flex flex-wrap">
          <div className="flex w-full md:w-1/3 ">
            <div className="px-8">
              <h3 className="font-bold font-bold text-gray-900">Progetto</h3>
              <p className="py-4 text-gray-600 text-sm">
                Side project per l'analisi di dati relativi alla diffusione di Corona Virus sul territorio Italiano.
						</p>
            </div>
          </div>
          <div className="flex w-full md:w-1/3 ">
            <div className="px-8">
              <h3 className="font-bold font-bold text-gray-900">Fonte Dati</h3>
              <p className="py-4 text-gray-600 text-sm">
                La fonte dati utilizzata è <a href="https://github.com/pcm-dpc/COVID-19">https://github.com/pcm-dpc/COVID-19</a> resa disponibile e aggiornata quotidianamente dal Dipartimento di Protezione Civile.
						</p>
            </div>
          </div>
          <div className="flex w-full md:w-1/3">
            <div className="px-8">
              <h3 className="font-bold font-bold text-gray-900">Social</h3>
              <ul className="list-reset items-center text-sm pt-3">
                <li>
                  <a className="inline-block text-gray-600 no-underline hover:text-gray-900 hover:text-underline py-1" href="https://github.com/roberto-butti/ita-covid19-react-ts">Sorgenti React/Typescript</a>
                </li>
                <li>
                  <a className="inline-block text-gray-600 no-underline hover:text-gray-900 hover:text-underline py-1" href="https://github.com/pcm-dpc/COVID-19">Dati Protezione Civile</a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </footer>
  </>;
};

export default Footer;
