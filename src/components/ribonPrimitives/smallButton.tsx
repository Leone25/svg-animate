import { useState, useCallback } from "react";
import { ChevronDown12Regular } from '@fluentui/react-icons'

export function SmallButton({ icon, text, children, showMenu = false, active = false, onClick, onMenuOpen, onMenuClose } : {
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
            <div className={'small-button' + (isMenuOpen ? ' active' : '')} title={text}>
                {icon}
                {showMenu && (<div className='small-button__menu' onClick={handleMenuClick} title={text + " menu"}>
                    <ChevronDown12Regular />
                </div>)}
            </div>
            {isMenuOpen && (
                <div className='small-button__menu-window'>
                    {children}
                </div>
            )}
        </>
    );
}