import {CodeCompiler} from "@/visualeditor";

export class ChimeCompiler extends CodeCompiler {
    constructor() {
        super();
    }

    setMode(mode: 'code' | 'debug') {
        this.mode = mode;
    }
}
