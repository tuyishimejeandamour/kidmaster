import {useStage} from '../../hooks/useStage';
import Konva from 'konva';
import React, {useState} from 'react';
import {Circle, Ellipse, Layer} from 'react-konva';

export const HeroLayer: React.FC = React.memo(() => {

    const [cursorPos, setCursorPos] = useState({x: 0, y: 0});


    useStage((stage) => {

        const handleMouseMove = (
            event: Konva.KonvaEventObject<MouseEvent>
        ) => {
            setCursorPos({x: event.evt.clientX, y: event.evt.clientY});
        }
        stage.on('mousemove', handleMouseMove);

        return () => {
            stage.off('mousemove', handleMouseMove);
        };
    });

    return (
        <Layer>
            {/* Superman logo */}
            <Ellipse
                x={150}
                y={150}
                radiusX={100}
                radiusY={70}
                fill="blue"
            />
            <Ellipse
                x={150}
                y={150}
                radiusX={60}
                radiusY={40}
                fill="red"
            />

            {/* Left eye */}
            <Circle
                x={110}
                y={120}
                radius={10}
                fill="white"
                shadowBlur={5}
                shadowOffset={{x: 2, y: 2}}
                shadowOpacity={0.5}
                listening={false}
            />
            <Circle
                x={cursorPos.x < 110 ? cursorPos.x : 110}
                y={cursorPos.y < 120 ? cursorPos.y : 120}
                radius={5}
                fill="black"
                listening={false}
            />

            {/* Right eye */}
            <Circle
                x={190}
                y={120}
                radius={10}
                fill="white"
                shadowBlur={5}
                shadowOffset={{x: 2, y: 2}}
                shadowOpacity={0.5}
                listening={false}
            />
            <Circle
                x={cursorPos.x > 190 ? cursorPos.x : 190}
                y={cursorPos.y < 120 ? cursorPos.y : 120}
                radius={5}
                fill="black"
                listening={false}
            />
        </Layer>
    );
});
HeroLayer.displayName = 'SelectionLayer';
