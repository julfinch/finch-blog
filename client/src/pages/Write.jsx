import axios from 'axios';
import moment from 'moment';
import React,{ useEffect, useState } from 'react'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useLocation, useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';

const modules = {
  toolbar: [
    [{ 'header': '1'}, {'header': '2'}, { 'font': [] }],
    [{size: []}],
    ['bold', 'italic', 'underline', 'strike', 'blockquote'],
    [{'list': 'ordered'}, {'list': 'bullet'},
     {'indent': '-1'}, {'indent': '+1'}],
    ['link', 'image', 'video'],
    ['clean']
  ],
  clipboard: {
    // toggle to add extra line breaks when pasting HTML:
    matchVisual: false,
  }
};

const formats = [
  'header', 'font', 'size',
  'bold', 'italic', 'underline', 'strike', 'blockquote',
  'list', 'bullet', 'indent',
  'link', 'image', 'video'
];

const Write = () => {

  const state = useLocation().state
  const [value, setValue] = useState(state?.desc || '');
  const [title, setTitle] = useState(state?.title || '');
  const [file, setFile] = useState(null);
  const [cat, setCat] = useState(state?.cat || '');

  const navigate = useNavigate();

  const handleClick = async(e) => {
    e.preventDefault()
    // const imgUrl = await upload()
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "finch-blog");
    try {
      const uploadRes = await axios.post("https://api.cloudinary.com/v1_1/dwxdztigp/image/upload", formData);
      const {url} = uploadRes.data;
      state 
        ? await axios.put(`/posts/${state.id}`, {
          title,
          desc: value,
          cat,
          img: file ? url : "",
        })
      : await axios.post(`/posts/`, {
        title,
        desc: value,
        cat,
        img: file ? url : "",
        date: moment(Date.now()).format("YYYY-MM-DD HH:mm:ss")
      });
      navigate("/")
    } catch (err) {
      console.log(err);
    }
  }

  // If we edit a post, it redirects us to the Write Page where
  // the state shows up. But if we click the "Write Button" 
  // while in the Write Page just in case we decide to 
  // write a new post, the previous state of the previous 
  // post that we clicked remains. To solve that, we create this.
  useEffect(() => {
    setValue(state?.desc || "");
    setTitle(state?.title || "");
    setCat(state?.cat || "");
  }, [state])
  

  console.log(value)
  return (
    <div className='add'>
      <div className="content">
        <input type="text" placeholder='Title' value={title} onChange={e=>setTitle(e.target.value)}/>
        <div className="editorContainer">
          <ReactQuill theme='snow' value={value} formats={formats} modules={modules} onChange={setValue} />
        </div>
      </div>
      <div className="menu">
        <div className="item">
          <h1>Publish</h1>
          <span>
            <b>Status: </b> Draft
          </span>
          <span>
            <b>Visibility: </b> Public
          </span>
          <input style={{display:"none"}} type="file" id="file" name="" onChange={e=>setFile(e.target.files[0])}/>
          <label htmlFor="file">Upload Image</label>
          <div className="buttons">
            <button>Save as draft</button>
            <button onClick={handleClick}>Publish</button>
          </div>
        </div>
        <div className="item">
          <h1>Category</h1>
          <div className="cat">
            <input type="radio" checked={cat === "art"} name="cat" value="art" id='art' onChange={e=>setCat(e.target.value)}/>
            <label htmlFor="art">Art</label>
          </div>
          <div className="cat">
            <input type="radio" checked={cat === "science"} name="cat" value="science" id='science' onChange={e=>setCat(e.target.value)}/>
            <label htmlFor="science">Science</label>
          </div>
          <div className="cat">
            <input type="radio" checked={cat === "technology"} name="cat" value="technology" id='technology' onChange={e=>setCat(e.target.value)}/>
            <label htmlFor="technology">Technology</label>
          </div>
          <div className="cat">
            <input type="radio" checked={cat === "cinema"} name="cat" value="cinema" id='cinema' onChange={e=>setCat(e.target.value)}/>
            <label htmlFor="cinema">Cinema</label>
          </div>
          <div className="cat">
            <input type="radio" checked={cat === "design"} name="cat" value="design" id='design' onChange={e=>setCat(e.target.value)}/>
            <label htmlFor="design">Design</label>
          </div>
          <div className="cat">
            <input type="radio" checked={cat === "food"} name="cat" value="food" id='food' onChange={e=>setCat(e.target.value)}/>
            <label htmlFor="food">Food</label>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Write