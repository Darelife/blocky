import React, { useState } from 'react';
import DialogBox from './DialogBox';

const AddButton: React.FC = () => {
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    return (
        <div className="add-button-container">
            <button className="add-button" onClick={() => setIsDialogOpen(true)} style={{border: '1px solid #fff',}}>+</button>
            {isDialogOpen && (
                <DialogBox
                    isOpen={isDialogOpen}
                    onClose={() => setIsDialogOpen(false)}
                />
            )}
        </div>
    );
};

export default AddButton;