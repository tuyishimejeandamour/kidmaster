import { Message, Menu, Input, Tree } from '@arco-design/web-react';
import { useMemoizedFn } from 'ahooks';
import Fuse from 'fuse.js';
import Konva from 'konva';
import { values, keys, entries, groupBy } from 'lodash-es';
import React, { useEffect, useMemo, useRef, useState } from 'react'
import Highlighter from 'react-highlight-words';
import { useNodeStore, useStageStore, useVariableStore } from '../..';
import { VarGetNodeDefinition } from '../../nodes/definitions/varget';
import { VarSetNodeDefinition } from '../../nodes/definitions/varset';

const Actions: React.FC = React.memo((props) => {
  const { nodeDefinition, createNode } = useNodeStore();
  const [searchValue, setSearchValue] = useState('');
  const { getRelativePointerPosition } = useStageStore();
  const { variableMap } = useVariableStore();
  const nodeCreatedPosRef = useRef<Konva.Vector2d | null>(null);

  useEffect(() => {
    nodeCreatedPosRef.current = getRelativePointerPosition();
  }, []);

  const handleCreateNode = useMemoizedFn(
    (nodeName: string, data?: Record<string, any>) => {
      if (!nodeName) {
        Message.error('Node Name undefined');
        return;
      }

      if (!nodeCreatedPosRef.current) {
        Message.error('Cannot get pointer position');
        return;
      }

      createNode(nodeName, nodeCreatedPosRef.current, data);

    }
  );

  const list = useMemo(
    () => values(nodeDefinition).filter((definiton) => !definiton.hidden),
    [nodeDefinition]
  );

  const variableList = useMemo(() => keys(variableMap), [variableMap]);

  const fuse = useMemo(
    () =>
      new Fuse(list, {
        keys: ['label'],
      }),
    [list]
  );

  const variableFuse = useMemo(() => new Fuse(variableList), [variableList]);

  const matchedNode =
    searchValue === '' ? list : fuse.search(searchValue).map((res) => res.item);

  const matchedVariable =
    searchValue === ''
      ? variableList
      : variableFuse.search(searchValue).map((res) => res.item);

  return (
    <div className='w-full px-4 h-full py-2'>
      <input
        autoFocus
        className={"pl-2 text-gray-300 border border-gray-400  w-full bg-transparent text-[12px] ml-0 border-l-0 rounded-md cursor-default bg-clip-padding flex-1 p-0 h-8 mt-[1px]"}
        placeholder="Search Node"
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
        onKeyDown={(e) => e.stopPropagation()}
      />
      <div className='w-full h-auto '>
        <div className='flex flex-col w-full mt-4 '>
          {Array.isArray(matchedVariable) && matchedVariable.length > 0 && (
            <div>
              <h2 className='text-xs mb-3 ml-2'>Variables</h2>
              <div className=''>
                {matchedVariable.map((item) => (
                  <div key={`var-${item}`} className='w-full px-2 mb-1 items-center py-1 bg-[#373b445b] flex '>
                    <div className='flex-1 truncate'>
                      <Highlighter
                        searchWords={searchValue.split('')}
                        textToHighlight={item}
                        activeClassName='hello'
                        activeIndex={1}
                        className='mr-4'
                      />
                      <span title={`{ ${variableMap[item].currentValue || variableMap[item].defaultValue} }`} className='text-zinc-600 truncate'>{`{ ${variableMap[item].currentValue || variableMap[item].defaultValue} }`}</span>
                    </div>
                    <div className='w-20 flex items-center gap-1'>
                      <div
                        className='w-8 h-8 flex items-center'
                        key={`var-${item}-get`}
                        children={
                          <div
                            className='rounded p-1 hover:bg-[#373b44] text-blue-200  select-none hover:cursor-pointer'
                            onClick={() =>
                              handleCreateNode(VarGetNodeDefinition.name, {
                                name: item,
                              })
                            }
                          >
                            get
                          </div>
                        }
                      />
                      <div
                        className='w-8 h-8 flex items-center '
                        key={`var-${item}-set`}
                        children={
                          <div
                            className='rounded p-1 hover:bg-[#373b44] text-blue-300   select-none hover:cursor-pointer'
                            onClick={() =>
                              handleCreateNode(VarSetNodeDefinition.name, {
                                name: item,
                              })
                            }
                          >
                            set
                          </div>
                        }
                      />
                    </div>
                    <div className='w-8 h-8 flex items-center' title='delete variable'>
                      <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-gray-300 hover:cursor-pointer hover:text-red-500" fill="currentcolor" viewBox="0 0 24 24" width="24" height="24"><path fill="none" d="M0 0h24v24H0z" /><path d="M12 10.586l4.95-4.95 1.414 1.414-4.95 4.95 4.95 4.95-1.414 1.414-4.95-4.95-4.95 4.95-1.414-1.414 4.95-4.95-4.95-4.95L7.05 5.636z" /></svg>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {Array.isArray(matchedNode) &&
            matchedNode.length > 0 &&
            entries(groupBy(matchedNode, 'category')).map(
              ([category, items]) => (
                <div key={category} title={category} className={"font-semibold w-full flex flex-col"}>
                  <h2 className='text-xs mb-3'>{category}</h2>
                  <div className='flex flex-wrap w-full gap-1 '>
                    {items.map((item) => (
                      <div
                        key={`${category}-${item.name}`}
                        onClick={() => handleCreateNode(item.name)}
                        className={"relative outline-transparent text-sm font-normal border-0 rounded cursor-pointer text-center inline-block h-14 bg-transparent ml-0 mb-2 w-14 select-none hover:bg-gray-400/20"}
                        title={
                          item.label
                        }
                      >
                        <span className="flex flex-wrap h-full justify-start items-center select-none" data-automationid="splitbuttonprimary">
                          <span className="flex relative w-full h-full ">
                            <span className="flex flex-1 flex-col items-center h-full max-w-full justify-center rounded select-none ">
                              <span className="relative overflow-hidden fill-zinc-700 ml-0 flex-shrink-0 h-8 w-8 grid place-items-center rounded">
                                <i data-icon-name="ArrowUpload" aria-hidden="true" className="w-5 h-5 inline-block select-none">
                                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path fill="none" d="M0 0h24v24H0z" /><path d="M6.75 2.5A4.25 4.25 0 0 1 11 6.75V11H6.75a4.25 4.25 0 1 1 0-8.5zM9 9V6.75A2.25 2.25 0 1 0 6.75 9H9zm-2.25 4H11v4.25A4.25 4.25 0 1 1 6.75 13zm0 2A2.25 2.25 0 1 0 9 17.25V15H6.75zm10.5-12.5a4.25 4.25 0 1 1 0 8.5H13V6.75a4.25 4.25 0 0 1 4.25-4.25zm0 6.5A2.25 2.25 0 1 0 15 6.75V9h2.25zM13 13h4.25A4.25 4.25 0 1 1 13 17.25V13zm2 2v2.25A2.25 2.25 0 1 0 17.25 15H15z" /></svg>
                                </i>
                              </span>
                              <span className='align-middle flex items-center font-normal text-[10px] flex-1 text-left text-gray-400 select-none w-full px-1'>
                                <Highlighter
                                  className='truncate !bg-transparent w-full text-center'
                                  activeClassName='!bg-transparent'
                                  activeStyle={{background:"transparent !"}}
                                  activeIndex={1}
                                  searchWords={searchValue.split('')}
                                  textToHighlight={item.label}
                                />
                              </span>
                            </span>
                          </span>
                        </span>

                      </div>
                    ))}
                  </div>
                </div>
              )
            )}
        </div>
      </div>
    </div>
  );
});
Actions.displayName = 'ContextMenu';


export default Actions