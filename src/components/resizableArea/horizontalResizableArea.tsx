import React, { useCallback, useState, useEffect, useRef } from "react";

export function HorizontalResizableArea({
    children, 
    initialSizes,
    minSizes = [0, 0],
} : {
    children: [React.ReactChild, React.ReactChild],
    initialSizes?: number,
    minSizes?: [number, number],
}) {
    let containerRef = useRef<HTMLDivElement>(null);
    let [size, setSize] = useState(initialSizes || 0.5);
    let [isDragging, setIsDragging] = useState(false);

    let startDrag = useCallback((e) => {
        setIsDragging(true);
    }, [setIsDragging]);
    let endDrag = useCallback((e) => {
        setIsDragging(false);
    }, [setIsDragging]);
    let drag = useCallback((e) => {
        if (!isDragging) return;
        setSize(Math.max(minSizes[0], Math.min(1-minSizes[1], (e.clientX - (containerRef.current?.offsetLeft || 0)) / (containerRef.current?.clientWidth || 1))));
    }, [setSize, isDragging, containerRef, minSizes]);

    useEffect(() => {
        if (isDragging) {
            window.addEventListener("mousemove", drag);
            window.addEventListener("mouseup", endDrag);
            return () => {
                window.removeEventListener("mousemove", drag);
                window.removeEventListener("mouseup", endDrag);
            }
        } else {
            window.removeEventListener("mousemove", drag);
            window.removeEventListener("mouseup", endDrag);
        }
    }, [isDragging])
    
    return (<div style={{gridTemplateColumns: `calc(${size*100}% - 5px) 10px 1fr`}} className='horizontal-resizable-area' ref={containerRef} >
        {children[0]}
        <div style={{background:'rgb(0, 20, 29)', cursor:'col-resize', display:'grid', justifyItems:'center', alignItems:'center'}} onMouseDown={startDrag}>
            <div style={{background:'#777', width:'3px', height:'80%', borderRadius:'4px'}}></div>
        </div>
        {children[1]}
    </div>)
}