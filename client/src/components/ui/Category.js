import React from 'react'
import Creatable from 'react-select/creatable'
// import {Card } from "semantic-ui-react";
import { useQuery } from '@apollo/client';
import { GET_CATEGORIES } from '../../utils/queries';

const Category = ({ handleChange, categoryState, placeholder }) => {
  const { loading, error, data } = useQuery(GET_CATEGORIES);

  if (loading) return <div>Loading</div>; 
  if (error) return `Error! ${error.message}`;
  if (data) {
    const categories = data.categories.map(
      ({ category, _id }) => {return { label: category, value: _id}}
    );
    return (
      <Creatable
       placeholder={placeholder} 
       isClearable
       isMulti
       onChange={(value) => handleChange( null, value)}
       options={categories}
       value={categoryState}
      />
    )
  }
};

export default Category;