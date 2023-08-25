import { toast as Message } from "react-toastify";
import { useMemoizedFn } from "ahooks";
import Fuse from "fuse.js";
import Konva from "konva";
import { values, keys } from "lodash-es";
import { useRef, useEffect, useMemo } from "react";
import { useNodeStore, useStageStore, useUIStore, useVariableStore } from "@/visualeditor";

export function useNodes() {
    const { nodeDefinition, createNode } = useNodeStore();
    const {searchValue,activeSpace, search:setSearchValue} = useUIStore();
    const { getRelativePointerPosition } = useStageStore();
    const { variableMap } = useVariableStore();
    const nodeCreatedPosRef = useRef<Konva.Vector2d | null>(null);


    useEffect(() => {
        nodeCreatedPosRef.current = getRelativePointerPosition();

    }, []);
    const search = (value: string) => {
        setSearchValue(value)
    }

    const handleCreateNode = useMemoizedFn(
        (nodeName: string, data?: Record<string, any>) => {
            if (!nodeName) {
                Message.error('Node Name undefined');
                return;
            }

            if (!nodeCreatedPosRef.current) {
                Message.error('Cannot get pointer position');
                return;
            }
                        
            createNode(nodeName, nodeCreatedPosRef.current, data);

        }
    );

    const list = useMemo(
        () => values(nodeDefinition).filter((definiton) => !definiton.hidden),
        [nodeDefinition]
    );

    const variableList = useMemo(() => keys(variableMap), [variableMap]);

    const fuse = useMemo(
        () =>
            new Fuse(list, {
                keys: ['label'],
            }),
        [list]
    );

    const variableFuse = useMemo(() => new Fuse(variableList), [variableList]);

    const matchedNode =
        searchValue === '' ? list : fuse.search(searchValue).map((res) => res.item);

    const matchedVariable =
        searchValue === ''
            ? variableList
            : variableFuse.search(searchValue).map((res) => res.item);

    return { handleCreateNode, matchedNode, matchedVariable, search, searchValue };
}
