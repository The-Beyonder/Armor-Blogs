import React from 'react';
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from 'react-icons/md';

const Arrow = ({direction,onClick,style}) => {
  return (
    direction==='left' ?
        <div className="arrow"> <MdKeyboardArrowRight className="navigator" onClick={onClick} /></div>
    :
    <div className="arrow"> <MdKeyboardArrowLeft className="navigator" onClick={onClick} /></div>
  )
}

export default Arrow