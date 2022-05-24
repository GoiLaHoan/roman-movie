import { FC } from 'react';
import { language } from '../shared/utils';

const ChangeLanguage: FC = () => {
  const changeLanguageEn = () => {
    language('en');
    window.location.reload();
  };
  const changeLanguageVi = () => {
    language('vi');
    window.location.reload();
  };
  const lang = localStorage.getItem('lang');
  return (
    <div className="flex font-bold justify-end">
      <span
        onClick={changeLanguageEn}
        className={`cursor-pointer ${lang && JSON.parse(lang) === 'en' ? 'text-primary' : `${!lang ? 'text-primary' : ''}`}`}
      >
        en
      </span>
      <span className="mx-1.5">|</span>
      <span
        onClick={changeLanguageVi}
        className={`cursor-pointer ${lang && JSON.parse(localStorage.getItem('lang') || '') === 'vi' ? 'text-primary' : ''}`}
      >
        vi
      </span>
    </div>
  );
};

export default ChangeLanguage;
