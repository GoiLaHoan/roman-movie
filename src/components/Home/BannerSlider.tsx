import { FC } from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { Link } from 'react-router-dom';
import { Navigation, Pagination } from 'swiper';
import { resizeImage } from '../../shared/constants';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Autoplay } from 'swiper';
import 'swiper/css';
import 'swiper/css/pagination';
interface SliderProps {
  images: {
    title: string;
    image: string;
    link: string;
  }[];
}
const BannerSlider: FC<SliderProps> = ({ images }) => {
  SwiperCore.use([Autoplay]);
  return (
    <Swiper
      className="rounded-2xl overflow-hidden"
      modules={[Navigation, Pagination]}
      navigation
      pagination={{
        dynamicBullets: true,
      }}
      loop
      autoplay={{ delay: 1750 }}
      slidesPerView={1}
    >
      {images.map((item) => (
        <SwiperSlide key={item.image}>
          <Link to={item.link}>
            <div className="w-full h-0 pb-[60%] relative">
              <LazyLoadImage
                className="absolute top-0 left-0 w-full h-full object-contain opacity-75"
                src={resizeImage(item.image, '900')}
                alt=""
                effect="opacity"
              />
            </div>
          </Link>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default BannerSlider;
