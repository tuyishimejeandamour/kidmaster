import React, { useEffect, useRef, useState } from 'react';
import { Stage, Transformer } from 'react-konva';
import Konva from 'konva';
import { GridLayer } from './GridLayer';
import { useMemoizedFn, useSize } from 'ahooks';
import { useStageStore } from '@/visualeditor';
import { NodeLayer } from './NodeLayer';
import { ConnectionLayer } from './ConnectionLayer';
import { ContextMenuWrapper } from '../ContextMenu';
import { useStage } from '../../hooks/useStage';
import { useUIStore } from '../../store/ui';
import '../../nodes/__all__';
import {
  resetFlowEditorCursorStyle,
  setFlowEditorCursorStyle,
} from '../../utils/pointer-helper';
import { SelectionLayer } from './SelectionLayer';
import { useConnectionStore } from '@/visualeditor';
import { Allotment, LayoutPriority } from 'allotment';
import Selected from './selected';
import Sidebar from '../sidebar/sidebar';
import SettingsActions from '../sidebar/edit';

const scaleBy = 1.05;

export const FlowEditor: React.FC = React.memo(() => {

  const { width, height, scale, setStageRef, setSize, position } =
    useStageStore();



  const stageRef = useRef<Konva.Stage>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const transformerRef = useRef(null);

  const size = useSize(containerRef.current);
  const { draggable, handleWheel, handleUpdatePos } = useStageEventHandler();
  const { showSideEditor, setShowSideEditor } = useUIStore()

  const handleResize = (ev: UIEvent) => {

    if (window.innerWidth < 900) {
      if (showSideEditor) setShowSideEditor(false)

    }
  }
  const handleDrag = (e: Konva.KonvaEventObject<DragEvent>) => {
    handleUpdatePos(e)
  }
  useEffect(() => {
    if (size) {
      const width = size.width < 3000 ? 3270 : size.width
      const height = size.height < 1000 ? 1220 : size.height
      setSize(width, height);
    }
    window.addEventListener("resize", handleResize)

    return () => {
      window.removeEventListener("resize", handleResize)

    }
  }, [size]);

  useEffect(() => {
    setStageRef(stageRef.current);
  }, []);

  return (
    <Allotment className="flex-1 w-full h-[calc(100vh-44px)] px-2 flex flex-wrap">
      <Allotment.Pane preferredSize={"100%"} className='scroll_show' minSize={200} >
        <Allotment vertical={true}>
          <Allotment.Pane>
            <ContextMenuWrapper
              ref={containerRef}
              style={{ height: 'calc(100%)', width: '100%' }}
              className="overflow-auto container_scroll bg-transparent"
            >
              <Stage
                ref={stageRef}
                className="flow-editor"
                style={{ height: '100%', width: '100%', overflow: "auto" }}
                width={width}
                height={height}
                scale={scale}
                x={position.x}
                y={position.y}
                onWheel={handleWheel}
                onDragMove={handleDrag}
                onDragEnd={handleDrag}
                draggable={draggable}
              >

                <GridLayer />
                <NodeLayer />
                <ConnectionLayer />
                <SelectionLayer />
              </Stage>
            </ContextMenuWrapper>
          <div className=" absolute  right-4 min-w-[6rem]  top-1">
              <SettingsActions />
          </div>
          </Allotment.Pane>
          <Allotment.Pane snap={true} preferredSize={"30%"}>
            <div className='w-full h-full bg-transparent border-t z-40 border-gray-300'>
              <Sidebar />
            </div>
          </Allotment.Pane>
        </Allotment>

      </Allotment.Pane>
      <Allotment.Pane priority={LayoutPriority.Low} snap={true} maxSize={showSideEditor ? 305 : 0} minSize={showSideEditor ? 305 : 0}>
        <div className=" bg-transparent h-full overflow-auto">
          <Selected />
        </div>
      </Allotment.Pane>
    </Allotment>
  );
});
FlowEditor.displayName = 'FlowEditor';

function useStageEventHandler() {
  const { setScale, setPosition } = useStageStore();
  const [draggable, setDraggable] = useState(false);

  const handleWheel = useMemoizedFn((e: Konva.KonvaEventObject<WheelEvent>) => {
    e.evt.preventDefault();
    const stage = e.target as Konva.Stage;
    if (!stage) {
      return;
    }
    const oldScale = stage.scaleX();
    const pointer = stage.getPointerPosition();
    if (!pointer || !e.evt.ctrlKey) {
      return;
    }

    const mousePointTo = {
      x: (pointer.x - stage.x()) / oldScale,
      y: (pointer.y - stage.y()) / oldScale,
    };

    // how to scale? Zoom in? Or zoom out?
    let direction = e.evt.deltaY > 0 ? 1 : -1;

    // when we zoom on trackpad, e.evt.ctrlKey is true
    // in that case lets revert direction
    // if (e.evt.ctrlKey) {
    //   direction = -direction;
    // }
    const newScale = direction > 0 ? oldScale * scaleBy : oldScale / scaleBy;

    setScale(newScale);

    const newPos = {
      x: pointer.x - mousePointTo.x * newScale,
      y: pointer.y - mousePointTo.y * newScale,
    };
    setPosition(newPos);
  });

  const handleUpdatePos = useMemoizedFn(
    (e: Konva.KonvaEventObject<DragEvent>) => {
      console.log(e.target.position())
      setPosition(e.target.position());
    }
  );

  /**
   * Stage 事件
   */
  useStage((stage) => {

    const handleClick = (e: Konva.KonvaEventObject<MouseEvent>) => {
      useUIStore.getState().clearSelectedStatus();
    };

    const handleMouseUp = (e: Konva.KonvaEventObject<MouseEvent>) => {
      useConnectionStore.getState().cancelConnect();
    };
    const handleContextMenu = (e: Konva.KonvaEventObject<MouseEvent>) => {
      e.cancelBubble = true
      useUIStore.getState().setContextMenu("stage")

    }

    stage.on('click', handleClick);
    stage.on('mouseup', handleMouseUp);
    stage.on("contextmenu", handleContextMenu)


    return () => {
      stage.off('click', handleClick);
      stage.off('mouseup', handleMouseUp);
      stage.off("contextmenu", handleContextMenu)

    };
  });

  /**
   * window事件
   */
  useStage((stage) => {
    const container = stage.container();
    if (!container) {
      return;
    }

    const handleKeydown = (e: KeyboardEvent) => {
      if (e.code === 'Delete') {
        useUIStore.getState().deleteAllSelected();
        return;
      }

      if (e.code === 'KeyF') {
        useStageStore.getState().focus();
        return;
      }

      if (e.code === 'Space') {
        setDraggable(true);
        setFlowEditorCursorStyle('grab');
        return;
      }
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      if (e.code === 'Space') {
        setDraggable(false);
        resetFlowEditorCursorStyle();
        return;
      }
    };

    window.addEventListener('keydown', handleKeydown);
    window.addEventListener('keyup', handleKeyUp);

    return () => {
      window.removeEventListener('keydown', handleKeydown);
      window.removeEventListener('keyup', handleKeyUp);

    };
  });

  return { draggable, handleWheel, handleUpdatePos };
}


