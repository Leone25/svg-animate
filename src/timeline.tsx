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
    let [size, setSize] = useState({height: 0, width: 0});
    let callback = useCallback(() => {
        if (ref.current) {
            if (ref.current.clientHeight !== size.height || ref.current.clientWidth !== size.width) {
                setSize(ref.current.getBoundingClientRect());
            }
        }
    }, [size, setSize, ref]);
    useEffect(callback);
    useEffect(() => {
        if (!ref.current) return;

        let resizeObserver = new ResizeObserver(() => {
            console.log("The element was resized");
            callback();
        });
  
        resizeObserver.observe(ref.current);
    }, []);
    return (<div className='heading'>
        <div className='left' style={{width:leftSize}}>
            left
        </div>
        <div className='right' ref={ref}>
            <svg width={size.width} height={30}>
                {(() => {
                    let svg = <></>;
                    let frameEnd = frameStart + size.width / zoom;
                    let offset = (frameStart - Math.floor(frameStart)) * zoom;
                    for (let i = frameStart; i < frameEnd; i += zoom * 20) {
                        svg = <>
                            {svg}
                            <line x1={(i - frameStart) * zoom + offset}
                                y1={15} 
                                x2={(i - frameStart) * zoom + offset}
                                y2={30}
                                stroke="white"
                                strokeWidth={2}
                            />
                            <text x={(i - frameStart) * zoom + offset}
                                y={10}
                                textAnchor="middle"
                                fontSize={10}
                                fontFamily="monospace"
                                fill="white"
                            >
                                {i/zoom/20}
                            </text>
                        </>
                    }
                    return svg;
                })()}
            </svg>
        </div>
    </div>)
}