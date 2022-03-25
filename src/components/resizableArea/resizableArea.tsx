import React, { useCallback, useState } from "react";

export function ResizableArea({
    children, 
    initialSizes
} : {
    children: [React.ReactChild, React.ReactChild],
    initialSizes?: number
}) {
    let containerRef = React.useRef<HTMLDivElement>(null);
    let [size, setSize] = useState(initialSizes || 0.5);
    let [isDragging, setIsDragging] = useState(false);

    let startDrag = useCallback((e: React.MouseEvent) => {
        setIsDragging(true);
    }, [setIsDragging]);
    let endDrag = useCallback((e: React.MouseEvent) => {
        setIsDragging(false);
    }, [setIsDragging]);
    let drag = useCallback((e: React.MouseEvent) => {
        if (!isDragging) return;
        setSize(Math.max(0, Math.min(1, (e.clientY - (containerRef.current?.offsetTop || 0)) / (containerRef.current?.clientHeight || 1))));
    }, [setSize, isDragging, containerRef]);
    
    return (<div style={{
                display:'grid',
                height:'100%',
                gridTemplateColumns: '1fr',
                gridTemplateRows: `calc(${size*100}% - 5px) 10px 1fr`
            }}
            ref={containerRef}
            onMouseUp={endDrag} onMouseMove={drag}
        >
        {children[0]}
        <div style={{background:'red', cursor:'row-resize'}} onMouseDown={startDrag}></div>
        {children[1]}
    </div>)
}