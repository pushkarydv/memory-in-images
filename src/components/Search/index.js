'use client';

import React, { useState } from 'react';
import ImageSearchForm from './image-search-form';
import ImagesCarousel from './images-carousel';

const Search = () => {
  const [search, setSearch] = useState({
    images: [],
    loading: false,
  });

  const handleSearchState = (id, value) => {
    setSearch((prev) => {
      return {
        ...prev,
        [id]: value,
      };
    });
  };

  return (
    <div className='w-full h-[calc(100vh-5rem)] flex flex-col justify-center items-center gap-4 p-4'>
      <ImageSearchForm search={search} handleSearchState={handleSearchState} />

      {search.loading && (
        <span className='loading loading-spinner w-20 mt-20'></span>
      )}

      {!search.loading && search.images.length > 0 && (
        <ImagesCarousel images={search.images} />
      )}
    </div>
  );
};

export default Search;
