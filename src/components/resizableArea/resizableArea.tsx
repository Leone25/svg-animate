import { useState } from "react";

export function ResizableArea({
    children, 
    initialSizes
} : {
    children: [React.ReactChild, React.ReactChild],
    initialSizes?: number
}) {
    let [size, setSize] = useState(initialSizes || 0.5);
    
    return (<div style={{
            display:'grid',
            height:'100%',
            gridTemplateColumns: '1fr',
            gridTemplateRows: `calc(${size*100}% - 5px) 10px 1fr`
        }}>
        {children[0]}
        <div style={{background:'red'}}></div>
        {children[1]}
    </div>)
}