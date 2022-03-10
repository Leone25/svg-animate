
function FileMenu({ closeCallback, show } : {
    closeCallback: () => void;
    show: boolean;
}) {
    return (
        <div className={"filemenu" + (show ? " open" : "")}>
            <div className="left">
                <div onClick={closeCallback}>return</div>
            </div>
            
            fileMenu
        </div>
    );
  }
  
  export default FileMenu;