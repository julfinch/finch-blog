import React, { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import axios from 'axios'


const Home = () => {

  const [posts, setPosts] = useState([])

  const cat = useLocation().search;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`/posts/${cat}`);
        setPosts(res.data);
      } catch(err){
        console.log(err)
      }
    };
    fetchData();
  }, [cat]);
  

  // const posts = [
  //   {
  //     id: 1,
  //     title: "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
  //     desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
  //     img: "https://www.pitpat.com/wp-content/uploads/2020/07/Dog_-rights_MS_outdoors_stationary_two-dogs-sitting-on-path_white_black_gold-dog-and-gold-dog_@ilaanddrax-1.jpg"
  //   },
  //   {
  //     id: 2,
  //     title: "Lorem ipsum dolor sit amet, consectetur adipiscing elit",      
  //     desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
  //     img: "https://www.pitpat.com/wp-content/uploads/2020/07/Dog_-rights_MS_outdoors_stationary_two-dogs-sitting-on-path_white_black_gold-dog-and-gold-dog_@ilaanddrax-1.jpg"
  //   },
  //   {
  //     id: 3,
  //     title: "Lorem ipsum dolor sit amet, consectetur adipiscing elit",      
  //     desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
  //     img: "https://www.pitpat.com/wp-content/uploads/2020/07/Dog_-rights_MS_outdoors_stationary_two-dogs-sitting-on-path_white_black_gold-dog-and-gold-dog_@ilaanddrax-1.jpg"
  //   },
  //   {
  //     id: 4,
  //     title: "Lorem ipsum dolor sit amet, consectetur adipiscing elit",      
  //     desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
  //     img: "https://www.pitpat.com/wp-content/uploads/2020/07/Dog_-rights_MS_outdoors_stationary_two-dogs-sitting-on-path_white_black_gold-dog-and-gold-dog_@ilaanddrax-1.jpg"
  //   },
  // ]

  const getText = (html) => {
    const doc = new DOMParser().parseFromString(html, "text/html")
    return doc.body.textContent
  }

  return (
    <div className='home'>
      <div className="posts">
        {posts.map((post) => (
          <div className="post" key={post.id}>
            <div className="img">
              <img src={`../upload/${post.img}`} alt="" />
            </div>
            <div className="content">
              <Link className='link' to={`/post/${post.id}`}>
                <h1>{post.title}</h1>
              </Link>
              <p>{getText(post.desc)}</p>
              <button>Read More</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Home