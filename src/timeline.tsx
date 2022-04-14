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
    }, [setFrameStart]);
    let [ z, setZ ] = useState(1);
    let callbackZ = useCallback((e) => {
        setZ(e.target.value);
    }, [setZ]);
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
        if (ref.current && ref.current.clientWidth !== width) {
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

    const zooms:{
        zoom: number,
        numberSpacing: number,
        subLines: number,
    }[] = [
        {
            zoom: 4,
            numberSpacing: 20,
            subLines: 19,
        },
        {
            zoom: 3,
            numberSpacing: 10,
            subLines: 9,
        },
        {
            zoom: 2,
            numberSpacing: 4,
            subLines: 3,
        },
        {
            zoom: 1.5,
            numberSpacing: 2,
            subLines: 1,
        },
        {   
            zoom: 0,
            numberSpacing: 1,
            subLines: 1,
        }
    ];

    let zoomSettings = zooms.find((setting) => setting.zoom <= zoom) || zooms[zooms.length - 1];
    let frameStartNumber = frameStart - frameStart%zoomSettings.numberSpacing;
    let s = 20/zoom;
    let ss = s * zoomSettings.numberSpacing;
    let offset = frameStart % Math.floor(Math.pow(zoom, 2));
    
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
                            {Array(zoomSettings.subLines).fill(0).map((_, i) => { return (<line x1={(i+1) * s}
                                y1={i == (zoomSettings.subLines-1)/2 ? 18 : 22} 
                                x2={(i+1) * s}
                                y2={30}
                                stroke="gray"
                                strokeWidth={2}
                            />)})}
                            <line x1={0}
                                y1={15} 
                                x2={0}
                                y2={30}
                                stroke="white"
                                strokeWidth={2}
                            />
                            <line x1={ss}
                                y1={15} 
                                x2={ss}
                                y2={30}
                                stroke="white"
                                strokeWidth={2}
                            />
                    </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#dashes)" />
                <svg x={-offset * s} width={width+ss}>
                    {Array(Math.floor(width/s/zoomSettings.numberSpacing)+1).fill(0).map((_, i) => (<text x={i * ss}
                            y={10}
                            textAnchor="middle"
                            fontSize={10}
                            fontFamily="monospace"
                            fill="white"
                            key={i+"-text"}
                        >
                            {i*zoomSettings.numberSpacing + frameStartNumber}
                    </text>))}
                    
                </svg>
            </svg>
        </div>
    </div>)
}