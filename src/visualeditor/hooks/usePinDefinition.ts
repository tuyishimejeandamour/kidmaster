import {CodeNodePinDefinition} from '../store/node';
import {useNodeInfo} from './useNodeInfo';

export function usePinDefinition(
    nodeId: string,
    pinName: string
): CodeNodePinDefinition | null {
    const {definition} = useNodeInfo(nodeId);

    if (!definition) {
        return null;
    }

    return definition.inputs.find((input) => input.name === pinName) ??
        definition.outputs.find((output) => output.name === pinName) ??
        null;
}
