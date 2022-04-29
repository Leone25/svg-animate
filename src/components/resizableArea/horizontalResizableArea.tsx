import { Props } from "./props"
import { useDrag } from "../../hooks/useDrag";

export function HorizontalResizableArea({
    children, 
    initialSize,
    minSizes = [[0, 0],[0, 0]],
    className,
    ...props
} : Props): JSX.Element {
    
    let {
        containerRef,
        size,
        startDrag,
    } = useDrag({
        initialSize,
        minSizes,
    });
    
    return (<div style={{gridTemplateColumns: `calc(${size[0]*100}% - 5px) 10px 1fr`}} className={'horizontal-resizable-area ' + className} ref={containerRef} {...props}>
        {children[0]}
        <div style={{background:'rgb(0, 20, 29)', cursor:'col-resize', display:'grid', justifyItems:'center', alignItems:'center'}} onMouseDown={startDrag}>
            <div style={{background:'#777', width:'3px', height:'80%', borderRadius:'4px'}}></div>
        </div>
        {children[1]}
    </div>)
}