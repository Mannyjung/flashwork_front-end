import React from 'react'
import Subcategory from '../../content/Subcate'

const Subcate = (props) => {
    return (
        <div>
              <Subcategory id={props.match.params.id} />
        </div>
    )
}

export default Subcate

