import {useMemo} from 'react';
import {ConnectInfo, useConnectionStore} from '../store/connection';
import {CodeNode, useNodeStore} from '../store/node';
import {useVariableStore, VariableItem} from '@/visualeditor';

interface CodePersistData {
    modules: Record<
        string,
        {
            nodeMap: Record<string, CodeNode>;
            connections: ConnectInfo[];
            variable: Record<string, VariableItem>;
        }
    >;
}

export function getCurrentData(): CodePersistData {
    return {
        modules: {
            entry: {
                nodeMap: useNodeStore.getState().nodeMap,
                connections: useConnectionStore.getState().connections,
                variable: useVariableStore.getState().variableMap,
            },
        },
    };
}

export function usePersistData(): CodePersistData {
    const nodeMap = useNodeStore((state) => state.nodeMap);
    const connections = useConnectionStore((state) => state.connections);
    const variableMap = useVariableStore((state) => state.variableMap);

    return useMemo(() => getCurrentData(), [nodeMap, connections, variableMap]);
}

export function load(data: CodePersistData) {
    if (!data.modules.entry) {
        throw new Error('Not found entry module');
    }

    useNodeStore.setState({
        nodeMap: data.modules.entry.nodeMap,
    });
    useConnectionStore.setState({
        connections: data.modules.entry.connections,
    });
    useVariableStore.setState({
        variableMap: data.modules.entry.variable,
    });
}

export function saveIntoLocalStorage() {
    window.localStorage.setItem('codeData', JSON.stringify(getCurrentData()));
}

export function loadFromLocalStorage() {
    const data = window.localStorage.getItem('codeData');
    if (!data) {
        throw new Error('Cannot load info from localStorage');
    }

    load(JSON.parse(data));
}
