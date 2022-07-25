import React, { useEffect, useState, useParams} from "react";
import { Link } from "react-router-dom";
import { Card, Arrow,} from '../../components';
import { motion } from 'framer-motion';
import './Carousel.scss';
import { urlFor, client } from '../../client';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css'



const Carousel = ({title}) => {
  const [postData, setPostData] = useState([]);
  // const { slug } = useParams();

    useEffect(() => {
        client.fetch(
            `*[_type== "post"]{
          title,
          slug,
          publishedAt,
          body,
          categories[]->{
            title
          },
          mainImage{
            asset->{
              _id,
              url
             },
            alt
           },
       }`,
        )
            .then((data) => setPostData(data))
            .catch(console.error);
    }, []);

  var settings = {
   
    infinite: false,
    speed: 300,
    slidesToShow: 3,
    slidesToScroll: 1,
    nextArrow: <Arrow direction={'left'} />,
    prevArrow: <Arrow  direction={'right'} />,
    responsive: [
      {
        breakpoint: 1025,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: true,
        }
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1
        }
      },
      {
        breakpoint: 580,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
      // You can unslick at a given breakpoint now by adding:
      // settings: "unslick"
      // instead of a settings object
    ]
  };
  return (
  postData.length > 0 ? (
    <motion.div 
        whileInView={{opacity: [0,1]}}
        transition={{ duration: 2.5, ease: [0.6, 0.5, -0.1, 0.9] }}
        >
    <div className="app__carousel app__width">
      <h2 className="title">{title}</h2>
      <Slider {...settings}>
          {postData.map((post,index) => (
            <Link to={`/blog/${post.slug.current}`}>
            <Card
              key={post.slug.current + index}
              imgs={urlFor(post.mainImage)}
              title={post.title}
              date={post.publishedAt}
              description={post.body}
              tags={post.categories.map((cat) => cat.title)}
            />
            
    {/* {console.log(post.categories[1])} */}
            </Link>
          ))}
        </Slider>
    </div>
    </motion.div>
  ) : (
    <div className="app__carousel app__width" style={{
  
      padding: '1rem 5rem',
  }}>
       <SkeletonTheme baseColor="#202020" highlightColor="#444">
    <p>
        <Skeleton count={3} />
    </p>
</SkeletonTheme>
    </div>
  )
  );
}

export default Carousel