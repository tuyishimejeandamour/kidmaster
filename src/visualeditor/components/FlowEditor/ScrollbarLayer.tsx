import React from 'react';
import {Layer, Rect} from 'react-konva';
import {useStageStore} from '../../store/stage';
import {Node, NodeConfig} from 'konva/lib/Node';
import {Vector2d} from 'konva/lib/types';
import Konva from 'konva';


const PADDING = 5;
export const ScrollLayer: React.FC = React.memo(() => {
    const {width, height} = useStageStore()

    function DounceVertical(this: Node<NodeConfig>, pos: Vector2d) {
        pos.x = width - PADDING - 10;
        pos.y = Math.max(
            Math.min(pos.y, height - this.height() - PADDING),
            PADDING
        );
        return pos;
    }

    const handleDragMove = (e: Konva.KonvaEventObject<DragEvent>) => {
        const bar = e.target as Konva.Rect
        if (!bar) {
            return;
        }
        const availableHeight =
            height - PADDING * 2 - bar.height();
        var delta = (bar.y() - PADDING) / availableHeight;

        // layer.y(-(3000 - height) * delta);
    }

    return (
        <Layer>
            <Rect
                onDragMove={handleDragMove}
                width={10}
                height={100}
                fill={'grey'}
                opacity={0.8}
                x={width - PADDING - 10}
                y={PADDING}
                draggable={true}
                dragBoundFunc={DounceVertical}
            />
            <Rect

            />
        </Layer>
    );
});
ScrollLayer.displayName = 'SelectionLayer';
