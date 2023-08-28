import { BeginNodeDefinition } from './definitions/core/begin';
import { DelayNodeDefinition } from './definitions/core/delay';
import { IfNodeDefinition } from './definitions/core/if';
import { IncludesNodeDefinition } from './definitions/core/includes';
import { LogNodeDefinition } from './definitions/core/log';
import { LogErrorNodeDefinition } from './definitions/core/log-error';
import { LoopNodeDefinition } from './definitions/core/loop';
import { TimerNodeDefinition } from './definitions/core/timer';
import { AddNodeDefinition } from './definitions/logic/add';
import { AnlNodeDefinition } from './definitions/logic/anl';
import { DividedNodeDefinition } from './definitions/logic/divided';
import { EqualNodeDefinition } from './definitions/logic/equal';
import { GTNodeDefinition } from './definitions/logic/gt';
import { GTENodeDefinition } from './definitions/logic/gte';
import { LTNodeDefinition } from './definitions/logic/lt';
import { LTENodeDefinition } from './definitions/logic/lte';
import { ModNodeDefinition } from './definitions/logic/mod';
import { MultiplyNodeDefinition } from './definitions/logic/multiply';
import { NotNodeDefinition } from './definitions/logic/not';
import { OrlNodeDefinition } from './definitions/logic/orl';
import { SubtractNodeDefinition } from './definitions/logic/subtract';
import { VarGetNodeDefinition } from './definitions/varget';
import { VarSetNodeDefinition } from './definitions/varset';
import { GroupNodeDefinition } from './definitions/group';
import { GroupBeginNodeDefinition } from './definitions/groupBegin'

// definition
export const builtinNodeDefinition = {
  // Core
  BeginNodeDefinition,
  IfNodeDefinition,
  IncludesNodeDefinition,
  LogErrorNodeDefinition,
  LogNodeDefinition,
  VarGetNodeDefinition,
  VarSetNodeDefinition,
  LoopNodeDefinition,
  TimerNodeDefinition,

  // Logic
  AddNodeDefinition,
  SubtractNodeDefinition,
  MultiplyNodeDefinition,
  DividedNodeDefinition,
  EqualNodeDefinition,
  GTNodeDefinition,
  GTENodeDefinition,
  LTNodeDefinition,
  LTENodeDefinition,
  ModNodeDefinition,
  AnlNodeDefinition,
  OrlNodeDefinition,
  NotNodeDefinition,

  //components
  DelayNodeDefinition,

  //grouping
  GroupNodeDefinition,
  GroupBeginNodeDefinition
};

// node
export { BaseNode } from './BaseNode';
export { BaseNodeWrapper } from './BaseNodeWrapper';
export { VariableNode } from './VariableNode';

// input
export { NodeInputBase } from './components/input/Base';
export { NodeInputBoolean } from './components/input/Boolean';
export { NodeInputNumber } from './components/input/Number';
export { NodeInputText } from './components/input/Text';
export { NodeInputSelect } from './components/input/Select';

// preset
export { BooleanInputPreset } from './components/preset/BooleanInputPreset';
export { NumberInputPreset } from './components/preset/NumberInputPreset';
export { TextInputPreset } from './components/preset/TextInputPreset';
export { SelectInputPreset } from './components/preset/SelectInputPreset';
