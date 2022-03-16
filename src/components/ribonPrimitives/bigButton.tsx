import { useState, useCallback } from "react";
import { ChevronDown12Regular } from '@fluentui/react-icons'

export function BigButton({ icon, text, children, showMenu = false, active = false, onClick, onMenuOpen, onMenuClose } : {
    icon: React.ReactNode,
    text: string,
    children?: React.ReactChildren[],
    active?: boolean,
    showMenu?: boolean,
    onClick?: () => void,
    onMenuOpen?: () => void,
    onMenuClose?: () => void,
}) {

    const [isMenuOpen, setIsMenuOpen] = useState(false);
    
    const handleMenuClick = useCallback(() => {
        setIsMenuOpen(!isMenuOpen);
        isMenuOpen ? onMenuClose?.() : onMenuOpen?.();
    }, [isMenuOpen, onMenuOpen, onMenuClose]);

    return (
        <>
            <div className={'big-button' + (isMenuOpen ? ' active' : '')} >
                {icon}
                {text}
                {showMenu && (<div className='big-button__menu' onClick={handleMenuClick}>
                    <ChevronDown12Regular />
                </div>)}
            </div>
            {isMenuOpen && (
                <div className='big-button__menu-window'>
                    {children}
                </div>
            )}
        </>
    );
}