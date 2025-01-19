import React, { useState } from 'react';
import DialogBox from './DialogBox';


const AddButton: React.FC = () => {
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    return (
        <div>
            <button className="add-button" style={{border: '1px solid #fff',}} onClick={() => setIsDialogOpen(true)}>+</button>
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