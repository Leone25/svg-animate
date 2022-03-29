import React, { useCallback, useState } from "react";

export function VerticalResizableArea({
    children, 
    initialSizes,
    minSizes = [0, 0],
} : {
    children: [React.ReactChild, React.ReactChild],
    initialSizes?: number,
    minSizes?: [number, number],
}) {
    let containerRef = React.useRef<HTMLDivElement>(null);
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
        setSize(Math.max(minSizes[0], Math.min(1-minSizes[1], (e.clientY - (containerRef.current?.offsetTop || 0)) / (containerRef.current?.clientHeight || 1))));
    }, [setSize, isDragging, containerRef, minSizes]);

    React.useEffect(() => {
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
    
    return (<div style={{gridTemplateRows: `calc(${size*100}% - 5px) 10px 1fr`}} className='vertical-resizable-area' ref={containerRef} >
        {children[0]}
        <div style={{background:'rgb(0, 20, 29)', cursor:'row-resize', display:'grid', justifyItems:'center', alignItems:'center'}} onMouseDown={startDrag}>
            <div style={{background:'#777', width:'80%', height:'3px', borderRadius:'4px'}}></div>
        </div>
        {children[1]}
    </div>)
}