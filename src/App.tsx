import { useEffect, useState } from 'react'
import './App.css'
import { useAppStore } from './store/app'
import {
  Route,
  HashRouter,
  Routes,
} from "react-router-dom";
import Header from './components/header/header'
import Dashboard from './dashboard'
import Editor from './visualeditor/editor'
import CommandPanel from './components/commands'
import SettingsActions from './visualeditor/components/sidebar/edit';
import 'allotment/dist/style.css';



function App() {
  const { showSidebar, setShowSidebar } = useAppStore()

  const handleKeyPress = (event: KeyboardEvent) => {
    event.preventDefault()
    if (event.ctrlKey && event.key == "b") {
      setShowSidebar(!showSidebar)
    }
  }
  useEffect(() => {
    window.addEventListener("keydown", handleKeyPress)

    return () => {
      window.removeEventListener("keydown", handleKeyPress)

    }

  }, [])
  return (
    <HashRouter>
      <div className="relative flex flex-col w-full h-screen bg-[#474952fa]">
        <Header />
        <div className="h-[calc(100vh-44px)] w-full justify-center  transition-all bgimage flex ">
          <Routes>
            <Route path="/"   element={<Dashboard />} />
            <Route path="/editor" element={<Editor />} />
            <Route path="/settings" element={<SettingsActions />} />
          </Routes>
        </div>
      </div>
      <CommandPanel />
    </HashRouter>

  )
}

export default App
