import destination from './assets/destination.png'
import source from './assets/source.png'

import './App.css';
import './components/sidebar.css'

import SideBar from './components/sidebar.js'
import Canvas from './components/canvas.js';

import React, { createRef } from 'react';
import { useState, useRef } from 'react';

import axios from "axios"

axios.defaults.xsrfHeaderName = 'X-CSRFTOKEN';
axios.defaults.xsrfCookieName = 'csrftoken'

var dummy_path = [
  {
    x:900,
    y:100,
    name:"loc1"
  },
  {
    x:200,
    y:200,
    name:""
  },
  {
    x:100,
    y:300,
    name:"loc2"
  }
]

var dummy_path2 = [
  {
    x:100,
    y:400,
    name:"loc3"
  },
  {
    x:200,
    y:500,
    name:"loc4"
  },
  {
    x:100,
    y:300,
    name:"loc5"
  }
]

var dummy_paths = [dummy_path,dummy_path2];

const draw = (canvas,h,w) => {
  // Draws the canvas
  let ctx = canvas.current.getContext('2d');
  ctx.lineWidth = 2;
  ctx.strokeStyle="#FF0000";
  ctx.strokeRect(0, 0, w, h)
};

const get_response = (request) =>{
  var params = JSON.stringify(request)
  return axios.get(`/rmap/dijk/`, params, {
    headers: {
      'Content-Type': 'application/json'
    }
  })
}

const draw_path = (path)=>{
  var c = document.getElementById("canvas");
  var ctx = c.getContext("2d");
  ctx.clearRect(0,0,c.width,c.height)
  for(let i=0;i<path.length-1;i++){
    ctx.beginPath();
    ctx.strokeStyle="#000000";
    ctx.moveTo(path[i].x, path[i].y);
    ctx.lineTo(path[i+1].x, path[i+1].y);
    ctx.stroke();
    ctx.font = "15px Arial";
    ctx.fillText(path[i].name,path[i].x,path[i].y+9);
  }
  ctx.font = "15px Arial";
  ctx.fillText(path[path.length-1].name,path[path.length-1].x,path[path.length-1].y+9);
  var desImg = new Image(30,30);
  desImg.src = destination;
  desImg.onload = ()=>{ctx.drawImage(desImg,path[path.length-1].x-15,path[path.length-1].y-30,30,30)}
  var srcImg = new Image(30,30);
  srcImg.src = source;
  srcImg.onload = ()=>{ctx.drawImage(srcImg,path[0].x-15,path[0].y-30,30,30)}
}

const draw_paths = (paths)=>{
  var c = document.getElementById("canvas");
  var ctx = c.getContext("2d");
  ctx.clearRect(0,0,c.width,c.height)
  paths.forEach((path)=>{
    for(let i=0;i<path.length-1;i++){
      ctx.beginPath();
      ctx.strokeStyle="#000000";
      ctx.moveTo(path[i].x, path[i].y);
      ctx.lineTo(path[i+1].x, path[i+1].y);
      ctx.stroke();
      ctx.font = "15px Arial";
      ctx.fillText(path[i].name,path[i].x,path[i].y-8);
    }
    ctx.font = "15px Arial";
    ctx.fillText(path[path.length-1].name,path[path.length-1].x,path[path.length-1].y+9);
    var desImg = new Image(30,30);
    desImg.src = destination;
    desImg.onload = ()=>{ctx.drawImage(desImg,path[path.length-1].x-15,path[path.length-1].y-30,30,30)}
    var srcImg = new Image(30,30);
    srcImg.src = source;
    srcImg.onload = ()=>{ctx.drawImage(srcImg,path[0].x-15,path[0].y-30,30,30)}
  })
}

function App() {
  // const [operation, setOperation] = useState("");

  const src = useRef();
  const dest = useRef();

  const selected_spot = useRef();

  const [show_sidebar, setShow_sidebar] = useState(true);

  var stops = [];// list of refs of stop-inputs
  var friends = [createRef(), createRef()];// list of refs of friend-inputs


  const add_stop = (stop) =>{
    console.log("it ran")
    stops.push(stop)
  }

  const add_friend = (friend) =>{
    console.log("it ren")
    friends.push(friend)
  }

  const write_request = (ftype)=>{
    var ans = {
      friends_present: (ftype),
      stops_present: (!ftype)&&(stops.length>0),
      src: src.current.value,
      dest: dest.current.value,
      stops: stops.map((stop)=>{
        return stop.current.value;
      }),
      friends: friends.map((friend)=>{
        return friend.current.value;
      }),
    };
    return JSON.stringify(ans);
  }

  const find_dist = ()=>{
    var req = write_request(false);
    console.log(req);
    //var res = get_response(req);
    //var path = JSON.parse(res);
    draw_path(dummy_path);
  }

  const find_optimal_spot = ()=>{
    var req = write_request(true);
    console.log(req);
    //var res = get_response(req);
    //var paths = JSON.parse(res);
    draw_paths(dummy_paths);
  }

  const select_on_map = (element)=>{
    console.log(element.current.id)
    selected_spot.current = element.current;
    setShow_sidebar(false);
  }

  const canvas_click = (x,y)=>{
    if(selected_spot.current!=null){
      selected_spot.current.value = `@x:${x},y:${y}`;
      console.log(selected_spot.current.id);
      selected_spot.current = null;
      setShow_sidebar(true);
    }
    else{
      console.log("x=",x,"y=",y)
    }
  }

  let ww = window.innerWidth - 60;
  let h = Math.ceil(977*ww/996);
  
  return (
    <div className="App">
      <Canvas draw={draw} height={h} width={ww} canvas_click={canvas_click}></Canvas>
      <SideBar show={show_sidebar}
        dijk={find_dist}
        add_stop={add_stop}
        src={src}
        dest={dest}
        add_friend={add_friend}
        friends_list={friends}
        find_optimal_spot={find_optimal_spot}
        on_map={select_on_map}>
      </SideBar>
    </div>
  );
}

export default App;

// 926, 944
