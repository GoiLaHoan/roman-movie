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
  console.log(JSON.parse(localStorage.getItem('lang') || '') === 'en');
  return (
    <div className="flex font-bold justify-end">
      <span
        onClick={changeLanguageEn}
        className={`cursor-pointer ${JSON.parse(localStorage.getItem('lang') || '') === 'en' ? 'text-primary' : ''}`}
      >
        en
      </span>
      <span className="mx-1.5">|</span>
      <span
        onClick={changeLanguageVi}
        className={`cursor-pointer ${JSON.parse(localStorage.getItem('lang') || '') === 'vi' ? 'text-primary' : ''}`}
      >
        vi
      </span>
    </div>
  );
};

export default ChangeLanguage;
