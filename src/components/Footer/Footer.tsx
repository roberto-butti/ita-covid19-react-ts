import * as React from 'react';
import { useTranslation } from 'react-i18next';
interface IFooterProps {
}

const Footer: React.FunctionComponent<IFooterProps> = (props) => {
  const { t } = useTranslation();

  return <>
    <footer className="bg-white border-t border-gray-400 shadow">
      <div className="container  mx-auto flex py-8">
        <div className="w-full mx-auto flex flex-wrap">
          <div className="flex w-full md:w-1/3 ">
            <div className="px-8">
              <h3 className="font-bold font-bold text-gray-900">{ t('Progetto') }</h3>
              <p className="py-4 text-gray-600 text-sm">
                { t('progetto_descrizione') }

						</p>
            </div>
          </div>
          <div className="flex w-full md:w-1/3 ">
            <div className="px-8">
              <h3 className="font-bold font-bold text-gray-900">{t('data_source')}</h3>
              <p className="py-4 text-gray-600 text-sm">
                {t('data_source_description')}

						</p>
            </div>
          </div>
          <div className="flex w-full md:w-1/3">
            <div className="px-8">
              <h3 className="font-bold font-bold text-gray-900">{t('external_url')}</h3>
              <ul className="list-reset items-center text-sm pt-3">
                <li>
                  <a className="inline-block text-gray-600 no-underline hover:text-gray-900 hover:text-underline py-1" href="https://github.com/roberto-butti/ita-covid19-react-ts">{t('sources')}</a>
                </li>
                <li>
                  <a className="inline-block text-gray-600 no-underline hover:text-gray-900 hover:text-underline py-1" href="https://github.com/pcm-dpc/COVID-19">{t('protezione_civile_data')}</a>
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
