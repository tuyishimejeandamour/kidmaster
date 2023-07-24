
import React from "react";
import { CodeckNode, CodeckNodeDefinition } from "../../store/node";

export default function useModifierRender(node: CodeckNode | null, definition: CodeckNodeDefinition | null) {
    if (!node || !definition) {
        return <></>;
    }

    return (
        <div className="w-full h-full bg-white">
            {definition.inputs.map((inputPin) => {
                if (inputPin.type=="port") {
                    return (
                       <>
                         {
                         inputPin.html ? React.createElement(inputPin.html,{key:node.id,nodeId:node.id}) : null
                         }
                       </>
                    )
                }else{
                    return null
                }


            })}
        </div>
    )
}