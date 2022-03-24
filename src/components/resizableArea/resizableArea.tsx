import { useState } from "react";

export function ResizableArea({
    children, 
    initialSizes
} : {
    children: React.ReactChild[],
    initialSizes?: number[]
}) {
    console.log(children);

    let [sizes, setSizes] = useState(initialSizes || new Array(children.length-1).fill(1/(children.length-1)));
    
    return (<div style={{
            display:'grid',
            height:'100%',
            gridTemplateColumns: '1fr',
            gridTemplateRows: sizes.reduce((acc: String, child: number, i: number, arr: number[] = []) => acc + String(child*100) + '% 10px ', '') + '1fr'
        }}>
        {children && children.reduce((acc: React.ReactNode, child: React.ReactNode, i: Number, arr: React.ReactChild[] = []) => {
            return (<>
                {acc} 
                {child}
                {i === (arr || []).length - 1 || (<div style={{background: 'red'}}></div>)}
            </>);
        }, (<></>))}
    </div>)
}