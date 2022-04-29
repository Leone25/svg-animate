import { useState, useRef, useCallback, useEffect } from 'react';

export function useDrag({initialSize = [0.5, 0.5], onDrag, onDragEnd, minSizes = [[0, 0],[0,0]]}:{
    initialSize?: [number, number],
    onDrag?:(size:number)=>void,
    onDragEnd?:(size:number)=>void,
    minSizes?: [[number, number], [number, number]],
}) {
    let containerRef = useRef<HTMLDivElement>(null);
    let [size, setSize] = useState(initialSize);
    let [isDragging, setIsDragging] = useState(false);

    let startDrag = useCallback((e) => {
        setIsDragging(true);
    }, [setIsDragging]);
    let endDrag = useCallback((e) => {
        setIsDragging(false);
    }, [setIsDragging]);
    let drag = useCallback((e) => {
        if (!isDragging) return;
        setSize([
            Math.max(minSizes[0][0], Math.min(1-minSizes[0][1], (e.clientX - (containerRef.current?.offsetLeft || 0)) / (containerRef.current?.clientWidth || 1))),
            Math.max(minSizes[1][0], Math.min(1-minSizes[1][1], (e.clientY - (containerRef.current?.offsetTop || 0)) / (containerRef.current?.clientHeight || 1))),
        ]);
    }, [setSize, isDragging, containerRef, minSizes],);

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
    }, [isDragging]);

    return {
        containerRef,
        size,
        isDragging,
        startDrag,
    }
}