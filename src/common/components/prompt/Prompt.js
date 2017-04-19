import React from "react";
import {render} from "react-redux";

if(process.env.BUILD_TARGET == "browser"){
    require("./styles/promptStyles.scss");
}

/**
 * Prompt window
 */
export default class Prompt extends React.Component{

    render(){
        if(!this.props.display){
            return (<div className="prompt"></div>);
        } else {
            return (
                <div className="prompt displayPrompt">
                    <div className="promptWindow">
                        <div className="promptBar">
                            <h3>{this.props.title}</h3>
                            <div onClick={() => {this.props.closePrompt();}}>
                                X
                            </div>
                        </div>
                        {this.props.content}
                    </div>
                </div>
            );
        }
    }
}
