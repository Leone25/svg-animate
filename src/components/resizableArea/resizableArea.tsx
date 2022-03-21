export function ResizableArea({children} : {children: React.ReactChild[]}) {
    console.log(children);
    return children && children.reduce((acc: React.ReactNode, child: React.ReactNode, i: Number, arr: React.ReactChild[] = []) => {
        return (<>
            {acc} 
            {child}
            {i === (arr || []).length - 1 || (<div>spacer</div>)}
        </>);
    }, (<></>));
}