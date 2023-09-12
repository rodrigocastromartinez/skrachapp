import BarActionIcon from '../library/BarActionIcon'

interface ControlsProps {
    onToggleRec: () => void
    onPlay: () => void
    onStop: () => void
}

export default function Controls({ onToggleRec, onPlay, onStop }: ControlsProps) {
    return <ul className="flex justify-center items-center text-slate-400 p-4 gap-4" >
        <img src={`/back.svg`} className={`h-10 w-10`} onClick={onStop}/>
        <img src={`/rec.svg`} className={`h-10 w-10`} onClick={onToggleRec}/>
        <img src={`/play.svg`} className={`h-10 w-10`} onClick={onPlay}/>
    </ul>
}