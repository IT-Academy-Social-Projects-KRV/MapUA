/* eslint-disable import/no-unresolved */
import { Swiper, SwiperSlide } from 'swiper/react';
import { CardMedia } from '@mui/material';
import React from 'react';
import { Navigation, Pagination } from 'swiper';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import { v4 } from 'uuid';

type Props = {
  arrayPhotos: string[];
  locationName: string;
};

export default ({ arrayPhotos, locationName }: Props) => (
  <Swiper
    loop
    navigation
    style={{ marginBottom: '30px' }}
    centeredSlides
    pagination={{ clickable: true }}
    slidesPerView={1}
    spaceBetween={20}
    modules={[Pagination, Navigation]}
  >
    {arrayPhotos.map(photo => (
      <SwiperSlide style={{ margin: 'auto' }} key={v4()}>
        <CardMedia
          sx={{
            maxHeight: '400px',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            border: '2px solid #bfbfbf'
          }}
          component="img"
          image={photo}
          alt={locationName}
        />
      </SwiperSlide>
    ))}
  </Swiper>
);
