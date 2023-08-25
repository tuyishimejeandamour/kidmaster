// import {BrowserWindow as appWindow} from 'electron'
import { openRunCodeModal } from '../modal/modal'
import { useMemoizedFn } from 'ahooks';
import { CodeCompiler } from '@/visualeditor';
import { usePersist } from '@/hooks/usePersit';
import { useAppStore } from '@/store/app';

function Actions() {
  const isInElectron = window.Electron
  const handleRun = useMemoizedFn(() => {
    const compiler = new CodeCompiler();
    compiler.useSkypack = true;
    openRunCodeModal(compiler.generate());
  });
  const { open } = usePersist()
  const {onDashboard: onDashboard} = useAppStore()

  return (

    <div className='flex z-50' >
      <div className={`flex h-11 items-center ${!isInElectron ? "mr-4" : ""}`}>
          {
              !onDashboard && (
          <>
              <div className="flex justify-center items-center bg-[#2b303b] h-8 mr-3 w-11 rounded-md shadow-md  text-xs text-white hover:cursor-pointer hover:border-transparent" onClick={open}>
                <svg className='h-4 w-4 fill-white' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M12 12.5858L16.2426 16.8284L14.8284 18.2426L13 16.415V22H11V16.413L9.17157 18.2426L7.75736 16.8284L12 12.5858ZM12 2C15.5934 2 18.5544 4.70761 18.9541 8.19395C21.2858 8.83154 23 10.9656 23 13.5C23 16.3688 20.8036 18.7246 18.0006 18.9776L18.0009 16.9644C19.6966 16.7214 21 15.2629 21 13.5C21 11.567 19.433 10 17.5 10C17.2912 10 17.0867 10.0183 16.8887 10.054C16.9616 9.7142 17 9.36158 17 9C17 6.23858 14.7614 4 12 4C9.23858 4 7 6.23858 7 9C7 9.36158 7.03838 9.7142 7.11205 10.0533C6.91331 10.0183 6.70879 10 6.5 10C4.567 10 3 11.567 3 13.5C3 15.2003 4.21241 16.6174 5.81986 16.934L6.00005 16.9646L6.00039 18.9776C3.19696 18.7252 1 16.3692 1 13.5C1 10.9656 2.71424 8.83154 5.04648 8.19411C5.44561 4.70761 8.40661 2 12 2Z"></path></svg>
              </div>
              <div onClick={handleRun} className="flex  justify-center items-center bg-blue-500 h-8 w-11 rounded-lg text-sm shadow-sm shadow-blue-700 text-white hover:border-transparent hover:cursor-pointer">
                <svg className='h-4 w-4' xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" ><polygon style={{ borderRadius: 2 }} points="5 3 19 12 5 21 5 3"></polygon></svg>
              </div>
          </>
        )}
      </div>
      {/* {
        isInElectron &&

        <div className="flex ml-11" >
          <button onClick={() => appWindow.getFocusedWindow()?.minimize()} className=" w-10 h-10 flex items-center justify-center rounded-none bg-transparent hover:border-transparent hover:bg-[#f3f7ffd7] p-1">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-4 text-gray-900" fill="currentcolor" viewBox="0 0 24 24" width="24" height="24"><path fill="none" d="M0 0h24v24H0z" /><path d="M5 11h14v2H5z" /></svg>
          </button>
          <button onClick={() => {appWindow.getFocusedWindow()?.toggleTabBar();setmaxmized(!maxmized)}} className=" w-10 h-10 flex items-center justify-center bg-transparent rounded-none hover:border-transparent hover:bg-[#f3f7ffd7] p-1">
            {
              maxmized ? (
                <svg xmlns="http://www.w3.org/2000/svg"  className="w-5 h-4 fill-gray-900" viewBox="0 0 24 24"><path d="M6.99979 7V3C6.99979 2.44772 7.4475 2 7.99979 2H20.9998C21.5521 2 21.9998 2.44772 21.9998 3V16C21.9998 16.5523 21.5521 17 20.9998 17H17V20.9925C17 21.5489 16.551 22 15.9925 22H3.00728C2.45086 22 2 21.5511 2 20.9925L2.00276 8.00748C2.00288 7.45107 2.4518 7 3.01025 7H6.99979ZM8.99979 7H15.9927C16.549 7 17 7.44892 17 8.00748V15H19.9998V4H8.99979V7ZM4.00255 9L4.00021 20H15V9H4.00255Z"></path></svg>
              ) :
                (
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 fill-gray-900" viewBox="0 0 24 24"><path d="M6 7C6 6.44772 6.44772 6 7 6H17C17.5523 6 18 6.44772 18 7V17C18 17.5523 17.5523 18 17 18H7C6.44772 18 6 17.5523 6 17V7ZM8 8V16H16V8H8Z"></path></svg>

                )
            }
          </button>
          <button onClick={() => appWindow.getFocusedWindow()?.close()} className=" w-10 h-10 flex items-center justify-center rounded-none hover:border-transparent bg-transparent hover:bg-red-500 p-1">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-4 text-gray-900 hover:text-gray-200" fill="currentcolor" viewBox="0 0 24 24" width="24" height="24"><path fill="none" d="M0 0h24v24H0z" /><path d="M12 10.586l4.95-4.95 1.414 1.414-4.95 4.95 4.95 4.95-1.414 1.414-4.95-4.95-4.95 4.95-1.414-1.414 4.95-4.95-4.95-4.95L7.05 5.636z" /></svg>
          </button>
        </div>
      } */}
    </div>
  )
}


export default Actions