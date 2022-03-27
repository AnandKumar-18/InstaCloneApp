import React, { useState } from 'react';
import './App.css';
import axios from 'axios';
import logo from "./Pics/logo.png";
import camera from './Pics/camera.png';
import dots from './Pics/threefdots.png'
import sendbutton from './Pics/sendb.png';
import heart from './Pics/heart.png';

const App=()=> {
  const [post,setPost]=useState([]);
  const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2NDg0MTY3MTIsImRhdGEiOiI2MjQwODY4Nzc2ZmVlM2YxZGM4ZjA1M2MiLCJpYXQiOjE2NDg0MTMxMTJ9._QpPow7zo45_FCzzCXlqXHZEKZSgKal43bVOhSzoH70'
  
React.useEffect(()=>{
  axios.get(`http://localhost:5000/posts`,{
      headers: {
        Authorization:'Bearer '+token
      }
  }).then((res) => {
    console.log("Axios", res.data.posts);
    setPost(res.data.posts);
  })
},[]);


  return (
    <>
      <nav className="navbar">
        <div className="logo">
          <img
            src={logo}
            width="58" alt='logo'
          />
        </div>
        <div className="name">
          <h1>Instaclone</h1>
        </div>
        <div className="camera">
          <img
            src={camera}
            alt="camera"
          />
        </div>
      </nav>

{
post.map((propos,idx)=>{
  return (<>
  <div className="main-info" key={idx} style={{margin:"20px 0"}}>
    <aside></aside>
    <section className="main-container">
      <header>
        <div className="name-loc">
          <h3>{propos.name}</h3>
          <span>{propos.location}</span>
        </div>
        <div className="dots">
          <img
            src={dots}
            alt="threedots"
          />
        </div>
      </header>

      <div className="image-container">
        <img
          src={propos.PostImage}
          alt="post-pic"
        />
      </div>

      <footer>
        <div className="likes-share-date">
          <div className="like-share">
            <img
              src={heart}
              alt="likes"
            />
            <img
              src={sendbutton}
              alt="share"
            />
          </div>
          <div className="date">{new Date(propos.date).toLocaleDateString()}</div>
        </div>
        <span>{propos.likes} likes</span>
        <h2>{propos.description}</h2>
      </footer>
    </section>
    <aside></aside>

  </div>
  </>
)
})}
      
    </>

  );
}

export default App;



// json-server --watch api-data/users.json --port 3004
