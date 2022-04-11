import React from "react";

export function Timeline({
    state,
    zoom,
    cursorPosition,
} : {
    state: any,
    zoom: number,
    cursorPosition: number,
}) {
    return (<div className="timeline">
        <Heading frameStart={20} frameEnd={50} leftSize={250}></Heading>
    </div>)
}

function Heading({
    frameStart,
    frameEnd,
    leftSize,
} : {
    frameStart: number,
    frameEnd: number,
    leftSize: number,
}) {
    let frames = [];
    for (let i = frameStart; i <= frameEnd; i++) {
        frames.push(<div key={i} className="heading-frame" style={{left: `${(i-frameStart)/(frameEnd-frameStart)*leftSize}px`}}>
            <div className="heading-frame-label">{i}</div>
        </div>)
    }
    return (<div className='heading'>
        <div className='left' style={{width:leftSize}}>
            left
        </div>
        <div className='right' style={{gridTemplateColumns:`repeat(${Math.floor(frameEnd-frameStart)+1}, 1fr)`}}>
            {frames}
        </div>
    </div>)
}