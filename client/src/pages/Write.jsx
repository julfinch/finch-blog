import React,{ useState } from 'react'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';


const Write = () => {


  const [value, setValue] = useState('');
  const [title, setTitle] = useState('');
  const [file, setFile] = useState('');
  const [cat, setCat] = useState('');

  const handleClick = async(e) => {
    e.preventDefault()
    
  }

  console.log(value)
  return (
    <div className='add'>
      <div className="content">
        <input type="text" placeholder='Title' onChange={e=>setTitle(e.target.value)}/>
        <div className="editorContainer">
          <ReactQuill theme='snow' value={value} onChange={setValue} />
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
            <input type="radio" name="cat" value="art" id='art' onChange={e=>setCat(e.target.value)}/>
            <label htmlFor="art">Art</label>
          </div>
          <div className="cat">
            <input type="radio" name="cat" value="science" id='science' onChange={e=>setCat(e.target.value)}/>
            <label htmlFor="science">Science</label>
          </div>
          <div className="cat">
            <input type="radio" name="cat" value="technology" id='technology' onChange={e=>setCat(e.target.value)}/>
            <label htmlFor="technology">Technology</label>
          </div>
          <div className="cat">
            <input type="radio" name="cat" value="cinema" id='cinema' onChange={e=>setCat(e.target.value)}/>
            <label htmlFor="cinema">Cinema</label>
          </div>
          <div className="cat">
            <input type="radio" name="cat" value="design" id='design' onChange={e=>setCat(e.target.value)}/>
            <label htmlFor="design">Design</label>
          </div>
          <div className="cat">
            <input type="radio" name="cat" value="food" id='food' onChange={e=>setCat(e.target.value)}/>
            <label htmlFor="food">Food</label>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Write