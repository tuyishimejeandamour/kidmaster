import {create} from 'zustand';
import {CodeNodePortType} from './node';
import {immer} from 'zustand/middleware/immer';
import {generateNodeId} from '../utils/string-helper';
import {uniqBy, without} from 'lodash-es';
import {useUIStore} from './ui';

export interface ConnectInfo {
    id: string;
    fromNodeId: string;
    fromNodePinName: string;
    toNodeId: string;
    toNodePinName: string;
    space: string;
}

export type PinDirection =
    | 'out-in'
    | 'in-out';

interface ConnectionState {
    connections: ConnectInfo[];
    workingConnection: {
        fromNodeId: string;
        fromNodePinName: string;
        fromNodePinType: CodeNodePortType;
        fromNodeDirection: PinDirection;
    } | null;
    recentConnection: {
        fromNodeId: string;
        fromNodePinName: string;
        fromNodePinType: CodeNodePortType;
        fromNodeDirection: PinDirection;
    } | null;
    startConnect: (
        fromNodeId: string,
        fromNodePinName: string,
        fromNodePinType: CodeNodePortType,
        fromNodeDirection: PinDirection
    ) => void;
    endConnect: (
        toNodeId: string,
        toNodePinName: string,
        toNodePinType: CodeNodePortType,
        toNodeDirection: PinDirection
    ) => void;
    cancelConnect: () => void;
    checkIsConnected: (nodeId: string, pinName: string) => boolean;
    removeConnection: (connectionId: string) => void;
    removeConnectionByPinName: (nodeId: string, pinName: string) => void;
    getConnectionInstance: (nodeId: string, pinName: string) => ConnectInfo;
}

export const useConnectionStore = create<ConnectionState>()(
    immer((set, get) => ({
        connections: [] as ConnectInfo[],
        workingConnection: null,
        recentConnection: null,
        startConnect: (
            fromNodeId,
            fromNodePinName,
            fromNodePinType,
            fromNodeDirection
        ) => {
            const {workingConnection} = get();
            if (workingConnection) {
                return;
            }

            set({
                workingConnection: {
                    fromNodeId,
                    fromNodePinName,
                    fromNodePinType,
                    fromNodeDirection,
                },
                recentConnection: {
                    fromNodeId,
                    fromNodePinName,
                    fromNodePinType,
                    fromNodeDirection,
                }
            });


        },
        endConnect: (toNodeId, toNodePinName, toNodePinType, toNodeDirection) => {
            const {workingConnection, cancelConnect} = get();

            if (!workingConnection) {
                return;
            }

            const {
                fromNodeId,
                fromNodePinName,
                fromNodePinType,
                fromNodeDirection,
            } = workingConnection;

            if (toNodeId === fromNodeId) {
                cancelConnect();
                return;
            }

            if (toNodeDirection === fromNodeDirection) {
                cancelConnect();
                return;
            }

            if (toNodePinType !== fromNodePinType) {
                cancelConnect();
                return;
            }

            set((state) => {
                if (fromNodePinType === 'exec') {
                    const list = state.connections.filter(
                        (conn) =>
                            (conn.fromNodeId === fromNodeId &&
                                conn.fromNodePinName === fromNodePinName) ||
                            (conn.toNodeId === fromNodeId &&
                                conn.toNodePinName === fromNodePinName) ||
                            (conn.fromNodeId === toNodeId &&
                                conn.fromNodePinName === toNodePinName) ||
                            (conn.toNodeId === toNodeId &&
                                conn.toNodePinName === toNodePinName)
                    );

                    if (list.length > 0) {
                        state.connections = without(state.connections, ...list); // 移除不能多连的旧的连线
                    }
                } else if (fromNodePinType === 'port') {
                    let list: ConnectInfo[] = [];
                    if (fromNodeDirection === 'out-in') {
                        list = state.connections.filter(
                            (conn) =>
                                conn.toNodeId === toNodeId &&
                                conn.toNodePinName === toNodePinName
                        );
                    } else if (fromNodeDirection === 'in-out') {
                        list = state.connections.filter(
                            (conn) =>
                                conn.toNodeId === fromNodeId &&
                                conn.toNodePinName === fromNodePinName
                        );
                    }

                    if (list.length > 0) {
                        state.connections = without(state.connections, ...list); // 移除不能多连的旧的连线
                    }
                }

                state.connections.push(
                    fromNodeDirection === 'out-in'
                        ? {
                            id: generateNodeId(),
                            fromNodeId: fromNodeId,
                            fromNodePinName: fromNodePinName,
                            space: useUIStore.getState().activeSpace.name,
                            toNodeId: toNodeId,
                            toNodePinName: toNodePinName,
                        }
                        : {
                            id: generateNodeId(),
                            fromNodeId: toNodeId,
                            fromNodePinName: toNodePinName,
                            toNodeId: fromNodeId,
                            space: useUIStore.getState().activeSpace.name,
                            toNodePinName: fromNodePinName,
                        }
                );

                state.connections = uniqBy(state.connections, (item) =>
                    [
                        item.fromNodeId,
                        item.fromNodePinName,
                        item.toNodeId,
                        item.toNodePinName,
                    ].join('|')
                );
            });

            cancelConnect();
        },
        cancelConnect: () => {
            set({
                workingConnection: null,
            });
        },
        checkIsConnected: (nodeId, pinName) => {
            const {connections, workingConnection} = get();
            if (
                workingConnection &&
                workingConnection.fromNodeId === nodeId &&
                workingConnection.fromNodePinName === pinName
            ) {
                return true;
            }

            return connections.some(
                (c) =>
                    (c.fromNodeId === nodeId && c.fromNodePinName === pinName) ||
                    (c.toNodeId === nodeId && c.toNodePinName === pinName)
            );
        },
        getConnectionInstance: (nodeId, pinName) => {
            let connection = null;
            set((state) => {
                const index = state.connections.findIndex(
                    (conn) => conn.toNodeId == nodeId && conn.toNodePinName == pinName
                )
                if (index >= 0) {
                    connection = state.connections[index];
                }
            })
            return connection as unknown as ConnectInfo
        },
        removeConnection: (connectionId) => {
            set((state) => {
                const index = state.connections.findIndex(
                    (conn) => conn.id === connectionId
                );
                if (index >= 0) {
                    state.connections.splice(index, 1);
                }
            });
        },
        removeConnectionByPinName: (nodeId, pinName) => {
            set((state) => {
                const index = state.connections.findIndex(
                    (conn) => conn.toNodeId == nodeId && conn.toNodePinName == pinName
                )
                if (index >= 0) {
                    state.connections.splice(index, 1);
                }
            })

        }
    }))
);
