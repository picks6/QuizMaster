import React, { useState } from 'react'
import Creatable from 'react-select/creatable'
// import {Card } from "semantic-ui-react";
import { useQuery } from '@apollo/client';
import { GET_CATEGORIES } from '../../utils/queries';

const Category = props => {
  const { loading, error, data } = useQuery(GET_CATEGORIES);

  if (loading) return <div>Loading</div>; 
  if (error) return `Error! ${error.message}`;
  
  console.log('categories:', data.categories);
  const categories = data.categories.map(
    ({ category, _id }) => {return { label: category, value: _id}}
  );
  return (
    <Creatable
     isClearable
     isMulti
     onChange={(value) => props.handleChange(value)}
     options={categories}
     value={props.categoryValue}
    />

  )
};

export default Category;