import './App.css'
import {HashRouter, Route, Routes,} from "react-router-dom";
import Header from './components/header/header'
import Dashboard from './dashboard'
import Editor from './visualeditor/editor'
import CommandPanel from './components/commands'
import 'allotment/dist/style.css';
import Setting from "@/settings";
import SelectedProject from "@/dashboard/selectedProject";
import {AnimatePresence} from "framer-motion";
import {persist} from "@/visualeditor";
import {useEffect} from "react";
import {useAppStore} from "@/store/app";




function App() {

    return (
        <HashRouter>
            <div className={"relative  bg-gradient-to-br from-[#444554] to-[#080705]"}>
                <div className="relative overflow-hidden flex rounded-2xl shadow-2xl flex-col w-full h-[calc(100vh)] bg-gradient-to-br from-[#444554] to-[#080705]">
                    <Header/>
                    <div className="h-[calc(100vh-44px)] w-full justify-center   transition-all bgimage flex ">
                        <AnimatePresence >
                        <Routes>
                            <Route path="/" element={<Dashboard/>}/>
                            <Route path="/editor" element={<Editor/>}/>
                            <Route path="/settings" element={<Setting/>}/>
                            <Route path={"/:id"} element={<SelectedProject/>}/>
                        </Routes>
                        </AnimatePresence>
                    </div>
                </div>
            </div>
            <CommandPanel/>
        </HashRouter>

    )
}

export default App
