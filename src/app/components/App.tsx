import React, { useState } from 'react';
import AddButton from './AddButton';
import DialogBox from './DialogBox';

const App: React.FC = () => {
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    // const handleAddButtonClick = () => {
    //     setIsDialogOpen(true);
    // };

    const closeDialog = () => {
        setIsDialogOpen(false);
    };

    return (
        <div className="App">
            <h1>Subscription Manager</h1>
            <AddButton />
            <DialogBox isOpen={isDialogOpen} onClose={closeDialog} />
        </div>
    );
};

export default App;