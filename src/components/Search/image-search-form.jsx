'use client';

import React from 'react';
import { View } from 'lucide-react';
import { toast } from 'sonner';

const ImageSearchForm = ({ search, handleSearchState }) => {
  const handleFormSubmit = (e) => {
    e.preventDefault();
    handleSearchState('loading', true);
    try {
      const formData = new FormData(e.target);
      const query = formData.get('search-input');

      if (query.trim() == '') {
        toast.error('Please provide search query');
        return;
      }
    } catch (err) {
    } finally {
      handleSearchState('loading', false);
    }
  };

  return (
    <form onSubmit={handleFormSubmit} className='join'>
      <label className='input join-item lg:w-sm'>
        <View />
        <input
          name='search-input'
          type='search'
          required
          placeholder='Search'
          disabled={search.loading}
        />
      </label>
      <button className='btn join-item' type='submit' disabled={search.loading}>
        Search
      </button>
    </form>
  );
};

export default ImageSearchForm;
