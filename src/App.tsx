import React from 'react';
import './App.css';
import Ribon from './ribon';
import FileMenu from './fileMenu';
import { VerticalResizableArea, Area } from './components/resizableArea';

function App() {

  const [isFileMenuOpen, setFileMenu] = React.useState(false);
  
  const openFileMenu = React.useCallback(() => {
    setFileMenu(true);
  }, [setFileMenu]);

  const closeFileMenu = React.useCallback(() => {
    setFileMenu(false);
  }, [setFileMenu]);

  return (
    <div className="App">
      <Ribon onOpenFileMenu={openFileMenu}/>
      <FileMenu show={isFileMenuOpen} closeCallback={closeFileMenu}/>
      <VerticalResizableArea minSizes={[0.2, 0.2]}>
        <Area> test1 </Area>
        <Area> 
          <p>Aut harum debitis quo odit enim omnis voluptatum itaque. Quia est ullam assumenda nesciunt quas blanditiis repellendus. Nesciunt beatae voluptas voluptatem illum dolorem laboriosam dicta. Tempora sunt voluptatum molestiae sint. Fugiat perferendis odio ad esse nisi nobis ut distinctio.</p>
          <p>Quis magni provident et consectetur. Enim ea culpa sed quos et tempore. Dolore adipisci rem natus provident consequuntur et.</p>
          <p>Deleniti ut quae error dolor. Quia dicta similique est beatae earum mollitia. Et officiis qui tempore repudiandae. Doloribus quis minima commodi eos. Et consequuntur autem et. Tenetur qui voluptas voluptatem dolores laudantium.</p>
          <p>Sit voluptatem impedit modi. Dolor eligendi quaerat et. Et eligendi mollitia saepe praesentium. Voluptatem eius veritatis corporis aut reprehenderit velit. Saepe excepturi ut laudantium animi accusamus quo.</p>
          <p>Rerum aut neque omnis soluta repudiandae. Quis nihil quis velit repudiandae molestiae ut in consequuntur. Aut ut est blanditiis. Architecto et voluptatum quia accusamus quia. Qui qui mollitia necessitatibus dolore enim qui quia. Corporis voluptatibus sint est.</p>
        </Area>
      </VerticalResizableArea>
    </div>
  );
}

export default App;
