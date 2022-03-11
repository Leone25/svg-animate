import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import { ArrowLeft32Regular } from "@fluentui/react-icons";


function FileMenu({ closeCallback, show } : {
    closeCallback: () => void;
    show: boolean;
}) {
    return (
        <Tabs className={"filemenu" + (show ? " open" : "")}>
            <TabList>
                <div className="react-tabs__tab" onClick={closeCallback}><ArrowLeft32Regular /></div>
                <Tab>Open</Tab>
                <Tab>Info</Tab>
                <Tab>Save</Tab>
                <Tab>Export</Tab>
            </TabList>
            <div>
                <TabPanel>
                    Probably a button to open a file
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