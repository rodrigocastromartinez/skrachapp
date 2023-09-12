'use client'

import { useState, useEffect } from "react"
import { ProjectModel } from "../data/interfaces"
import ProjectSummary from "./ProjectSummary"
import React from 'react'
import { useAppContext } from "../hooks"
import { retrieveUserProjects, deleteProject } from "../logic/client"

interface ProjectsProps {
    projects: [ProjectModel]
    onProjectSelected: (arg0: string) => void
    search: string
}

export default function Projects({ projects, onProjectSelected, search }: ProjectsProps) {
    const [userProjects, setUserProjects] = useState<[ProjectModel]>()

    const { alert } = useAppContext()

    useEffect(() => {
        try {
            (async () => {    
                setUserProjects(projects)
            })()
        } catch(error: any) {
            alert(error.message)
        }
    }, [])

    const handleDeleteProject = async (id: string) => {
        try {
            await deleteProject(id)

            const projects = await retrieveUserProjects()

            setUserProjects(projects)
        } catch(error: any) {
            alert(error.message)
        }
    }

    return <>
    {userProjects && <div className="flex flex-col gap-4">
        {userProjects && userProjects.filter((project) => {
            return search.toLowerCase() === '' ? project : project.name.toLowerCase().includes(search)
        }).map((project: ProjectModel) => <ProjectSummary key={project._id} project={project} onProjectSelected={onProjectSelected} onDelete={handleDeleteProject}/>) }
    </div>}
    </>
}