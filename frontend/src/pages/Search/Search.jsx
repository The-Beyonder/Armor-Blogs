import React, { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import { Card } from '../../components';
import { motion } from 'framer-motion';
import { urlFor, client } from '../../client';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css'
import { searchQuery } from "../../context/Search";
import './Search.scss';



const Search = ({ title }) => {
  const [postData, setPostData] = useState([]);
  const query = useContext(searchQuery);
  const [isOpen, setIsOpen] = useState(true);
  // fetch data function
  const fetchData = async () => {
    try {
      let sQuery = '*[_type== "post"';
      if (query.value !== '') {
        sQuery += ` && title match "*${query.value}*"]`;
      }
      const results = await client.fetch(sQuery);
      setPostData(results);
    }
    catch (err) {
      console.log("Error: ", err);
    }
  }
  const handleClick = () => {
    setIsOpen(false);
  }

  useEffect(() => {
    fetchData();
   setIsOpen(true);
  }
    , [query.value]);


  console.log(isOpen);

  if (query.value ==='') {
    return false
  }
  if(isOpen){
  return (

    postData.length > 0 ? (
      <motion.div>
        <div className="app__search app__width">
          <h2 className="title">{title}</h2>
          {postData.map((post, index) => (
            <Link to={`/blog/${post.slug.current}`} >
              <Card
                key={post.slug.current + index}
                imgs={urlFor(post.mainImage)}
                title={post.title}
                date={post.publishedAt}
                description={post.body}
                tags={post.categories.map((cat) => cat.title)}
                onClick={handleClick}
              />
            </Link>
          ))}
        </div>
      </motion.div>
    ) : (
      <div className="app__search app__width" style={{
        padding: '1rem 5rem',
      }}>
        <p>Probably No results for your query</p>
        <SkeletonTheme baseColor="#202020" highlightColor="#444">
          <Skeleton count={3} />
        </SkeletonTheme>
        <br/>
        <p className="p-text">Hint: Try Searching for the exact value!</p>
      </div>
    )
  );}
}

export default Search