import React, { useEffect, useState } from "react"
import { Typography } from '@material-ui/core';

import { useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';

import "./TypeWriter.css"


const CONSTANTS = {
    DELETING_SPEED: 50,
    TYPING_SPEED: 180,
}

export default function TypeWriter({ messages, heading }) {
    const theme = useTheme();
    const notMobile = useMediaQuery(theme.breakpoints.up('sm'));

    const [state, setState] = useState({
        text: "",
        message: "",
        isDeleting: false,
        loopNum: 0,
        typingSpeed: CONSTANTS.TYPING_SPEED,
    });

    useEffect(() => {
        let timer = "";
        const handleType = () => {
            setState(cs => ({
                ...cs, // cs means currentState
                text: getCurrentText(cs),
                typingSpeed: getTypingSpeed(cs)
            }));
            timer = setTimeout(handleType, state.typingSpeed);
        };
        handleType();
        return () => clearTimeout(timer);
    }, [state.isDeleting]);

    useEffect(() => {
        if (!state.isDeleting && state.text === state.message) {
            setTimeout(() => {
                setState(cs => ({
                    ...cs,
                    isDeleting: true
                }))
            }, 500);
        } else if (state.isDeleting && state.text === "") {
            setState(cs => ({
                ...cs, // cs means currentState
                isDeleting: false,
                loopNum: cs.loopNum + 1,
                message: getMessage(cs, messages)
            }));
        }
    }, [state.text, state.message, state.isDeleting, messages]);

    function getCurrentText(currentState) {
        return currentState.isDeleting
            ? currentState.message.substring(0, currentState.text.length - 1)
            : currentState.message.substring(0, currentState.text.length + 1);
    }

    function getMessage(currentState, data) {
        return data[Number(currentState.loopNum) % Number(data.length)];
    }

    function getTypingSpeed(currentState) {
        return currentState.isDeleting
            ? CONSTANTS.TYPING_SPEED
            : CONSTANTS.DELETING_SPEED;
    }

    return (
        <h1>
            {heading}&nbsp;
            <Typography style={{ 'display': 'inline-flex' }} Typography variant={notMobile ? "h2" : "h4"} component={notMobile ? "h3" : "h5"} gutterBottom>{state.text}</Typography>
            <span id="cursor" style={notMobile ? { 'padding-top': '12px', 'padding-bottom': '8px', 'margin-left': '1px' } : {}} />
        </h1>
    );
}
