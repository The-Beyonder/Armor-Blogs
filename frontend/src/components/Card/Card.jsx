import React from 'react';
import BlockContent from '@sanity/block-content-to-react'
import './Card.scss';

const Card = ({ imgs, title, date, description, tags, onClick }) => {
  return (
    <div className="app__card" onClick={onClick}>
      <div className="app__card-img">
        <img src={imgs} alt="img" />
      </div>
      <div className="app__card-content">
        <div className="app__card-title">
          <h3 className='h-text'>{title}</h3>
          <p className='date'>{date}</p>
        </div>
        <div className="app__card-text">
          <p className='p-text truncated'>
          <BlockContent 
           dataset={process.env.REACT_APP_PROJECT_DATASET}
           projectId={process.env.REACT_APP_PROJECT_ID}
          blocks={description} 
          imageOptions={{w: 100, h: 500, fit: 'min'}}
          />
          </p>
          <div className="app__tags">
            {tags.map((tag, index) => (
          <p key={index} className="tags app__div ">{tag}</p>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Card