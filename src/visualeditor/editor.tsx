import {Allotment} from 'allotment'
import {builtinNodeDefinition, FlowEditor, persist, regNode} from './'
import {initRegistry, preventDefault} from '@/registry/init'
import {values} from 'lodash-es'
import {useEffect} from 'react';
import {useAppStore} from '@/store/app';
import {useNavigate} from 'react-router-dom';

values(builtinNodeDefinition).map(regNode);
await initRegistry();
preventDefault()

try {
    persist.loadFromLocalStorage();
} catch (err) {
    console.warn(err);
}


export default function Editor() {
    const router = useNavigate();
    useEffect(() => {
        if (!useAppStore.getState().currentProject) {
            router('/');
        }
    }, [])
    return (
        <Allotment vertical={false}
                   className="flex-1 w-full ease-linear transition h-[calc(100vh-44px)] flex flex-wrap">
            <Allotment.Pane preferredSize={"80%"} minSize={200}>
                <div className="min-w-[3/5] flex-1 relative bg-transparent mx-2 overflow-auto h-full">
                    <FlowEditor/>
                </div>
            </Allotment.Pane>

        </Allotment>
    )
}
