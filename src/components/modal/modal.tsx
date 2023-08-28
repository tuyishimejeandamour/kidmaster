import React, { useEffect, useRef } from 'react';
import { Modal } from '@arco-design/web-react';
import {createNode} from "@/components/console/console";


export function openRunCodeModal(code: string) {
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
  const handleMessage = (data:MessageEvent)=>{
    if (data.data && ["log", "error", "info", 'warn'].includes(data.data.type)) {
      let console = document.getElementById("console_log") as HTMLElement;
      console.appendChild(createNode(data.data.data));
      console.scrollTop = console?.scrollHeight as number;
    }
  }
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
            <div id="console"></div>
          </body>
          <script type="application/javascript" src="/lib/console.js"></script>
         
          <script type="module">
           
            ${props.code}
          </script>
          </html>`
    );
    codeDoc.close();
    window.addEventListener("message", handleMessage);
    return () => {
      window.removeEventListener("message", handleMessage)
    }
  }, []);

  return (
      <>
        <iframe ref={iframeRef}  id="preview" width="0" style={{visibility:"hidden"}} height="0"></iframe>
        <div className="w-full shadow-2xl subpixel-antialiased rounded h-64 bg-black border-black mx-auto">
          <div className="flex items-center h-6 rounded-t bg-gray-100 border-b border-gray-500 text-center text-black" id="headerTerminal">
            <div className="flex ml-2 items-center text-center border-red-900 bg-red-500 shadow-inner rounded-full w-3 h-3" id="closebtn">
            </div>
            <div className="ml-2 border-yellow-900 bg-yellow-500 shadow-inner rounded-full w-3 h-3" id="minbtn">
            </div>
            <div className="ml-2 border-green-900 bg-green-500 shadow-inner rounded-full w-3 h-3" id="maxbtn">
            </div>
            <div className="mx-auto pr-16" id="terminaltitle">
              <p className="text-center text-sm">Debug</p>
            </div>
          </div>
          <div className="pl-1 pt-1 h-auto  text-green-200 font-mono text-xs bg-black" id="console_log">
        </div>
        </div>
      </>
  )
});
RunCodeModal.displayName = 'RunCodeModal';