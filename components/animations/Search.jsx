import LottieView from 'lottie-react-native';
import React from 'react';
import lottieSearch from '../../assets/lottie/search.json';

const SearchAnimation = () => {
  return (
    <LottieView source={lottieSearch} className="w-full h-full" autoPlay loop />
  );
};

export default SearchAnimation;
