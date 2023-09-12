'use client'

import SettingsMenu from "./Settings"
import { useState } from "react"
import { Dispatch, SetStateAction } from "react"

interface NavigationBarProps {
    onLogoutClicked: () => void
    setModal: Dispatch<SetStateAction<string | undefined>>
}

export default function NavigationBar({onLogoutClicked, setModal} : NavigationBarProps) {
    const handleSettings = () => setModal('settings')
    
    return <header className="fixed top-0 left-0 w-screen h-16 bg-[var(--black-100)] overall">
        <nav className="h-full w-full border-solid border-b border-slate-800">
            <ul className="flex px-8 py-4 h-full justify-between items-center">
                <li className="h-6 w-6 text-slate-400 flex justify-center items-center" onClick={handleSettings} ><span className="material-symbols-outlined">settings</span></li>
                <li className="h-6 w-6 text-slate-400" onClick={onLogoutClicked} ><span className="material-symbols-outlined">logout</span></li>
            </ul>
        </nav>
        {/* <SettingsMenu onCloseMenu={handleCloseMenu} ></SettingsMenu> */}
    </header>
}