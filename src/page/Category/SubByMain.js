import React from 'react'
import Showsubbymain from '../../content/Category/Showsubbymain'
import AddSubcate from '../../content/Category/AddSubcate'

const SubByMain = (props) => {
    return (
        <>
           <AddSubcate Mid={props.match.params.id}/>
           <Showsubbymain Mid={props.match.params.id}/>
           
        </>
    )
}

export default SubByMain
