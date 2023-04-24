import React, { useState, useEffect } from 'react'
import axios from 'axios'

const Menu = ({cat}) => {

  const [posts, setPosts] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`/posts/?cat=${cat}`)
        setPosts(res.data);
      } catch (err) {
        console.log(err)
      }
    }
    fetchData()
  }, [cat])
  



    // const posts = [
    //     {
    //       id: 1,
    //       title: "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
    //       desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    //       img: "https://www.pitpat.com/wp-content/uploads/2020/07/Dog_-rights_MS_outdoors_stationary_two-dogs-sitting-on-path_white_black_gold-dog-and-gold-dog_@ilaanddrax-1.jpg"
    //     },
    //     {
    //       id: 2,
    //       title: "Lorem ipsum dolor sit amet, consectetur adipiscing elit",      
    //       desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    //       img: "https://www.pitpat.com/wp-content/uploads/2020/07/Dog_-rights_MS_outdoors_stationary_two-dogs-sitting-on-path_white_black_gold-dog-and-gold-dog_@ilaanddrax-1.jpg"
    //     },
    //     {
    //       id: 3,
    //       title: "Lorem ipsum dolor sit amet, consectetur adipiscing elit",      
    //       desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    //       img: "https://www.pitpat.com/wp-content/uploads/2020/07/Dog_-rights_MS_outdoors_stationary_two-dogs-sitting-on-path_white_black_gold-dog-and-gold-dog_@ilaanddrax-1.jpg"
    //     },
    //     {
    //       id: 4,
    //       title: "Lorem ipsum dolor sit amet, consectetur adipiscing elit",      
    //       desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    //       img: "https://www.pitpat.com/wp-content/uploads/2020/07/Dog_-rights_MS_outdoors_stationary_two-dogs-sitting-on-path_white_black_gold-dog-and-gold-dog_@ilaanddrax-1.jpg"
    //     },
    //   ]

  return (
    <div className='menu'>
        <h1>Other posts you may like</h1>
        {posts.map((post) => (
            <div className="post" key={post.id}>
                <img src={post.img} alt="" />
                <h2>{post.title}</h2>
                <button>Read More</button>
            </div>
        ))}
    </div>
  )
}

export default Menu