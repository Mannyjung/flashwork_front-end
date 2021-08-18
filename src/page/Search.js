import React from 'react';
import Showsearchwork from '../content/Showsearchwork';

const Search = (props) => {
  if (localStorage.getItem('User_id') == null) {

      
    window.location.assign("/login2")


}
else {
  return (
    <>
    
      <Showsearchwork id={props.match.params.id}/>
  
    </>
  );}
};

export default Search;