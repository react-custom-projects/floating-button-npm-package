import React from "react";
import {storiesOf} from "@storybook/react";
//components
import {FloatingButton} from "../components/FloatingButton/FloatingButton";

const stories = storiesOf('App Test', module);

stories.add('Floating button', () => {
    const buttons = [
        {
            icon: <i className="fas fa-home" />,
            click: () => console.log("clicked")
        },
        {
            icon: <i className="fas fa-briefcase" />,
            click: () => console.log("clicked")
        },
        {
            icon: <i className="fas fa-phone" />,
            click: () => console.log("clicked")
        }
    ];

    return (<FloatingButton
        location="top-left"
        buttons={buttons}
        mainButtonIcon={<i className="fas fa-info" />}
    />)
});
