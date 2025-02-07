import React from 'react';

interface DialogProps {
    isOpen: boolean;
    onClose: () => void;
    title?: string;
    children: React.ReactNode;
}

const DialogTitle: React.FC<{ title?: string }> = ({ title }) => {
    return title ? <h2 className="text-lg font-bold">{title}</h2> : null;
};

const DialogHeader: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    return <div className="flex justify-between items-center border-b pb-2">{children}</div>;
};

const DialogContent: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    return <div className="mt-4">{children}</div>;
};

const Dialog: React.FC<DialogProps> = ({ isOpen, onClose, title, children }) => {
    if (!isOpen) return null; // Modale ne s'affiche pas si isOpen est false

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-light-gray-cb p-6 rounded-lg shadow-lg ">
                <DialogHeader>
                    <DialogTitle title={title} />
                    <button onClick={onClose} className="text-gray-500 hover:text-black">
                        ✖
                    </button>
                </DialogHeader>
                <DialogContent>{children}</DialogContent>
            </div>
        </div>
    );
};

export default Dialog;
