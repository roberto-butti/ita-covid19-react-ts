import * as React from 'react';
import { useTranslation } from 'react-i18next';

export interface ISelectRegionsProps {
  region: string
  selectRegion: any
}

export default function SelectRegions(props: ISelectRegionsProps) {
  const { t } = useTranslation();

  return (
    <>
      <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
        { t("seleziona_area_di_interesse")}:
            </label>
        <div className="inline-block relative w-64">
          <select value={props.region} onChange={props.selectRegion} className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500">
            <option value="all">{t("Italia")}</option>

            <option value="Abruzzo">Abruzzo</option>
            <option value="Basilicata">Basilicata</option>
            <option value="P.A. Bolzano">P.A. Bolzano</option>
            <option value="Calabria">Calabria</option>
            <option value="Campania">Campania</option>
            <option value="Emilia Romagna">Emilia Romagna</option>
            <option value="Friuli Venezia Giulia">Friuli Venezia Giulia</option>
            <option value="Lazio">Lazio</option>
            <option value="Liguria">Liguria</option>
            <option value="Lombardia">Lombardia</option>
            <option value="Marche">Marche</option>
            <option value="Molise">Molise</option>
            <option value="Piemonte">Piemonte</option>
            <option value="Puglia">Puglia</option>
            <option value="Sardegna">Sardegna</option>
            <option value="Sicilia">Sicilia</option>
            <option value="Toscana">Toscana</option>
            <option value="P.A. Trento">P.A. Trento</option>
            <option value="Umbria">Umbria</option>
            <option value="Valle d'Aosta">Valle d'Aosta</option>
            <option value="Veneto">Veneto</option>
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
            <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" /></svg>
          </div>
        </div>
      </div>
    </>
  );
}
