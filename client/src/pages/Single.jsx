import React, { useContext, useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import Edit from '../img/edit.png'
import Delete from '../img/delete.png'
import Menu from '../components/Menu'
import axios from 'axios'
import moment from 'moment'
import { AuthContext } from "../context/authContext";
import DOMPurify from "dompurify";

const Single = () => {

  const [post, setPost] = useState([])

  const location = useLocation();
  const navigate = useNavigate();

  const {currentUser} = useContext(AuthContext);
  console.log('currentUser.username', currentUser.username)
  console.log('post.username', post.username)
  //In our routes router.get("/:id", getPost) method, we need to send the id of the post
  //The location url is "localhost:3000/posts/1" where "1" is the id of the post
  //To be able to get that id, we will use split method where it's the third string after slash
  const postId = location.pathname.split("/")[2]

  useEffect(() => {
      const fetchData = async () => {
      try {
          const res = await axios.get(`/posts/${postId}`);
          setPost(res.data);
      } catch(err){
          console.log(err)
      }
      };
      fetchData();
  }, [postId]);

  const handleDelete = async() => {
    try {
      await axios.delete(`/posts/${postId}`)
      navigate("/")
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <div className='single'>
      <img src={post?.img} alt="" />
      <div className="content">
        
        <h1>{post.title}</h1>
        <p
          dangerouslySetInnerHTML={{
            __html: DOMPurify.sanitize(post.desc),
          }}
        ></p>
        <div className="user">
          {post.userImg && <img src={post.userImg} alt="" />
          }
          <div className="info">
            <span>By {post.username}</span>
            <p>Posted {moment(post.date).fromNow()}</p>
          </div>
          {currentUser.username === post.username && (
          <div className="edit">
            <Link to={`/write?edit=2`} state={post}>
              <img src={Edit} alt="" />
            </Link>
            <img onClick={handleDelete} src={Delete} alt="" />
          </div>
          )}
        </div>
      </div>
      
      <Menu cat={post.cat}/>
    </div>
  )
}

export default Single