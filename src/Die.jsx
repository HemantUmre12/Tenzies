import React from "react"

export default function Die(props) {
    return (
        <div 
            className={"die" + (props.isHeld ? " hold" : "")} 
            onClick={props.handleClick}
        >
            {props.value}
        </div>
    )
}