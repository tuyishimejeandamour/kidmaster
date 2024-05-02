import React from 'react';
import {Layer} from 'react-konva';
import {useNodeStore} from '@/visualeditor';
import {values} from 'lodash-es';
import {useUIStore} from '../../store/ui';

export const NodeLayer: React.FC = React.memo(() => {
    const {nodeMap, nodeDefinition} = useNodeStore();
    const {activeSpace} = useUIStore()

    return (
        <Layer
            id='nodes'
        >
            {values(nodeMap).map((node) => {
                const def = nodeDefinition[node.name];

                if (!def) {
                    console.warn('Not found node:', node.name);

                    return null;
                }
                if (activeSpace.space === "group") {
                    if (node.space === activeSpace.name) {
                        const component = def.component;
                        return React.createElement(component, {key: node.id, id: node.id});
                    }
                    return null

                } else if (activeSpace.space === "main" && (node.space === "main" || typeof node.space == "undefined")) {
                    const component = def.component;

                    return React.createElement(component, {key: node.id, id: node.id});
                }

            })}
        </Layer>
    );
});
NodeLayer.displayName = 'NodeLayer';
