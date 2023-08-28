import './App.css'
import {
  Route,
  HashRouter,
  Routes,
} from "react-router-dom";
import Header from './components/header/header'
import Dashboard from './dashboard'
import Editor from './visualeditor/editor'
import CommandPanel from './components/commands'
import 'allotment/dist/style.css';
import Setting from "@/settings";



function App() {
  return (
    <HashRouter>
      <div className="relative flex flex-col w-full h-screen bg-[#474952fa]">
        <Header />
        <div className="h-[calc(100vh-44px)] w-full justify-center  transition-all bgimage flex ">
          <Routes>
            <Route path="/"   element={<Dashboard />} />
            <Route path="/editor" element={<Editor />} />
            <Route path="/settings" element={<Setting />} />
          </Routes>
        </div>
      </div>
      <CommandPanel />
    </HashRouter>

  )
}

export default App
