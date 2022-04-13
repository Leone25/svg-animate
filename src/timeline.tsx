import { useRef, useEffect, useState, useCallback } from "react";

export function Timeline({
    state,
    zoom,
    cursorPosition,
} : {
    state: any,
    zoom: number,
    cursorPosition: number,
}) {
    let [ frameStart, setFrameStart ] = useState(20);
    let callback = useCallback((e) => {
        setFrameStart(e.target.value);
    }, [setFrameStart, frameStart]);
    let [ z, setZ ] = useState(1);
    let callbackZ = useCallback((e) => {
        setZ(e.target.value);
    }, [setZ, z]);
    return (<div className="timeline">
        <Heading frameStart={frameStart} zoom={z} leftSize={250}></Heading>
        <input type='range' min={20} max={24} step={0.1} value={frameStart} onChange={callback}></input>
        <input type='range' min={1} max={4} step={0.1} value={z} onChange={callbackZ}></input>
    </div>)
}

function Heading({
    frameStart,
    zoom,
    leftSize,
} : {
    frameStart: number,
    zoom: number,
    leftSize: number,
}) {
    let ref = useRef<HTMLDivElement>(null);
    let [width, setWidth] = useState(0);
    let callback = useCallback(() => {
        if (ref.current && ref.current.clientWidth != width) {
            setWidth(ref.current.clientWidth);
        }
    }, [width, setWidth, ref]);
    useEffect(() => {
        if (!ref.current) return;

        let resizeObserver = new ResizeObserver(() => {
            callback();
        });

        callback();
  
        resizeObserver.observe(ref.current);
    }, []);

    let s = 20/zoom;
    let ss = Math.floor(Math.pow(zoom, 2)) * s;
    let offset = frameStart % zoom;
    let frameStartNumber = Math.floor(frameStart);
    let frameEnd = Number(frameStart) + width / s;

    console.log(frameStart, frameStartNumber, frameEnd, offset);
    
    
    return (<div className='heading'>
        <div className='left' style={{width:leftSize}}>
            left
        </div>
        <div className='right' ref={ref}>
            <svg width={width} height={30}>
                <defs>
                    <pattern
                        id="dashes"
                        width={ss}
                        height={30}
                        x={-offset * s}
                        y={0}
                        patternUnits="userSpaceOnUse"
                        >
                            {/*Array(Math.floor(zoom*10)).map((_, i) => { return (<line x1={(offset + i) * s}
                                y1={20} 
                                x2={(offset + i) * s}
                                y2={30}
                                stroke="white"
                                strokeWidth={1}
                            />)})*/}
                            <line x1={0.5 * ss}
                                y1={15} 
                                x2={0.5 * ss}
                                y2={30}
                                stroke="white"
                                strokeWidth={2}
                            />
                            <line x1={1.5 * ss}
                                y1={15} 
                                x2={1.5 * ss}
                                y2={30}
                                stroke="white"
                                strokeWidth={2}
                            />
                    </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#dashes)" />
                <svg x={-offset * s} width={width+ss}>
                    {(() => {
                        let svg = [];
                        for (let i = frameStartNumber; i < Number(frameEnd) + 1; i += Math.floor(Math.pow(zoom, 2))) {
                            svg.push(<text x={0.5 * ss + (i - frameStartNumber) * s}
                                    y={10}
                                    textAnchor="middle"
                                    fontSize={10}
                                    fontFamily="monospace"
                                    fill="white"
                                    key={i+"-text"}
                                >
                                    {i}
                                </text>);
                        }
                        return svg;
                    })()}
                </svg>
            </svg>
        </div>
    </div>)
}