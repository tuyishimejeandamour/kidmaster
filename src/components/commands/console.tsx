import {createNode} from "@/components/console/console";
import React, {useCallback, useEffect, useRef} from "react";

const  ConsoleCommands: React.FC = () => {

    let staticRef = useRef({
        isAuto: false,
        js: null,
        lib: ["", "", ""],
    });
    let js = "console.log('hello')"

    useEffect(() => {

        window.addEventListener("message", function (data) {
            if (data.data && ["log", "error", "info", 'warn'].includes(data.data.type)) {
                let console = document.getElementById("console") as HTMLElement;
                console.appendChild(createNode(data.data.data));
                console.scrollTop = console?.scrollHeight as number;
            }
        });
        return () => {
            window.removeEventListener("message", function (data) {
                console.clear()
            })
        }
    },[])
    const onLoad = useCallback(() => {
        let iframe = document.getElementById("preview") as HTMLIFrameElement;
        let preview:Document;
        if ("contentDocument" in iframe && iframe.contentDocument) {
            preview = iframe.contentDocument;
        } else if ("contentWindow" in iframe && iframe.contentWindow) {
            preview = iframe.contentWindow.document;
        } else {
            preview = iframe.contentDocument as Document;
        }
        let lib = `<script src="lib/console.js"></script>`;
        staticRef.current.lib.map((item) => {
            lib += `<script src="${item}"></script>`;
        });
        preview.open();
        preview.write(`${lib}<script  type="text/babel" data-presets="react">${js}</script>`);
        preview.close();
    }, []);

    return (
        <>
            <iframe onLoad={onLoad} id="preview" src="" seamless width="0" style={{visibility:"hidden"}} height="0"></iframe>

           <div className='flex flex-col w-full mt-4 '>
               <div id={"console"} />
           </div>
        </>
    )

}
export default ConsoleCommands;