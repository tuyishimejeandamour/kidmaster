import React, { useEffect, useRef } from 'react';
import { Modal } from '@arco-design/web-react';


export function openTerminalModal(code: string) {
    console.log(code)
    Modal.confirm({
        title: null,
        className: 'run-code-modal',
        footer: null,
        icon: null,
        wrapClassName: "wrapperModal",
        content: <TerminalModal code={code} />,
    });
}

export function consoleTerminal(code: string) {
    return <TerminalModal code={code} />;
}

export const TerminalModal: React.FC<{ code: string }> = React.memo((props) => {
    const iframeRef = useRef<HTMLIFrameElement>(null);

    useEffect(() => {

    }, []);

    return <iframe ref={iframeRef} className="w-full h-full" />;
});
