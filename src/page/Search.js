import React from 'react';
import Showsearchwork from '../content/Showsearchwork';

const Search = (props) => {


  return (
    <>
    
      <Showsearchwork id={props.match.params.id}/>
  
    </>
  );}


export default Search;