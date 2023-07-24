import React, { useEffect, useRef } from 'react';
import { Modal } from '@arco-design/web-react';


export function openRunCodeModal(code: string) {
  console.log(code)
  Modal.confirm({
    title: null,
    className: 'run-code-modal',
    footer: null,
    icon: null,
    wrapClassName: "wrapperModal",
    content: <RunCodeModal code={code} />,
  });
}

export const RunCodeModal: React.FC<{ code: string }> = React.memo((props) => {
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    if (!iframeRef.current) {
      return;
    }

    const codeDoc = iframeRef.current.contentWindow?.document;
    if (!codeDoc) {
      return;
    }

    codeDoc.open();
    codeDoc.writeln(
              `<!DOCTYPE html>
          <style>
            html, body{
              color: white;
              margin: 0;
              padding: 0;
            }
          </style>
          <body>
            <div>Step by Step:</div>
            <ul id="console-log"></ul>
          </body>
          <script type="application/javascript" src="/lib/console-log-html.min.js"></script>
          <script>
            ConsoleLogHTML.connect(document.getElementById("console-log"));
          </script>
          <script type="module">
            ${props.code}
          </script>
          </html>`
    );
    codeDoc.close();
  }, []);

  return <iframe ref={iframeRef} className="w-full h-full" />;
});
RunCodeModal.displayName = 'RunCodeModal';