import { CodeckNodeType } from "../store/node";

// 选用的配色方案: https://flatuicolors.com/palette/us
export type BgColor = Exclude<CodeckNodeType,'begin' | 'end'>;
export interface IColor{
  nodeLabel:string;
  nodeLabelBox:string;
  nodeBoxGradient: Record< BgColor|'variable',{start:string,end:string}>
  text:string,
  variable: Record<'number'|'string'|'boolean'|'array'|'data',string>
  node: Record<CodeckNodeType,string>
}
export const color : IColor = {
  nodeLabel: '#ffffff',
  nodeLabelBox: '#3282b8',
  nodeBoxGradient: {
    logic: {
      start: '#7261f3ad',
      end: '#7261f3ad',
    },
    call: {
      start: '#57ddc3',
      end: '#57ddc3',
    },
    function: {
      start: '#5CEFFF',
      end: '#97c9ba',
    },
    return: {
      start: '#fadae9',
      end: '#fadae9',
    },
    variable: {
      start:"#fff",
      end:"#dee"
    }
    
  },
  text: '#000',
  variable: {
    number: '#00cec9',
    string: '#fd79a8',
    boolean: '#d63031', // 优化下配色，有点辣眼睛
    array: '#55efc4',
    data: '#fdcb6e',
  },
  node: {
    begin: '#e17055',
    end: '#e17055',
    function: '#2f5e7e',
    logic: '#6c5ce7',
    call: '#00b894',
    return: '#b11860',
  },
};
