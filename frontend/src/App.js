import destination from './assets/destination.png'
import source from './assets/source.png'

import './App.css';
import './components/sidebar.css'

import SideBar from './components/sidebar.js'
import Canvas from './components/canvas.js';

import React, { createRef, useEffect } from 'react';
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

const get_response = async (request) =>{
  // var params = JSON.stringify(request)
  var params=request
  console.log(params)
  const response = await axios.post(`/rmap/directions/`, {
    headers: {
      'Content-Type': 'application/json'
    },
    params: params
  },
  
  );
  console.log(response.data)
  return response.data;
}

const get_data = async ()=>{
  const response = await axios.get(`/rmap/get_data/`, {
    headers: {
      'Content-Type': 'application/json'
    }
  });
  return response.data;
}

const search_name = async (name) =>{
  const response = await axios.get(`/rmap/search/?name=${name}`, {
    headers: {
      'Content-Type': 'application/json'
    }
  });
  console.log(response.data)
  return response.data
}

const draw_vertices = (vertices,w,h)=>{
  var c = document.getElementById("canvas");
  var ctx = c.getContext("2d");
  ctx.clearRect(0,0,c.width,c.height)
  for(let i=0;i<vertices.length-1;i++){
    ctx.fillRect(vertices[i].x*w/1856,vertices[i].y*h/1822,3,3)
    ctx.font = "10px Arial";
    ctx.fillText(vertices[i].name,vertices[i].x*w/1856,vertices[i].y*h/1822+9);
  }
}

const draw_edges = (edges,w,h)=>{
  var c = document.getElementById("canvas");
  var ctx = c.getContext("2d");
  // ctx.clearRect(0,0,c.width,c.height)
  for(let i=0;i<edges.length-1;i++){
    ctx.beginPath();
    ctx.strokeStyle="#FF0000";
    ctx.moveTo(edges[i].x0*w/1856 + 1.5, edges[i].y0*h/1822 + 1.5);
    ctx.lineTo(edges[i].x1*w/1856 + 1.5, edges[i].y1*h/1822 + 1.5);
    ctx.stroke();
  }
}

const draw_path = (path,w,h)=>{
  var c = document.getElementById("canvas");
  var ctx = c.getContext("2d");
  ctx.clearRect(0,0,c.width,c.height)
  for(let i=0;i<path.length-1;i++){
    ctx.beginPath();
    ctx.strokeStyle="#000000";
    ctx.moveTo(path[i].x*w/1856, path[i].y*h/1822);
    ctx.lineTo(path[i+1].x*w/1856, path[i+1].y*h/1822);
    ctx.stroke();
    ctx.font = "15px Arial";
    ctx.fillText(path[i].name,path[i].x*w/1856,path[i].y*h/1822+9);
  }
  ctx.font = "15px Arial";
  ctx.fillText(path[path.length-1].name,path[path.length-1].x*w/1856,path[path.length-1].y*h/1822+9);
  var desImg = new Image(30,30);
  desImg.src = destination;
  desImg.onload = ()=>{ctx.drawImage(desImg,path[path.length-1].x*w/1856-15,path[path.length-1].y*h/1822-30,30,30)}
  var srcImg = new Image(30,30);
  srcImg.src = source;
  srcImg.onload = ()=>{ctx.drawImage(srcImg,path[0].x*w/1856-15,path[0].y*h/1822-30,30,30)}
}

const draw_paths = (paths,w,h)=>{
  var c = document.getElementById("canvas");
  var ctx = c.getContext("2d");
  ctx.clearRect(0,0,c.width,c.height)
  paths.forEach(({dist,path})=>{
    for(let i=0;i<path.length-1;i++){
      ctx.beginPath();
      ctx.strokeStyle="#000000";
      ctx.moveTo(path[i].x*w/1856, path[i].y*h/1822);
      ctx.lineTo(path[i+1].x*w/1856, path[i+1].y*h/1822);
      ctx.stroke();
      ctx.font = "15px Arial";
      ctx.fillText(path[i].name,path[i].x*w/1856,path[i].y*h/1822-8);
    }
    ctx.font = "15px Arial";
    ctx.fillText(path[path.length-1].name,path[path.length-1].x*w/1856,path[path.length-1].y*h/1822+9);
    var desImg = new Image(30,30);
    desImg.src = destination;
    desImg.onload = ()=>{ctx.drawImage(desImg,path[path.length-1].x*w/1856-15,path[path.length-1].y*h/1822-30,30,30)}
    var srcImg = new Image(30,30);
    srcImg.src = source;
    srcImg.onload = ()=>{ctx.drawImage(srcImg,path[0].x*w/1856-15,path[0].y*h/1822-30,30,30)}
  })
}

function App() {
  // const [operation, setOperation] = useState("");

  const src = useRef();
  const dest = useRef();

  const selected_spot = useRef();

  const [show_sidebar, setShow_sidebar] = useState(true);

  useEffect(()=>{
    async function fetch_data(){
      var data = await get_data()
      // console.log(raw_data)
      // var data = JSON.parse(raw_data)
      console.log(data)
      draw_vertices(data.vertices,ww,h)
      draw_edges(data.edges,ww,h)
    }
    fetch_data()
  },[])

  const [stops, setStops] = useState([]);// list of refs of stop-inputs
  const [friends, setFriends] = useState([createRef(), createRef()]);// list of refs of friend-inputs


  const add_stop = (stop) =>{
    console.log("it ran")
    // stops.push(stop)
    setStops([...stops,stop])
  }

  const add_friend = (friend) =>{
    console.log("it ren")
    // friends.push(friend)
    setFriends([...friends,friend])
  }

  const write_request = (ftype)=>{
    var ans = {
      friends_present: (ftype)?1:0,
      stops_present: ((!ftype)&&(stops.length>0))?1:0,
      src: (ftype)?"":src.current.value,
      dest: (ftype)?"":dest.current.value,
      stops: (ftype)?[]:stops.map((stop)=>{
        return stop.current.value;
      }),
      friends: (!ftype)?[]:friends.map((friend)=>{
        return friend.current.value;
      }),
    };
    return JSON.stringify(ans);
  }

  const find_dist = async ()=>{
    console.log(stops)
    var req = write_request(false);
    console.log(req);
    var res = await get_response(req);
    // var path = JSON.parse(res);
    var path=res["path"]
    draw_path(path,ww,h);
  }

  const find_optimal_spot = async()=>{
    var req = write_request(true);
    console.log(req);
    var res = await get_response(req);
    // var paths = JSON.parse(res);
    var paths = res["paths"]
    draw_paths(paths,ww,h);
  }

  const select_on_map = (element)=>{
    console.log(element.current.id)
    selected_spot.current = element.current;
    setShow_sidebar(false);
  }

  const canvas_click = (x,y)=>{
    if(selected_spot.current!=null){
      selected_spot.current.value = `@${x*1856/ww},${y*1822/h}`;
      console.log(selected_spot.current.value);
      selected_spot.current = null;
      setShow_sidebar(true);
      console.log(stops)
    }
    else{
      console.log("x=",x,"y=",y)
    }
  }

  var ww = window.innerWidth - 60;
  var h = Math.ceil(977*ww/996);
  
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
        on_map={select_on_map}
        search={search_name}>
      </SideBar>
    </div>
  );
}

export default App;

// 926, 944
