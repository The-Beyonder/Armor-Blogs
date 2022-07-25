
// CAN be used in future to display all posts
// import React, { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import { urlFor, client } from '../../client';
// // import BlockContent from "@sanity/block-content-to-react";

// export default function AllPost() {
//     const [postData, setPostData] = useState([]);
//     const { slug } = useParams();

//     useEffect(() => {
//         client.fetch(
//             `*[_type== "post"]{
//           title,
//           slug,
//           mainImage{
//             asset->{
//               _id,
//               url
//              },
//             alt
//            },
//        }`,
//         )
//             .then((data) => setPostData(data))
//             .catch(console.error);
//     }, [slug]);

//     if (!postData) return <div>Loading...</div>;

//     return (
//         <div>
//             {postData.map((post) => (
//                 <article key={post.slug.current}>
//                     <img src={urlFor(post.mainImage)} alt={post.title} />
//                     <div>
//                         <h2>{post.title}</h2>
//                         <p>{post.Blog}</p>
//                     </div>
                    
//                 </article>
//             ))}

//         </div>
//     );
// }