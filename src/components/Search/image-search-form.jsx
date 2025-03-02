'use client';

import React from 'react';
import { View } from 'lucide-react';
import { toast } from 'sonner';
import axios from 'axios';

const ImageSearchForm = ({ search, handleSearchState }) => {
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    handleSearchState('loading', true);
    try {
      const formData = new FormData(e.target);
      const query = formData.get('search-input');

      if (query.trim() == '') {
        toast.error('Please provide search query');
        return;
      }

      const res = await axios.post('/api/search', { query });
      const results = res.data.results;
      if (results.length > 0) {
        handleSearchState('images', results);
      }
      
    } catch (err) {
      toast.error('Something went wrong');
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
          autoComplete='off'
        />
      </label>
      <button className='btn join-item' type='submit' disabled={search.loading}>
        Search
      </button>
    </form>
  );
};

export default ImageSearchForm;
