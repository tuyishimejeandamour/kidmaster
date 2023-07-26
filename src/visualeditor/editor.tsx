import { Allotment } from 'allotment'
import { FlowEditor, builtinNodeDefinition, persist, regNode } from './'
import { useAppStore } from '../store/app'
import { initRegistry, preventDefault } from '../registry/init'
import { values } from 'lodash-es'

values(builtinNodeDefinition).map(regNode);
initRegistry();
preventDefault()

try {
  persist.loadFromLocalStorage();
} catch (err) {
  console.warn(err);
}


export default function Editor() {
  const { showSidebar } = useAppStore()

  return (
    <Allotment vertical={false} className="flex-1 w-full ease-linear transition h-[calc(100vh-44px)] flex flex-wrap">
       <Allotment.Pane preferredSize={"80%"} minSize={200} >
        <div className="min-w-[3/5] flex-1 relative bg-transparent mx-2 overflow-auto h-full">
          <FlowEditor />
        </div>
      </Allotment.Pane>

    </Allotment>
  )
}
