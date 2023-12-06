import {CodeNode, CodeNodeDefinition, useNodeStore} from '../store/node';

export function useNodeInfo(nodeId: string): {
    node: CodeNode | null;
    definition: CodeNodeDefinition | null;
} {
    const {nodeMap, nodeDefinition} = useNodeStore((state) => ({
        nodeMap: state.nodeMap,
        nodeDefinition: state.nodeDefinition,
    }));
    const node = nodeMap[nodeId];

    if (!node) {
        return {
            node: null,
            definition: null,
        };
    }

    return {node, definition: nodeDefinition[node.name]};
}
