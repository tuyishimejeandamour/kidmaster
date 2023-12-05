import {CodeCompiler} from '@/visualeditor';

export class DebuggerCompiler extends CodeCompiler {
    constructor() {
        super();
    }

    setMode(mode: 'code' | 'debug') {
        this.mode = mode;
    }
}
