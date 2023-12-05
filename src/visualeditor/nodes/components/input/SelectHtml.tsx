import React, {useState} from 'react';
import {NodeInputProps} from './Base';
import {Select} from '@arco-design/web-react';

import styled from 'styled-components';
import {NodeInputBaseHtml} from './BaseHtml';

const SuperSelect = styled(Select)({
    Height: 16,
    display: 'block',
    '.arco-select-view': {
        height: '32px !important',
        lineHeight: '14px !important',
    },
});

const optionStyle: React.CSSProperties = {
    height: 16,
    lineHeight: '14px',
    fontSize: 12,
};

export interface NodeInputSelectProps extends NodeInputProps {
    options: { label: string; value: number | string }[];
}

export const NodeInputSelectHtml: React.FC<NodeInputSelectProps> = React.memo(
    (props) => {
        const {options, ...others} = props;
        const [popupVisible, setPopupVisible] = useState(false);

        return (
            <NodeInputBaseHtml
                {...others}
                renderEditor={({width, height, value, setValue, handleBlur}) => (
                    <SuperSelect
                        ref={() => {
                            setPopupVisible(true);
                        }}
                        // style={{
                        //   width,
                        //   height,
                        // }}

                        size="large"
                        popupVisible={popupVisible}
                        onVisibleChange={setPopupVisible}
                        placeholder={value}
                        value={value}
                        onChange={(value: any) => setValue(value)}
                        onBlur={handleBlur}
                    >
                        {options.map((opt, i) => (
                            <Select.Option
                                key={`${i}-${opt.value}`}
                                value={opt.value}
                                style={optionStyle}
                            >
                                {opt.label}
                            </Select.Option>
                        ))}
                    </SuperSelect>
                )}
            />
        );
    }
);
NodeInputSelectHtml.displayName = 'NodeInputSelect';
