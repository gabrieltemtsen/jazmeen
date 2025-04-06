'use client'
import React, { ChangeEvent, useState } from 'react';
import { useTokens } from '@/app/hooks/useTokens';
import { FormInput } from '../form/FormInput';
import { IoIosSearch } from "react-icons/io";
import { searchItems } from '@/app/utils/searchTokens';

const SearchInput = () => {
  const { tokens, setFilteredTokens } = useTokens();
  const [query, setQuery] = useState('');

  const handleSearch = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const searchQuery = event.target.value;
    setQuery(searchQuery);
    setFilteredTokens(searchItems(tokens, searchQuery));
  };

  return (
    <div className='rounded-2xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700'>
      <FormInput
        placeholder='Type to search'
        id='search'
        Icon={IoIosSearch}
        onChange={handleSearch}
        value={query}
        className='bg-transparent font-dmSans font-light border-none   rounded-lg text-gray-300'
      />
    </div>
  );
};

export default SearchInput;
