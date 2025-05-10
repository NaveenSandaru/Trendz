import React from "react";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import ErrorIcon from '@mui/icons-material/Error';
import { Button } from "@mui/material";
import "./../styles/popup.css";

export function Popup({ type, heading, message, onClose }) {
    let Icon;
    let color;

    switch (type) {
        case 'success':
            Icon = CheckCircleIcon;
            color = "#4caf50";
            break;
        case 'error':
            Icon = CancelIcon;
            color = "#f44336";
            break;
        case 'warning':
            Icon = ErrorIcon;
            color = "#ff9800";
            break;
        default:
            Icon = ErrorIcon;
            color = "#999";
    }

    return (
        <div className="popupOverlay">
            <div className="popup">
                <div className="headingSection">
                    <div className="iconSection" style={{ color }}>
                        <Icon fontSize="large" />
                    </div>
                    <div className="headingTextSection">
                        <h3>{heading}</h3>
                    </div>
                </div>
                <div className="messageSection">
                    <p>{message}</p>
                </div>
                <div className="buttonSection">
                    <Button variant="outlined" onClick={onClose}>OK</Button>
                </div>
            </div>
        </div>
    );
}
