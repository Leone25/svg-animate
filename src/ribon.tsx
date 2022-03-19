import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import { 
    ClipboardPasteRegular, 
    CopyRegular, 
    ArrowUndoRegular, 
    ArrowRedoRegular, 
    QuestionRegular, 
    GanttChartRegular, 
    LayerRegular, 
    OptionsRegular,
    CutRegular,
    CursorRegular,
    DataLine24Regular
} from '@fluentui/react-icons'
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
                    <VerticalAlign>
                        <SmallButton
                            icon={<CopyRegular fontSize={16}/>}
                            text="Copy"
                        />
                        <SmallButton
                            icon={<CutRegular fontSize={16}/>}
                            text="Cut"
                        />
                    </VerticalAlign>
                    <Divider />
                    <BigButton
                        icon={<CursorRegular fontSize={40}/>}
                        text="Select"
                    />
                    {/*This icon is temporary*/}
                    <BigButton
                        icon={<DataLine24Regular fontSize={40}/>}
                        text="Edit"
                    />
                </TabPanel>
                <TabPanel>
                    <SmallButton
                        icon={<GanttChartRegular fontSize={16}/>}
                        text="Timeline"
                    />
                    <SmallButton
                        icon={<LayerRegular fontSize={16}/>}
                        text="Layers"
                    />
                    <SmallButton
                        icon={<OptionsRegular />}
                        text="Object properties"
                    />
                </TabPanel>
            </div>
        </Tabs>
    );
  }
  
  export default Ribon;