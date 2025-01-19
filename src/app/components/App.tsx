import React, { useState } from 'react';
import { AddButton, DialogBox } from './components';

const App: React.FC = () => {
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    const handleAddButtonClick = () => {
        setIsDialogOpen(true);
    };

    const closeDialog = () => {
        setIsDialogOpen(false);
    };

    return (
        <div className="App">
            <h1>Subscription Manager</h1>
            <AddButton onClick={handleAddButtonClick} />
            {isDialogOpen && <DialogBox onClose={closeDialog} />}
        </div>
    );
};

export default App;