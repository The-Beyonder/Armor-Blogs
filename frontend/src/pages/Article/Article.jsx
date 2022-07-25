import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { urlFor, client } from '../../client';
import BlockContent from '@sanity/block-content-to-react';
import './Article.scss';
import {AiOutlineLike, AiFillLike} from 'react-icons/ai';
import { useForm } from 'react-hook-form';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import PortableText from 'react-portable-text';

const Article = () => {
  const [submit, setSubmit] = useState(false);
  const { register, handleSubmit, watch, formState: { errors } } = useForm();
  const onSubmit = async (data) => {

    const commentForm = {
      _type: 'comment',
      post: {
        _type: 'reference',
        _ref: singlePost._id
      },
      name: data.name,
      comment: data.comment,
    };
    console.log(commentForm);

    client.create(commentForm)
      .then(() => {
        console.log('Comment created');
        setSubmit(true);
      })
      .catch((err) => {
        console.log("not created", err);
        setSubmit(false);
      });
  };


  const [singlePost, setSinglePost] = useState([]);
  const [loading, setLoading] = useState(true);
  const { slug } = useParams();
  useEffect(() => {

    client.fetch(
      `*[slug.current == "${slug}"]
      {
        _id,
        title,
        body,
        likes,
        "comments": *[_type == 'comment' && post._ref == ^._id && approved==true],
        mainImage{
          asset->{
            _id,
            url
          },
          alt
        },
        publishedAt,
        author->{
          name,
          image{
            asset->{
              url
            }
          },
        }
      }`)
      .then((data) => (setSinglePost(data[0])))
      .catch((err) => console.log(err))
    setLoading(false)
  }, []);

  const [liked, setLiked] = useState(false);


  const id = singlePost._id;
 
 
  const likeIncrement = () => {
    client.patch(id).inc({likes: 1}).commit().then(console.log('liked')).catch(console.log('not liked'));
    setLiked(true);
  }
  const likeDecrement = () => {
    client.patch(id).dec({likes: 1}).commit().then(console.log('liked')).catch(console.log('not liked'));
    setLiked(false);
  }
  console.log('Body:',singlePost.body);

  return (
    <>
      {loading ? (<div className="app__carousel app__width" style={{
        // lineHeight: '2',
        padding: '1rem 5rem',
      }}>
        <SkeletonTheme baseColor="#202020" highlightColor="#444">
          <p>
            <Skeleton style={{
               
                marginBottom: '0.5rem',

            }} height={500} count={1} />
            <Skeleton   count={6} />
          </p>
        </SkeletonTheme>
      </div>) :
        <section className='app__articles'>
          <div className="app__articles-img">
            {singlePost.mainImage && <img src={urlFor(singlePost.mainImage.asset._id).url()} alt={singlePost.title} />}
          </div>
          <div className="app__articles-content">
            <div className="app__articles-head">
              <h1 className='app__articles-title'>{singlePost.title}</h1>
              <p className='date'>{singlePost.publishedAt}</p>
            </div>
            <div className="app__articles-body">
              <BlockContent 
              dataset={process.env.REACT_APP_PROJECT_DATASET}
              projectId={process.env.REACT_APP_PROJECT_ID}
              blocks={singlePost.body} 
              imageOptions={{w: 570, h: 500, fit: 'max'}}
                />
            </div>
          </div>

          <div className="app__articles-author">
            <p>By</p>
            {singlePost.author ? <img src={singlePost.author.image.asset.url} className="avatar" alt={singlePost.author.name} /> : null}
            {singlePost.author && <p>{singlePost.author.name}</p>}
          </div>

          <div className="app__articles-likes">
            <p> {singlePost.likes} Likes </p>
            {liked? <AiFillLike className="like"  onClick={likeDecrement} /> : <AiOutlineLike className="like" onClick={likeIncrement} />}
          </div>
          <hr />
          <h2>Share your thoughts with us!</h2>
          {submit ?
            <div className="app__article-success">
              <h3>Thankyou for your comment!</h3>
              <p>Your comment will appear below once it has been approved by the moderators</p>
            </div>
            : <form className='app__articles-comments' onSubmit={handleSubmit(onSubmit)}>
              <input type="text" name='name' className='input' placeholder='Anonymous' defaultValue='Anonymous' {...register("name")} />
              <textarea name="comment" rows="8" className='input' placeholder='Great Blog!' {...register("comment", { required: true })} />
              {/* errors div */}
              <div>
                {errors.comment && <p className='error'>Please give your feedback!🥺</p>}
              </div>
              <input type="submit" className='button' />
            </form>}
          <hr />
          {singlePost.comments ?
            <div className="box">
              {/* show number of comments */}

              <h3>Comments</h3>
              {singlePost.comments.map((comment) => (
                <div className="app__articles-comment " key={comment._id}>
                  <p className='name'>{comment.name}</p>
                  <p className='msg'>{comment.comment}</p>
                </div>
              ))}
            </div> :
            null}
        </section>
      }
    </>
  )
}

export default Article