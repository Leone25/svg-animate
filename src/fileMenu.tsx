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
                <Tab>one</Tab>
                <Tab>two</Tab>
                <Tab>three</Tab>
                <Tab>four</Tab>
            </TabList>
            <div>
                <TabPanel>
                    fileMenu1
                </TabPanel>
                <TabPanel>
                    fileMenu2
                </TabPanel>
                <TabPanel>
                    fileMenu3
                </TabPanel>
                <TabPanel>
                    fileMenu4
                </TabPanel>
            </div>
        </Tabs>
    );
  }
  
  export default FileMenu;