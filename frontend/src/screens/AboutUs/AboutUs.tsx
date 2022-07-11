/* eslint-disable import/no-unresolved */
import React from 'react';
import { Box, Divider } from '@mui/material/';
import { v4 as uuidv4 } from 'uuid';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper';
import { useTranslation } from 'react-i18next';
import { infoAboutDeveloper } from 'utils/infoAboutDeveloper';
import AboutThisResource from 'components/AboutThisResource/AboutThisResource';
import AboutDeveloperCard from 'components/AboutDeveloperCard/AboutDeveloperCard';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

const AboutUs = () => {
  const { t } = useTranslation();

  return (
    <Box>
      <AboutThisResource />
      <Divider>{t('common.developmentTeam')}</Divider>
      <Swiper
        loop
        navigation
        style={{ marginBottom: '50px' }}
        centeredSlides
        initialSlide={3}
        pagination={{ clickable: true }}
        slidesPerView={6}
        modules={[Pagination, Navigation]}
      >
        {infoAboutDeveloper &&
          infoAboutDeveloper.map(el => (
            <SwiperSlide key={uuidv4()}>
              <AboutDeveloperCard
                photo={el.photo}
                fullName={el.fullName}
                linkedIn={el.linkedIn}
                gitHub={el.gitHub}
              />
            </SwiperSlide>
          ))}
      </Swiper>
    </Box>
  );
};

export default AboutUs;
