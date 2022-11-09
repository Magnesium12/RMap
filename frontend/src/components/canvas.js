import React from 'react';
import PropTypes from 'prop-types';
import { useState, useEffect, useRef } from 'react';
import './canvas.css'
import map from '../assets/final_map.png';

const Canvas = ({draw, height, width, canvas_click}) => {
    const canvas = useRef();
    const [scale,setScale] = useState(1);

    useEffect(() => {
        draw(canvas, height, width);
    });
    const send_loc = (event)=>{
        let rect = canvas.current.getBoundingClientRect()
        let x = event.clientX - rect.left
        let y = event.clientY - rect.top
        canvas_click(x,y)
    }
    return (
        <>
            <canvas
                ref= {canvas}
                height={height}
                width={width}
                onClick={send_loc}
                id="canvas"
                className='canvas'
                style={{
                    position: "absolute",
                    backgroundImage: `url(${map})`,
                    backgroundRepeat: 'no-repeat',
                    backgroundSize: `${width}px ${height}px`,
                    top: "0px",
                    left: "0px"
                }}
            />
        </>
    );
};
Canvas.propTypes = {
  draw: PropTypes.func.isRequired,
  height: PropTypes.number.isRequired,
  width: PropTypes.number.isRequired,
  canvas_click: PropTypes.func.isRequired,
};
export default Canvas;
