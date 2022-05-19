import { FC, useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

import Error from '../components/Error';
import HlsPlayer from 'react-hls-player';
import ImageFade from '../components/ImageFade';
import { InView } from 'react-intersection-observer';
import InfiniteScroll from 'react-infinite-scroll-component';
import Sidebar from '../components/Sidebar';
import { getDiscoveryItems } from '../services/discovery';
import { resizeImage } from '../shared/constants';
import useSWRInfinite from 'swr/infinite';
import { Player } from 'react-tuby';

const Discovery: FC = () => {
  const [sidebarActive, setSidebarActive] = useState(false);
  const [arrFavoriteVideo, setArrFavoriteVideo] = useState<any[]>([]);
  const [activeToast, setActiveToast] = useState(false);
  const getKey = (index: number) => `discovery-${index || 0}`;
  const { data, error, setSize } = useSWRInfinite(getKey, (key) => getDiscoveryItems(Number(key.split('-').slice(-1)[0])), {
    revalidateFirstPage: false,
  });
  const location = useLocation();

  useEffect(() => {
    setSidebarActive(false);
  }, [location]);

  if (error) return <Error />;

  const handleLikeVideo = (videoId) => {
    const index = arrFavoriteVideo.findIndex((item) => item.videoId === videoId);
    if (index === -1) {
      setArrFavoriteVideo((arrFavoriteVideo) => [...arrFavoriteVideo, { videoId: videoId, isLike: true }]);
    } else {
      setArrFavoriteVideo((arrFavoriteVideo) => [...arrFavoriteVideo.slice(0, index), ...arrFavoriteVideo.slice(index + 1)]);
    }
  };
  const handleClickComment = () => {
    setActiveToast(true);
  };
  useEffect(() => {
    let timer1: NodeJS.Timeout;
    if (activeToast === true) {
      timer1 = setTimeout(() => {
        setActiveToast(false);
      }, 3000);
    }

    return () => {
      clearTimeout(timer1);
    };
  }, [activeToast]);

  return (
    <>
      <div className="flex sm:hidden sticky top-0 bg-[#000000bf] justify-between px-[4vw] pt-4 pb-2 z-20 sticky z-20">
        <Link to="/" className="flex items-center gap-2">
          <img style={{ marginLeft: '-9px' }} className="w-auto h-6 mr-16" src="/logo-roman.png" alt="" />
        </Link>

        <button onClick={() => setSidebarActive(!sidebarActive)}>
          <i className="fas fa-bars text-2xl"></i>
        </button>
      </div>

      <div className="flex">
        <Sidebar sidebarActive={sidebarActive} setSidebarActive={setSidebarActive} />

        <div className="flex-grow py-10 px-[4vw]">
          <div
            className={`fixed flex z-50 items-center w-full max-w-xs p-4 top-5 right-5 text-gray-500 bg-white rounded-lg shadow 
            ${activeToast ? '' : 'hidden'}`}
          >
            <div className="inline-flex items-center justify-center flex-shrink-0 w-8 h-8 text-black bg-primary rounded-lg">
              <i className="fas fa-lock"></i>
            </div>
            <div className="ml-3 text-sm font-normal ">Comments are locked</div>
            <button
              type="button"
              className="ml-auto -mx-1.5 -my-1.5 bg-white text-gray-400 hover:text-gray-900 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 hover:bg-gray-100 inline-flex h-8 w-8 dark:text-gray-500 dark:hover:text-white dark:bg-gray-800 dark:hover:bg-gray-700"
              aria-label="Close"
              onClick={() => setActiveToast(false)}
            >
              <span className="sr-only">Close</span>
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path
                  fillRule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clipRule="evenodd"
                ></path>
              </svg>
            </button>
          </div>

          {!data && (
            <div className="h-screen w-full flex justify-center items-center">
              <div className="w-10 h-10 border-[3px] border-t-transparent border-primary rounded-full animate-spin"></div>
            </div>
          )}
          <InfiniteScroll
            dataLength={data?.length || 0}
            next={() => setSize((prev) => prev + 1)}
            hasMore={!error && data?.slice(-1)?.[0]?.length !== 0}
            loader={<></>}
          >
            <div className="flex flex-col items-center w-full gap-24">
              {data
                ?.reduce((acc, current) => [...acc, ...current], [])
                .map((item) => (
                  <div key={item.id} className="w-full max-w-[600px] flex gap-2">
                    <ImageFade
                      className="w-12 h-12 rounded-full flex-shrink-0 bg-gray-500"
                      src={resizeImage(item.upInfo.upImgUrl)}
                      alt=""
                    />

                    <div className="flex flex-col items-stretch flex-grow gap-3">
                      <p className="font-semibold text-primary">{item.refList[0]?.name || item.name}</p>

                      <p className="text-sm">{item.introduction}</p>

                      <InView threshold={0.5}>
                        {({ ref, inView }) => (
                          <div ref={ref} className="relative w-full">
                            <Player primaryColor="#0D90F3" src={item.mediaUrl} dimensions={100}>
                              {(ref, props) => (
                                <HlsPlayer
                                  playerRef={ref}
                                  {...props}
                                  src={item.mediaUrl}
                                  playsInline
                                  muted
                                  autoPlay={inView}
                                />
                              )}
                            </Player>
                          </div>
                        )}
                      </InView>
                    </div>

                    <div className="hidden flex flex-col items-center justify-center w-20 gap-5 sm:pt-48 sm:block">
                      <div className="flex flex-col items-center gap-2">
                        <button
                          className="bg-dark-lighten rounded-full h-10 w-10 flex justify-center items-center"
                          onClick={() => handleLikeVideo(item.id)}
                        >
                          <i
                            className={`fas fa-heart ${
                              arrFavoriteVideo.map((item) => item.videoId).includes(item.id) ? 'text-red-500' : ''
                            }`}
                          ></i>
                        </button>
                        <span>
                          {arrFavoriteVideo.map((item) => item.videoId).includes(item.id)
                            ? item.likeCount + 1
                            : item.likeCount}
                        </span>
                      </div>

                      <div className="flex flex-col items-center gap-2">
                        <button
                          className="bg-dark-lighten rounded-full h-10 w-10 flex justify-center items-center"
                          onClick={handleClickComment}
                        >
                          <i className="fas fa-comment-dots"></i>
                        </button>
                        <span>{item.id}</span>
                      </div>

                      {item?.refList?.[0]?.id && (
                        <div className="flex flex-col items-center gap-2">
                          <Link
                            to={
                              item.refList[0].category === 0 ? `/movie/${item.refList[0].id}` : `/tv/${item.refList[0].id}`
                            }
                            target="_blank"
                            className="bg-dark-lighten rounded-full h-10 w-10 flex justify-center items-center"
                          >
                            <i className="fas fa-external-link-alt"></i>
                          </Link>
                          <span>Open</span>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
            </div>
          </InfiniteScroll>
        </div>
      </div>
    </>
  );
};

export default Discovery;
