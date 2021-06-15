import React, { useContext } from 'react';
import { IconButton, Tooltip } from '@material-ui/core';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import LightThemeIcon from '@material-ui/icons/Brightness7';
import DarkThemeIcon from '@material-ui/icons/Brightness4';

import DarkThemeContext from '../DarkThemeContext/DarkThemeContext';

const DarkThemeSwitcher = ({ mobile }) => {
    const useStyles = makeStyles((theme) => ({
        darkThemeButton: {
            background: "none",
            border: "none",
        },
        darkThemeMobileButton: {
            [theme.breakpoints.up('sm')]: {
                display: "none",
            },
            [theme.breakpoints.down('sm')]: {
                background: "none",
                border: "none",
                display: "visible",
                paddingLeft: theme.spacing(2),
                minWidth: '25%'

            },
        },
        menuHeaderText: {
            minWidth: '97%',
        }
    }));



    const classes = useStyles();
    const { darkMode, setDarkMode } = useContext(DarkThemeContext);

    const handleLightThemeToggle = () => {
        setDarkMode(darkMode => !darkMode);
        console.log("dark mode is ", darkMode)
    };
    console.log("React.useContext(DarkThemeContext).darkMode ", React.useContext(DarkThemeContext).darkMode)

    return (
        mobile ?
        darkMode ?
            <Tooltip title="Light Mode" className={classes.darkThemeMobileButton} onClick={handleLightThemeToggle} >
                <IconButton aria-label="Light Mode">
                    <DarkThemeIcon />
                </IconButton>
            </Tooltip >
            :
            <Tooltip title="Dark Mode" className={classes.darkThemeMobileButton} onClick={handleLightThemeToggle} >
                <IconButton aria-label="Dark Mode">
                    <LightThemeIcon />
                </IconButton>
            </Tooltip>
        :
            darkMode ?
                <Tooltip title="Light Mode" className={classes.darkThemeButton} onClick={handleLightThemeToggle} >
                    <IconButton aria-label="Light Mode">
                        <DarkThemeIcon />
                    </IconButton>
                </Tooltip >
                :
                <Tooltip title="Dark Mode" className={classes.darkThemeButton} onClick={handleLightThemeToggle} >
                    <IconButton aria-label="Dark Mode">
                        <LightThemeIcon />
                    </IconButton>
                </Tooltip>
    )
}

export default DarkThemeSwitcher;
