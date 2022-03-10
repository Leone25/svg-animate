import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';

function Ribon({ onOpenFileMenu } : {
    onOpenFileMenu: () => void;
}) {
    return (
        <Tabs className="ribon">
            <TabList>
                <div className="react-tabs__tab" onClick={onOpenFileMenu}>File</div>
                <Tab>Home</Tab>
                <Tab>View</Tab>
            </TabList>
  
            <TabPanel>
                <h2>Home</h2>
            </TabPanel>
            <TabPanel>
                <h2>View</h2>
            </TabPanel>
        </Tabs>
    );
  }
  
  export default Ribon;