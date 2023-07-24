import React from 'react';
import { NodeInputProps } from './Base';

const size = 10;

export const NodeInputBooleanHtml: React.FC<NodeInputProps> = React.memo(
  (props) => {
    const { x, y, value, onChange } = props;

    return (
      <div
        
       style={{width:size,height:size}}

        onClick={(e) => {
          onChange(!value);
        }}
      />
    );
  }
);
NodeInputBooleanHtml.displayName = 'NodeInputBooleanHtml';
