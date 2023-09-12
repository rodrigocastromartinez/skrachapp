import { ProjectModel } from "../data/interfaces"
import Button from './Button'

interface ProjectSummaryProps {
    project: ProjectModel
    onProjectSelected: (arg0: string) => void
    onDelete: (arg0: string) => void
}

export default function ProjectSummary({project: {_id, name, tracks}, onProjectSelected, onDelete}: ProjectSummaryProps) {
    const random = Math.floor(Math.random() * 999) + 1

    return <>
    <div className="flex p-4 bg-[var(--grey-700)] justify-between gap-2 rounded-lg">
        <div className="flex flex-col justify-center gap-2 w-full" >
            <h2 className="text-[var(--grey-300)]" >{name}</h2>
            <div className="flex items-center gap-2" >
                <p className="text-[var(--grey-500)]" >Recorded:</p>
                <div className="flex gap-2" >{tracks.map(track => {
                    return <img key={track._id} src={`/${track.instrument}.svg`} className={`h-5 w-5 filter-orange`}/>
                })}</div>
            </div>
            <div className="flex justify-center gap-2 items-center" >
                <Button size='wide' type='no-fill' text='Edit' onClick={() => onProjectSelected(_id)} ></Button>
                <span className="material-symbols-outlined text-[var(--grey-300)]" onClick={() => onDelete(_id)} >delete</span>
            </div>
        </div>
        <img src={`https://picsum.photos/500/500?random=${random}`} className="w-1/3"></img>
    </div>
    </>
}