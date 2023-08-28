import React, { useEffect, useState } from 'react'
import { useNodes } from '../../hooks/useNodes'
import { VarGetNodeDefinition } from '../../visualeditor/nodes/definitions/varget';
import { VarSetNodeDefinition } from '../../visualeditor/nodes/definitions/varset';

import Highlighter from 'react-highlight-words'
import { VariableItem, useVariableStore, variableTypes } from '../../visualeditor';

const chechtype = (name: any): any => {
    if (variableTypes.includes(name)) return name
    return "string"
}
export const VariableForm: React.FC<{
    isCreate: boolean;
    initialValues?: VariableItem;
    submitLabel: string;
    onSubmit: (values: VariableItem) => void;
}> = React.memo((props) => {

    const [variables, setVariables] = useState({ name: props.initialValues?.name || "", type: chechtype(props.initialValues?.type), defaultValue: props.initialValues?.defaultValue })
    const handsetVariable = (value: string, name: string) => {
        setVariables((e) => ({ ...e, [name]: value }))

    }
    const handleSubmit = () => {
        props.onSubmit(variables)
    }

    return (
        <div>
            <div className="relative w-full h-full flex gap-2 p-1 my-2 items-center ">
                <span className='h-4 w-24'>Name</span>
                <input autoFocus={true} className="bg-inherit flex-1 w-[calc(100%-0px)] inline-block h-full  rounded-sm  border border-[#373b44] resize-none px-1 py-[6px] text-ellipsis " autoCorrect="off" autoCapitalize="off" spellCheck="false" type="text"
                    placeholder={"Enter Variable name"} name='Varname'
                    defaultValue={props.initialValues?.name}
                    onChange={(e) => handsetVariable(e.target.value, 'name')}
                    onKeyDown={(e) => e.stopPropagation()}

                />
            </div>
            <div className="relative w-full h-full gap-2 flex p-1 my-2 items-center ">
                <span className='h-4 w-24'>Type</span>
                <select defaultValue={props.initialValues?.type} className={"flex-1 h-8 px-1 rounded-sm text-sm !bg-[#373b44]"} onChange={(e) => {

                    handsetVariable(e.target.value, 'type')
                }}>
                    {variableTypes.map((v) => (
                        <option key={v} value={v}>
                            {v}
                        </option>
                    ))}
                </select>
            </div>
            <div className="relative w-full h-full flex p-1 gap-2 my-2 items-center ">
                <span className='h-4 w-24'>DefaultValue</span>
                <input autoFocus={true} className="bg-inherit flex-1 w-[calc(100%-0px)] inline-block h-full rounded-sm  border border-[#373b44] resize-none px-1 py-[6px] text-ellipsis " autoCorrect="off" autoCapitalize="off" spellCheck="false" type="text"
                    placeholder={"Enter Variable name"} name='Varname'
                    defaultValue={props.initialValues?.defaultValue}
                    onChange={(e) => handsetVariable(e.target.value, 'defaultValue')}
                    onKeyDown={(e) => e.stopPropagation()}

                />
            </div>

            <button type="submit" className='w-auto mt-3 px-4 py-2 bg-blue-500 rounded-md' onClick={handleSubmit} >
                {props.submitLabel}
            </button>

        </div>
    );
});


const VariableCommands: React.FC<{ onNodeClick: (nodeName: string, data?: Record<string, string>) => void }> = React.memo(({ onNodeClick }) => {
    const { matchedVariable, searchValue,search } = useNodes()
    const { variableMap, createVariable, deleteVariable } = useVariableStore();

    const [create, setCreate] = useState(false)
    const handleNodeClick = (nodeName: string, data?: Record<string, string>) => {
        onNodeClick(nodeName, data)
    }
    const handleCreateVariable = () => {
        setCreate(true)
    }
    const handleDelete = async (id:string) => {
        const answer = confirm("delete " + id)
        if(answer){
            deleteVariable(id)
        }
    }
    const handleKeyDown = (event: KeyboardEvent) => {
        event.stopPropagation()
        if (searchValue.length < 1) {
            setCreate(false)
        }

        if (event.key === "Enter" && searchValue.length > 1) {
            setCreate(true)
        }

    }
    
    useEffect(() => {
        window.addEventListener("keypress", handleKeyDown)
        return () => {
            window.removeEventListener("keypress", handleKeyDown)
        }
    })
    return (
        <div className='flex flex-col w-full mt-4 '>
            {
                !create && (
                    <>
                        {Array.isArray(matchedVariable) && matchedVariable.length > 0 && (
                            <div>
                                <h2 className='text-xs mb-3 ml-2'>Variables</h2>
                                <div className=''>
                                    {matchedVariable.map((item) => (
                                        <div key={`var-${item}`} className='w-full px-2 mb-1 items-center py-1 bg-[#373b445b] flex '>
                                            <div className='flex-1'>
                                                <Highlighter
                                                    searchWords={searchValue.split('')}
                                                    textToHighlight={item}
                                                    className='mr-4'
                                                />
                                                <span className='text-zinc-600'>{`{ ${variableMap[item].currentValue || variableMap[item].defaultValue} }`}</span>
                                            </div>
                                            <div className='w-20 flex items-center gap-1'>
                                                <div
                                                    className='w-8 h-8 flex items-center'
                                                    key={`var-${item}-get`}
                                                    children={
                                                        <div
                                                            className='rounded p-1 hover:bg-[#373b44] text-blue-200  select-none hover:cursor-pointer'
                                                            onClick={() =>
                                                                handleNodeClick(VarGetNodeDefinition.name, {
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
                                                                handleNodeClick(VarSetNodeDefinition.name, {
                                                                    name: item,
                                                                })
                                                            }
                                                        >
                                                            set
                                                        </div>
                                                    }
                                                />
                                            </div>
                                            <div className='w-8 h-8 flex items-center' title='delete variable' onClick={() => handleDelete(item)}>
                                                <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-gray-300 hover:cursor-pointer hover:text-red-500" fill="currentcolor" viewBox="0 0 24 24" width="24" height="24"><path fill="none" d="M0 0h24v24H0z" /><path d="M12 10.586l4.95-4.95 1.414 1.414-4.95 4.95 4.95 4.95-1.414 1.414-4.95-4.95-4.95 4.95-1.414-1.414 4.95-4.95-4.95-4.95L7.05 5.636z" /></svg>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                        {
                            matchedVariable.length < 1 && (
                                <div className='bg-[#373b44] flex items-center justify-between text-[#d5ced9] px-4 h-9 text-[13px] w-full border border-transparent relative  p-0 rounded-sm ' onClick={handleCreateVariable}>
                                    <div className='flex items-center gap-3 truncate'>
                                        <span className='capitalize text-[10px]'>place enter to create variable{` (space "type" space "defaultValue") `} </span>
                                        <span className='block text-blue-500 text-xs'>
                                            "
                                            {searchValue.split(" ")[1] || ""}{" "}
                                            {searchValue.split(" ")[0] || ""}{" "}
                                            {searchValue.split(" ").length >= 3 && "="}{" "}
                                            {`'${searchValue.split(" ")[2] || ""}'`}{" "}
                                            "
                                        </span>
                                    </div>
                                    <div className=''>
                                        <svg xmlns="http://www.w3.org/2000/svg" className="text-white h-4 w-4 fill-white" viewBox="0 0 24 24" width="24" height="24"><path d="M11 11V5H13V11H19V13H13V19H11V13H5V11H11Z" ></path></svg>
                                    </div>
                                </div>
                            )
                        }
                    </>

                )
            }
            {
                create && (
                    <VariableForm
                        isCreate={true}
                        initialValues={{ name: searchValue.split(' ')[0], type: searchValue.split(' ')[1] as any || variableTypes[0], defaultValue: searchValue.split(' ')[2] || undefined }}
                        submitLabel="Create"
                        onSubmit={(values: VariableItem) => {
                            createVariable(values.name, values.type, values.defaultValue)
                            setCreate(false)
                            search("")
                            document.getElementById("commandInput")?.focus()
                        }}
                    />
                )
            }
        </div>

    )
}
)

export default VariableCommands


