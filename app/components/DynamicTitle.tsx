'use client'

import { useState, useEffect } from "react"
import { retrieveProject } from "../logic/client"
import { ChangeEvent } from "react"
import { updateTitle } from "../logic/client"

interface DynamicTitleProps {
    projectId: string
}

export default function DynamicTitle({ projectId }: DynamicTitleProps) {
    const [title, setTitle] = useState()

    useEffect(() => {
        const fetchData = (async () => {
            const project = await retrieveProject(projectId)
    
            setTitle(project.name)
        })()
    }, [])

    let updateBasicDataTimeOutId: ReturnType<typeof setTimeout> | null = null
    let basicDataInputId: string

    const onChangeTitle = (event: ChangeEvent<HTMLInputElement>) => {
        try {
            if (updateBasicDataTimeOutId && basicDataInputId === event.target.id) clearTimeout(updateBasicDataTimeOutId)

            basicDataInputId = event.target.id

            updateBasicDataTimeOutId = setTimeout(() => {
                if(event.target.value !== '') {
                    updateTitle(projectId, event.target.value)
                } else {
                    updateTitle(projectId, 'Untitled')
                }
            }, 500)
        } catch (error: any) {
            alert(error.message)
        }
    }

    return <>
        <input type="text" className="search" defaultValue={title} onChange={(event) => onChangeTitle(event)} ></input>
    </>
}