/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
import { ethers, providers, utils } from 'ethers';
import { CONTRACT_ADDRESS } from '../constants';
import SubscriptionManagerABI from './SubscriptionManagerABI.json';

interface DialogBoxProps {
    isOpen: boolean;
    onClose: () => void;
}

const DialogBox: React.FC<DialogBoxProps> = ({ isOpen, onClose }) => {
    const [name, setName] = React.useState('');
    const [cost, setCost] = React.useState('');
    const [website, setWebsite] = React.useState('');
    const [beneficiary, setBeneficiary] = React.useState('');
    const [interval, setInterval] = React.useState<number | null>(null);

    const handleSubmit = async () => {
        if(!window.ethereum) {
            alert('Please install MetaMask');
            return;
        }

        if(!name || !cost || !website || !beneficiary || interval === null) {
            alert('Please fill out all fields');
            return;
        }

        if(!utils.isAddress(beneficiary)) {
            alert('Invalid beneficiary address');
            return;
        }
        try{
            const provider = new providers.Web3Provider(window.ethereum);
            const signer = provider.getSigner();
            console.log(CONTRACT_ADDRESS);
            const contract = new ethers.Contract(CONTRACT_ADDRESS, SubscriptionManagerABI, signer);

            // TODO: Fix the function signature
            const tx = await contract.createSubscription(beneficiary, ethers.utils.parseUnits(cost, 'wei'), interval);
            await tx.wait();
            alert('Subscription created');
            onClose();
        } catch (e) {
            console.error(e);
            alert('An error occurred');
        }


    };


    if (!isOpen) return null;

    return (
        <div className="dialog-overlay text-[#121212]" onClick={onClose}>
            <div className="dialog-box" onClick={(e) => e.stopPropagation()}>
                <h2 className="dialog-header">Add Subscription</h2>
                <label className="dialog-input-label">
                    Name:
                    <input className="dialog-input"
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </label>
                <label className="dialog-input-label">
                    Website:
                    <input className="dialog-input"
                        type="text"
                        value={website}
                        onChange={(e) => setWebsite(e.target.value)}
                    />
                </label>
                <label className="dialog-input-label">
                    Cost:
                    <input
                        className="cost-input dialog-input"
                        type="text"
                        value={cost}
                        onChange={(e) => setCost(e.target.value)}
                    />
                    <label className="in-wei-label" htmlFor="cost-input">(in wei)</label>
                </label>
                <label className="dialog-input-label">
                    Beneficiary Address:
                    <input className="dialog-input"
                        type="text"
                        value={beneficiary}
                        onChange={(e) => setBeneficiary(e.target.value)}
                    />
                </label>
                <label className="dialog-input-label">
                    Interval:
                    <div className="radio-group">
                        <label>
                            <input
                                type="radio"
                                name="interval"
                                value={2592000} // 30 days in seconds
                                checked={interval === 2592000}
                                onChange={(e) => setInterval(Number(e.target.value))}
                            />
                            30 days
                        </label>
                        <label>
                            <input
                                type="radio"
                                name="interval"
                                value={31536000} // 365 days in seconds
                                checked={interval === 31536000}
                                onChange={(e) => setInterval(Number(e.target.value))}
                            />
                            365 days
                        </label>
                    </div>
                </label>
                <div className="button-container">
                    <button className="dialog-button" onClick={handleSubmit}>Submit</button>
                    <button className="dialog-button" onClick={onClose}>Cancel</button> 
                </div>
                
            </div>
        </div>
    );
};

//TODO: Fix the CSS of the radio group

export default DialogBox;