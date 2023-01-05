import { useRef, useEffect, useState, useCallback } from "react";
import { HorizontalResizableArea, Area } from './components/resizableArea';

export function Timeline({
    state,
} : {
    state: any,
}) {
    return (<HorizontalResizableArea minSizes={[[0.1, 0.5],[0,0]]} initialSize={[0.2, 0.2]} className="timeline">
        <Area>
            <div className="layers">
                <div className="heading"> header </div>
                left
            </div>
        </Area>
        <Area>
            <FrameMarkings frameStart={state.view.frameStart} zoom={state.view.zoom} maxFrame={state.content.size}/>
        </Area>
    </HorizontalResizableArea>);
}

function FrameMarkings({
    frameStart,
    zoom,
    maxFrame,
} : {
    frameStart: number,
    zoom: number,
    maxFrame: number,
}) {
    let ref = useRef<HTMLDivElement>(null);
    let [width, setWidth] = useState(0);
    let [height, setHeight] = useState(30);
    let callback = useCallback(() => {
        if (ref.current && ref.current.clientWidth !== width) {
            console.log(ref.current.clientWidth, 'w')
            setWidth(ref.current.clientWidth);
        }
        if (ref.current && ref.current.clientHeight !== height) {
            console.log(ref.current.clientHeight, 'h')
            setHeight(ref.current.clientHeight);
        }
    }, [width, setWidth, height, setHeight, ref]);
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
            zoom: 1.2,
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
    
    return (<div className='frames' ref={ref}>
        <svg width={width} height="100%">
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
                            key={i}
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
                        <line x1={0}
                            y1={30}
                            x2={ss}
                            y2={30}
                            stroke="white"
                            strokeWidth={2}
                        />
                </pattern>
            </defs>
            <g id="timeline grid">
                <rect width="100%" height="30" fill="url(#dashes)" />
                <g>
                    {Array(Math.floor(width/s/zoomSettings.numberSpacing)+1).fill(0).map((_, i) => (<text x={i * ss}
                            y={10}
                            textAnchor="middle"
                            fontSize={10}
                            fontFamily="monospace"
                            fill={i*zoomSettings.numberSpacing + frameStartNumber <= maxFrame ? "white" : "gray"}
                            key={i+"-text"}
                        >
                            {i*zoomSettings.numberSpacing + frameStartNumber}
                    </text>))}
                </g>
            </g>
        </svg>
    </div>)
}