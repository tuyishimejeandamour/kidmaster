import { NODE_TITLE_HEIGHT,PIN_HEIGHT } from './consts';


export function buildPinPosX(width: number, type: 'input' | 'output') {
  if (type === 'output') {
    return width - 14;
  }

  return 14;
}

export function buildPinX(width:number){
  return width /2
}

export function buildPinPosY(position: number) {
  return (
    position * PIN_HEIGHT + 16 + (position > 0 ? NODE_TITLE_HEIGHT - 18 : 0)
  );
}

export function buildPinY(position:number,type:"output"|"input"){
  if (type === 'input') {
    return - 2;
  }

  return position + 6
}


export function buildNodeHeight(slotNum: number) {
  slotNum = Math.max(slotNum, 0);
  return NODE_TITLE_HEIGHT + 16 + slotNum * PIN_HEIGHT + 2;
}
