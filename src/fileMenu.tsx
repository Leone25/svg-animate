import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import { 
    ArrowLeft32Regular,
    Save16Regular,
    Info16Regular,
    FolderOpen16Regular,
    ArrowExportLtr16Regular,
 } from "@fluentui/react-icons";


function FileMenu({ closeCallback, show } : {
    closeCallback: () => void;
    show: boolean;
}) {
    return (
        <Tabs className={"filemenu" + (show ? " open" : "")}>
            <TabList>
                <div className="react-tabs__tab" onClick={closeCallback}><ArrowLeft32Regular /></div>
                <Tab>Open <FolderOpen16Regular className="icon" /></Tab>
                <Tab>Info <Info16Regular className="icon" /></Tab>
                <Tab>Save <Save16Regular className="icon" /></Tab>
                <Tab>Export <ArrowExportLtr16Regular className="icon" /></Tab>
            </TabList>
            <div>
                <TabPanel>
                  Commit id: {import.meta.env.VITE_MY_VERCEL_GIT_COMMIT_SHA || "unknown"}
                </TabPanel>
                <TabPanel>
                    Idk man
                </TabPanel>
                <TabPanel>
                    Likely save options
                </TabPanel>
                <TabPanel>
                    Make vector go brrrrr
                </TabPanel>
            </div>
        </Tabs>
    );
  }
  
  export default FileMenu;