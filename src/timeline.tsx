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
    return (<div className="timeline">
        <Heading frameStart={20} zoom={zoom} leftSize={250}></Heading>
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
        if (ref.current && ref.current.clientWidth) {
            setWidth(ref.current.clientWidth);
        }
    }, [width, setWidth, ref]);
    useEffect(callback);
    useEffect(() => {
        if (!ref.current) return;

        let resizeObserver = new ResizeObserver(() => {
            callback();
        });
  
        resizeObserver.observe(ref.current);
    }, []);
    return (<div className='heading'>
        <div className='left' style={{width:leftSize}}>
            left
        </div>
        <div className='right' ref={ref}>
            <svg width={width} height={30}>
                {(() => {
                    let svg = [];
                    let frameEnd = frameStart + width / zoom;
                    let s = 20/zoom;
                    let offset = (frameStart - Math.floor(frameStart));
                    for (let i = frameStart; i < frameEnd; i += zoom) {
                        svg.push(<line x1={(i - frameStart + offset) * s}
                                y1={20} 
                                x2={(i - frameStart + offset) * s}
                                y2={30}
                                stroke="white"
                                strokeWidth={1}
                                key={i+"-small"}
                            />);
                        svg.push(<line x1={(i - frameStart + offset + 0.5) * s}
                                y1={15} 
                                x2={(i - frameStart + offset + 0.5) * s}
                                y2={30}
                                stroke="white"
                                strokeWidth={2}
                                key={i+"-big"}
                            />);
                        svg.push(<text x={(i - frameStart + offset + 0.5) * s}
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
        </div>
    </div>)
}