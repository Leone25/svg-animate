
function FileMenu({ closeCallback, show } : {
    closeCallback: () => void;
    show: boolean;
}) {
    return (
        <div className={"filemenu" + (show ? " open" : "")}>
            <div onClick={closeCallback}>return</div>
            fileMenu
        </div>
    );
  }
  
  export default FileMenu;