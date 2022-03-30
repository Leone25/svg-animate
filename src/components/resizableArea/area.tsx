import React from "react";
import { Scrollbars } from 'react-custom-scrollbars-2';

export function Area({
    scrollable = true,
    children
} : {
    scrollable?: boolean,
    children: React.ReactNode
}) {
    function renderThumb({ style, ...props } : { style: React.CSSProperties }) {
        return (
            <div style={{ ...style, backgroundColor: 'rgb(0, 43, 63)', borderRadius: '4px' }} {...props}/>
        );
    }

    return (<div className='area'>
        {scrollable
        && (<Scrollbars style={{width:'100%', height:'100%'}} autoHide={true} renderThumbHorizontal={renderThumb} renderThumbVertical={renderThumb}>
            {children}
        </Scrollbars>)
        || (<div style={{width:'100%', height:'100%'}}>
            {children}
        </div>)}
    </div>)
}