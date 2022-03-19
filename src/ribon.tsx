import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import { ClipboardPasteRegular, CopyRegular, ArrowUndoRegular, ArrowRedoRegular, QuestionRegular } from '@fluentui/react-icons'
import { BigButton, SmallButton, Divider, VerticalAlign } from './components/ribonPrimitives';

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
                    <VerticalAlign>
                        <SmallButton 
                            icon={<ArrowUndoRegular fontSize={16}/>}
                            text="Undo"
                            showMenu={true}
                        />
                        <SmallButton 
                            icon={<ArrowRedoRegular fontSize={16}/>}
                            text="Redo"
                        />
                        <SmallButton 
                            icon={<QuestionRegular fontSize={16}/>}
                            text="Help"
                        />
                    </VerticalAlign>
                    <Divider />
                    <BigButton
                        icon={<ClipboardPasteRegular fontSize={40}/>}
                        text="Paste"
                        showMenu={true}
                    />
                    <SmallButton
                        icon={<CopyRegular fontSize={16}/>}
                        text="Copy"
                    />
                    <Divider />
                </TabPanel>
                <TabPanel>
                    <h2>View</h2>
                </TabPanel>
            </div>
        </Tabs>
    );
  }
  
  export default Ribon;