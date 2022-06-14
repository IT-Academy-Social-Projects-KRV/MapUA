// Import Swiper React components
/* eslint-disable import/no-unresolved */
// eslint-disable-next-line import/extensions
import { Swiper, SwiperSlide } from 'swiper/react';
import { CardMedia } from '@mui/material';
import React from 'react';
import { Navigation, Pagination } from 'swiper';
import './styles.css';

// Import Swiper styles
// eslint-disable-next-line import/extensions
import 'swiper/css';
// eslint-disable-next-line import/extensions
import 'swiper/css/navigation';
// eslint-disable-next-line import/extensions
import 'swiper/css/pagination';
// eslint-disable-next-line import/extensions
import 'swiper/css/scrollbar';
// import { CardMediaCarousel } from 'components/design/StyledProfile copy';

type Props = {
  arrayPhotos: string[];
  locationName: string;
};

export default ({ arrayPhotos, locationName }: Props) => (
  <Swiper
    loop
    navigation
    centeredSlides
    pagination={{ clickable: true }}
    slidesPerView={1}
    spaceBetween={20}
    // onSlideChange={() => console.log('slide change')}
    // onSwiper={swiper => console.log(swiper)}
    modules={[Pagination, Navigation]}
  >
    {arrayPhotos.map(photo => (
      <SwiperSlide key={photo}>
        <CardMedia
          style={{
            maxHeight: '400px',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            border: '2px solid #bfbfbf'
          }}
          component="img"
          image={photo}
          alt={locationName}
        />
        {/* <CardMediaCarousel component="img" image={photo} alt={locationName} /> */}
      </SwiperSlide>
    ))}
    {/* {arrayPhotos.map((photo, index) => (
      // eslint-disable-next-line react/no-array-index-key
      <SwiperSlide key={index}>
        <CardMedia
          sx={{ p: 2 }}
          component="img"
          image={photo}
          alt={locationName}
        />
      </SwiperSlide>
    ))} */}
  </Swiper>
);
