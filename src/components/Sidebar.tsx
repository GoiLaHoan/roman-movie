import { Link, useLocation } from 'react-router-dom';

import { FC, useState } from 'react';
import { auth } from '../shared/firebase';
import { resizeImage } from '../shared/constants';
import { signOut } from 'firebase/auth';
import { useStore } from '../store';

interface SidebarProps {
  sidebarActive: boolean;
  setSidebarActive: (state: boolean) => void;
}

const Sidebar: FC<SidebarProps> = ({ sidebarActive, setSidebarActive }) => {
  const location = useLocation();
  let i_html = document.getElementsByTagName('html')[0];
  const currentUser = useStore((state) => state.currentUser);
  const [isLogout, setIsLogout] = useState(false);
  const handleSignOut = () => {
    i_html.style.overflow = 'hidden';
    setIsLogout(true);
  };
  const handleCancelSignOut = () => {
    i_html.style.overflow = '';
    setIsLogout(false);
  };
  const handleClickSignout = () => {
    i_html.style.overflow = '';
    setIsLogout(false);
    signOut(auth);
  };
  return (
    <>
      <div className={`relative z-20  ${isLogout ? 'block' : 'hidden'}`} aria-labelledby="modal-title" aria-modal="true">
        <div className="fixed z-10 inset-0 bg-black bg-opacity-60 transition-opacity" onClick={handleCancelSignOut}></div>
        <div className="fixed z-10 inset-0 overflow-y-auto">
          <div className="flex items-end sm:items-center justify-center min-h-full p-4 text-center sm:p-0">
            <div className="relative bg-white rounded-lg text-left overflow-hidden shadow-xl animate-slideUp transition-all duration-500 mb-72 sm:my-8 sm:max-w-lg sm:w-full">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                    <h3 className="text-lg leading-6 font-medium text-gray-900" id="modal-title">
                      Sign Out
                    </h3>
                    <div className="mt-2">
                      <p className="text-sm text-gray-500">Are you sure you want to sign out?</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button
                  type="button"
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
                  onClick={handleClickSignout}
                >
                  Sign Out
                </button>
                <button
                  type="button"
                  className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                  onClick={handleCancelSignOut}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div
        className={`flex-shrink-0 sm:sticky left-auto right-full sm:!right-0 sm:!left-0 fixed top-0 flex flex-col items-stretch py-8 pl-5 xl:pl-8 pr-0 w-[90vw] max-w-[288px] sm:max-w-none sm:w-16 xl:w-56 border-r border-gray-800 h-screen overflow-y-auto z-10 bg-[#000000bf] sm:bg-transparent sm:!translate-x-0 transition-all duration-500 ${
          sidebarActive ? 'translate-x-full' : 'translate-x-0'
        }`}
      >
        <Link to="/" className="flex gap-2 items-center">
          <img
            style={{ marginLeft: '-16px' }}
            className="w-auto h-12 mr-16 hidden sm:hidden xl:block"
            src="/logo-roman.png"
            alt=""
          />
          <img
            style={{ marginLeft: '-12px' }}
            className="w-auto h-12 mr-16 hidden sm:block xl:hidden"
            src="/logo.png"
            alt=""
          />
        </Link>

        <div className="mt-4 sm:mt-4 xl:mt-4 sm:mt-4 block sm:flex flex-col gap-0 sm:gap-4 xl:block xl:gap-0">
          <p className="text-white-500 uppercase mt-6 mb-4 block sm:hidden xl:block">Menu</p>

          <div className="flex flex-col items-stretch gap-3">
            <Link
              to="/"
              className={`flex items-center gap-2 transition ${
                location.pathname === '/'
                  ? 'text-primary border-r-4 border-primary hover:brightness-125'
                  : 'text-gray-400 hover:text-gray-300'
              }`}
            >
              <i className="fas fa-home text-xl w-[24px]"></i>
              <p className="block sm:hidden xl:block">Home</p>
            </Link>

            <Link
              to="/discovery"
              className={`flex items-center gap-2 transition ${
                location.pathname === '/discovery'
                  ? 'text-primary border-r-4 border-primary hover:brightness-125'
                  : 'text-gray-400 hover:text-gray-300'
              }`}
            >
              <i className="fas fa-compass text-xl w-[24px]"></i>
              <p className="block sm:hidden xl:block">Discovery</p>
            </Link>

            <Link
              to="/explore"
              className={`flex items-center gap-2 transition ${
                location.pathname === '/explore'
                  ? 'text-primary border-r-4 border-primary hover:brightness-125'
                  : 'text-gray-400 hover:text-gray-300'
              }`}
            >
              <i className="fas fa-desktop text-xl w-[24px]"></i>
              <p className="block sm:hidden xl:block">Explore</p>
            </Link>

            <Link
              to="/history"
              className={`flex items-center gap-2 transition ${
                location.pathname === '/history'
                  ? 'text-primary border-r-4 border-primary hover:brightness-125'
                  : 'text-gray-400 hover:text-gray-300'
              }`}
            >
              <i className="fas fa-history text-xl w-[24px]"></i>
              <p className="block sm:hidden xl:block">History</p>
            </Link>

            <Link
              to="/search"
              className={`lg:!hidden flex items-center gap-2 transition ${
                location.pathname === '/search'
                  ? 'text-primary border-r-4 border-primary hover:brightness-125'
                  : 'text-gray-400 hover:text-gray-300'
              }`}
            >
              <i className="fas fa-search text-xl w-[24px]"></i>
              <p className="block sm:hidden xl:block">Search</p>
            </Link>
          </div>

          <p className="text-gray-400 uppercase mt-10 mb-4 block sm:hidden xl:block">Personal</p>

          {!currentUser ? (
            <Link
              to={`/sign-in?redirect=${encodeURIComponent(location.pathname)}`}
              className="flex items-center cursor-pointer gap-2 transition text-gray-400 hover:text-gray-300"
            >
              <i className="fas fa-sign-in-alt text-xl w-[24px]"></i>
              <p className="block sm:hidden xl:block">Sign In</p>
            </Link>
          ) : (
            <div className="flex flex-col items-stretch gap-3">
              <div className="flex gap-2 items-center">
                <img className="w-[24px] h-[24px] rounded-full" src={resizeImage(currentUser.photoURL, '24', '24')} alt="" />

                <p className="text-gray-400 block sm:hidden xl:block">{currentUser.displayName}</p>
              </div>
              <button
                onClick={handleSignOut}
                className="flex items-center cursor-pointer gap-2 transition text-gray-400 hover:text-gray-300"
              >
                <i className="fas fa-sign-out-alt text-xl w-[24px]"></i>
                <p className="block sm:hidden xl:block">Sign Out</p>
              </button>
            </div>
          )}
        </div>
      </div>
      <div
        onClick={() => setSidebarActive(false)}
        className={`bg-[#00000080] z-[5] fixed top-0 left-0 w-full h-full transition-all duration-500 sm:!opacity-0 ${
          sidebarActive ? 'opacity-100 visible' : 'opacity-0 invisible'
        }`}
      ></div>
    </>
  );
};

export default Sidebar;
