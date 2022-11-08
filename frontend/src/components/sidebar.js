import './sidebar.css'
import 'bootstrap/dist/css/bootstrap.min.css';

import React, { createRef } from 'react';
import PropTypes from 'prop-types';

import { useState } from 'react';

import Button from 'react-bootstrap/Button';
import Accordion from 'react-bootstrap/Accordion';

const SideBar = ({show, dijk, add_stop, src, dest, add_friend, friends_list, find_optimal_spot, on_map, search})=>{
    const [stops,setStops] = useState(0);// number of stops
    const [friends, setFriends] = useState(2);// number of friends

    const [stopHtml, setStopHtml] = useState([])// html of stop-inputs
    const [friendHtml, setFriendHtml] = useState([])// html of friend-inputs

    const handleClose = () => document.getElementById("accordion_list").style.display = "none";
    const handleShow = () => document.getElementById("accordion_list").style.display = "block";

    if(document.getElementById("accordion_list")!=null){
        handleShow()
    }
    
    if(!show){
        handleClose()
    }

    const addStop = ()=>{
        console.log("a stop is added")
        setStops(current=>current+1)
        let x = createRef()
        let stop_input = (
            <>
                <br></br>
                <input type="text" id={`s${stops+1}`} key={`s${stops+1}`} ref={x} onChange={()=>{search(x.current.value)}}/><button title='Select on Map' onClick={()=>{on_map(x)}}>⌖</button>
                <br></br>
                <div className="vertLine"></div>
            </>
        )
        setStopHtml([...stopHtml, stop_input])
        add_stop(x);
    }

    const addFriend = ()=>{
        console.log("a friend is added")
        setFriends(current=>current+1)
        let x = createRef()
        let friend_input = (
            <>
                <br></br>
                <input type="text" id={`f${friends+1}`} key={`f${friends+1}`} ref={x} onChange={()=>{search(x.current.value)}}/><button title='Select on Map' onClick={()=>{on_map(x)}}>⌖</button>
            </>
        )
        setFriendHtml([...friendHtml, friend_input])
        add_friend(x);
    }
    
    return (
        <div style={{overflow:"hidden"}}>
        <div className='sidebar_bt' id='sidebar_bt'>
            <Button variant="primary" className="pull-right" onClick={handleShow}>
                ☰
            </Button>
        </div>
        <div className='accordion_list' id='accordion_list'>
            <Button variant="danger" className="pull-right" onClick={handleClose}>
                X
            </Button>
            <Accordion>
            <Accordion.Item eventKey="0">
                <Accordion.Header>Directions</Accordion.Header>
                <Accordion.Body>
                    <input type="text" name="src" id="src" ref={src} onChange={()=>{search(src.current.value)}}/><button title='Select on Map' onClick={()=>{on_map(src)}}>⌖</button>
                    <br></br>
                    <div className="vertLine"></div>
                    {stopHtml}
                    <br></br>
                    <button onClick={addStop}>+</button>
                    <br></br>
                    <div className="vertLine"></div>
                    <br></br>
                    <input type="text" name="dest" id="dest" ref={dest} onChange={()=>{search(dest.current.value)}}/><button title='Select on Map' onClick={()=>{on_map(dest)}}>⌖</button>
                    <br></br>
                    <button onClick={()=>{dijk(src,dest)}}>Find</button>
                </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="1">
                <Accordion.Header>Meet up with Friends</Accordion.Header>
                <Accordion.Body>
                    <input type="text" id="f1" key="f1" ref={friends_list[0]} onChange={()=>{search(friends_list[0].current.value)}}/><button title='Select on Map' onClick={()=>{on_map(friends_list[0])}}>⌖</button> 
                    <br></br>
                    <input type="text" id="f2" key="f2" ref={friends_list[1]} onChange={()=>{search(friends_list[0].current.value)}}/><button title='Select on Map' onClick={()=>{on_map(friends_list[1])}}>⌖</button>
                    {friendHtml}
                    <br></br>
                    <button onClick={addFriend}>+ Friend</button>
                    <br></br>
                    <button onClick={find_optimal_spot}>
                        Find Meet Point
                    </button>
                </Accordion.Body>
            </Accordion.Item>
            </Accordion>
        </div>
        </div>
    )
}
SideBar.propTypes = {
    show: PropTypes.bool.isRequired,
    dijk: PropTypes.func.isRequired,
    add_stop: PropTypes.func.isRequired,
    find_optimal_spot: PropTypes.func.isRequired,
    src: PropTypes.shape({ current: PropTypes.instanceOf(Element) }).isRequired,
    dest: PropTypes.shape({ current: PropTypes.instanceOf(Element) }).isRequired,
    add_friend: PropTypes.func.isRequired,
    friends_list: PropTypes.arrayOf(PropTypes.shape({ current: PropTypes.instanceOf(Element) })).isRequired,
    search: PropTypes.func.isRequired,
  };

export default SideBar