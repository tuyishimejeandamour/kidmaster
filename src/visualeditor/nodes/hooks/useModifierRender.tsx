import React from "react";
import {CodeNode, CodeNodeDefinition} from "../../store/node";

export default function useModifierRender(node: CodeNode | null, definition: CodeNodeDefinition | null) {
    if (!node || !definition) {
        return <></>;
    }

    return (
        <div className="w-full h-full bg-white">
            {definition.inputs.map((inputPin) => {
                if (inputPin.type == "port") {
                    return (
                        <>
                            {
                                inputPin.html ? React.createElement(inputPin.html, {
                                    key: node.id,
                                    nodeId: node.id
                                }) : null
                            }
                        </>
                    )
                } else {
                    return null
                }


            })}
        </div>
    )
}