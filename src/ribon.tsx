import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import { ClipboardPasteRegular, CopyRegular, ArrowUndoRegular } from '@fluentui/react-icons'
import { BigButton, SmallButton, Divider } from './components/ribonPrimitives';

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
            <div>
                <TabPanel>
                    <BigButton
                        icon={<ClipboardPasteRegular fontSize={40}/>}
                        text="Paste"
                        showMenu={true}
                    />
                    <Divider />
                    <BigButton
                        icon={<CopyRegular fontSize={40}/>}
                        text="Copy"
                    />
                    <SmallButton 
                        icon={<ArrowUndoRegular fontSize={16}/>}
                        text="Undo"
                    />
                </TabPanel>
                <TabPanel>
                    <h2>View</h2>
                </TabPanel>
            </div>
        </Tabs>
    );
  }
  
  export default Ribon;