import {useMemo} from 'react';
import {ConnectInfo, useConnectionStore} from '../store/connection';
import {CodeNode, useNodeStore} from '../store/node';
import {useVariableStore, VariableItem} from '@/visualeditor';
import {PersistStorage} from "@/visualeditor/utils/StorageRender";
import {useAppStore} from "@/store/app";

export function getChimeData(id: string) {
    return PersistStorage.getState(id, 'chime')
}

export async function loadHistory() {
    return await PersistStorage.getState('project', 'project')
}


export interface CodePersistData {
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
    const currentProject = useAppStore.getState().currentProject;
    if (!currentProject) {
        window.localStorage.setItem('codeData', JSON.stringify(getCurrentData()));
    } else {

        PersistStorage.setState(currentProject.id, {options: {chime: true}, data: getCurrentData()})
    }
}

export function loadFromLocalStorage() {
    const data = useAppStore.getState().currentProject?.chime;
    if (!data) {
        throw new Error('Cannot load info from localStorage');
    }
    console.log(data)
    load(data);
}

export function setCurrentData(data: CodePersistData) {
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

