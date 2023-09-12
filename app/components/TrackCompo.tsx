'use client'

import { TrackModel } from "../data/interfaces"
import { Dispatch, SetStateAction } from "react"
import { useState, useEffect } from "react"
import { retrieveProject } from "../logic/client"
import { Slider } from "@mui/material"
import { saveDelay, updateVolume } from '../logic/client'
import RoundButton from "./RoundButton"
import { useAppContext } from "../hooks"
import WaveSurfer from "wavesurfer.js"
import context from "../logic/client/context"
import { updateInstrument } from "../logic/client"

interface TrackProps {
    trackData: TrackModel
    setTrackId: Dispatch<SetStateAction<string | undefined>>
    trackId: string
    projectId: string
    setTracks: Dispatch<SetStateAction<[TrackModel] | undefined>>
    isRecording: boolean
    isPlaying: boolean
    onAudioEnded: () => void
}

export default function TrackCompo({ trackData, setTrackId, trackId, projectId, setTracks, isRecording, isPlaying, onAudioEnded }: TrackProps) {
    const [instrument, setInstrument] = useState<string>(trackData.instrument)
    const [url, setUrl] = useState()
    const [delay, setDelay] = useState<number>()
    const [volume, setVolume] = useState<number>(trackData.volume)
    const [pendingVolume, setPendingVolume] = useState<number | null>(null)
    const [timerId, setTimerId] = useState<NodeJS.Timeout | null>(null)
    const [wave, setWave] = useState<WaveSurfer>()
    const [selectInstrument, setSelectInstrument] = useState(false)
    const [audioIsPlaying, setAudioIsPlaying] = useState<boolean>(false)

    const { alert } = useAppContext()

    useEffect(() => {
        try {
            (async () => {
                const project = await retrieveProject(projectId!)
    
                const track = project.tracks.find((track: TrackModel) => track.id === trackId)
    
                if(track.audio !== '') setUrl(track.audio)

                setInstrument(trackData.instrument)
    
                setDelay(trackData.delay)
            })()
        } catch(error: any) {
            alert(error.message)
        }
    }, [])

    useEffect(() => {
        try {
            (async () => {
                const project = await retrieveProject(projectId!)
    
                const track = project.tracks.find((track: TrackModel) => track.id === trackId)
    
                if(track.audio && track.audio !== '') setUrl(track.audio)

                setInstrument(trackData.instrument)
            })()
        } catch(error: any) {
            alert(error.message)
        }
    }, [trackData.instrument])

    const handleChange = async (event: Event, value: number | number[], activeThumb: number) => {
        try {
            if (typeof value === 'number') {
                const newValue = value
    
                const audio = document.getElementById(trackData._id) as HTMLAudioElement
    
                audio!.volume = (newValue as number) / 100
    
                setVolume(newValue as number)

                if (timerId) {
                    clearTimeout(timerId);
                }
        
                const newTimerId = setTimeout(async () => {
                    if (pendingVolume !== null) {
                        await updateVolume(projectId, trackData._id, newValue)

                        

                        setPendingVolume(null)

                        const project = await retrieveProject(projectId)

                        setTracks(project.tracks)
                    }
                }, 500)
        
                setTimerId(newTimerId)
                setPendingVolume(newValue)
            }
        } catch (error: any) {
            alert(error.message)
        }
    }

    const handleTrackSelected = () => setTrackId(trackData._id)

    const handleLessDelay = async () => {
        try {
            if(delay! < 50) return
    
            const _delay = delay! - 50
            
            await saveDelay(projectId!, trackData._id, _delay)
    
            setDelay(_delay)

            const project = await retrieveProject(projectId)

            setTracks(project.tracks)
        } catch(error: any) {
            alert(error.message)
        }
    }

    const handleMoreDelay = async () => {
        try {
            const _delay = delay! + 50
            
            await saveDelay(projectId!, trackData._id, _delay)
    
            setDelay(_delay)

            const project = await retrieveProject(projectId)

            setTracks(project.tracks)
        } catch(error: any) {
            alert(error.message)
        }
    }

    const onSelectInstrument = () => {
        setSelectInstrument(true)
    }

    const onInstrumentSelected = async (selection: string) => {
        try{
            await updateInstrument(projectId, trackData._id, selection)
    
            const project = await retrieveProject(projectId)

            setTracks(project.tracks)
    
            const track = project.tracks.find((track: TrackModel) => track._id === trackData._id)
    
            setInstrument(track.instrument)

            context.instrument = selection

            

            setSelectInstrument(false)
        } catch(error: any) {
            alert(error.message)
        }
    }

    return <>
        <div className={`bg-[var(--grey-700)] px-4 py-4 flex flex-col items-center gap-4 rounded-2xl ${trackId === trackData._id ? 'outline-2 outline-[var(--orange-300)] outline outline-inner' : ''}`} onClick={handleTrackSelected} >
            <div className="flex items-center gap-4 ">
                <div className="w-full flex flex-col gap-2" >
                    <div className={` flex justify-center items-center gap-4`} >
                        <div >{url && <audio onEnded={onAudioEnded} id={trackData._id} src={trackData.audio} preload="" >{trackData.delay}</audio> }</div>
                        <div className={`h-16 w-full bg-[var(--grey-600)] rounded-2xl ${trackData.audio !== '' && isPlaying ? 'music' :
                            trackData.audio !== '' && !isPlaying ? 'stop' : ''}`}>
                            <div className="bar" ></div>
                            <div className="bar" ></div>
                            <div className="bar" ></div>
                            <div className="bar" ></div>
                            <div className="bar" ></div>
                            <div className="bar" ></div>
                            <div className="bar" ></div>
                            <div className="bar" ></div>
                            <div className="bar" ></div>
                            <div className="bar" ></div>
                        </div>
                        {/* {trackId && <div id={`${trackId}`}></div>} */}
                        {isRecording && trackId === trackData._id ? <img src={`/recording.svg`} className={`h-6 w-6`}/> : <img src={`/not-recording.svg`} className={`h-6 w-6`}/>}
                    </div>
                    <div className="flex justify-center items-center gap-4 text-[var(--grey-600)]" >
                        <p className="font-semibold text-base flex items-center" >Delay:</p>
                        <p className="font-semibold text-xl flex items-center" >{delay || '0'} ms</p>
                        <div className="flex gap-1" >
                            <RoundButton text="-" heigth={6} width={6} onClick={handleLessDelay} />
                            <RoundButton text="+" heigth={6} width={6} onClick={handleMoreDelay} />
                        </div>
                    </div>
                </div>
                <div className="h-4/5" >
                            <Slider
                            size="small"
                            value={volume}
                            aria-label="Small"
                            valueLabelDisplay="auto"
                            orientation="vertical"
                            sx={{
                                color: 'var(--orange-300)',
                            }}
                            onChange={handleChange}
                            />
                </div>
                <div className="text-[var(--grey-600)]" onClick={onSelectInstrument} ><img src={`/${instrument}.svg`} className={`h-8 w-8`}/></div>
            </div>
            {selectInstrument && trackId === trackData._id && <div className="flex justify-center items-center h-fit w-fit relative top-0 left-0 z-50">
                <div className="flex flex-col gap-2 justify-center items-center w-80 h-fit p-4 rounded-2xl bg-[var(--grey-700)]">
                    <ul className="flex flex-row gap-6">
                        <li onClick={() => onInstrumentSelected('note')} ><img src="/note.svg" className={`h-8 w-8 ${trackData.instrument && trackData.instrument === 'note' ? 'filter-orange' : ''}`}/></li>
                        <li onClick={() => onInstrumentSelected('mic')}><img src="/mic.svg" className={`h-8 w-8 ${trackData.instrument && trackData.instrument === 'mic' ? 'filter-orange' : ''}`}/></li>
                        <li onClick={() => onInstrumentSelected('guitar')}><img src="/guitar.svg" className={`h-8 w-8 ${trackData.instrument && trackData.instrument === 'guitar' ? 'filter-orange' : ''}`}/></li>
                        <li onClick={() => onInstrumentSelected('piano')}><img src="/piano.svg" className={`h-8 w-8 ${trackData.instrument && trackData.instrument === 'piano' ? 'filter-orange' : ''}`}/></li>
                        <li onClick={() => onInstrumentSelected('drums')}><img src="/drums.svg" className={`h-8 w-8 ${trackData.instrument && trackData.instrument === 'drums' ? 'filter-orange' : ''}`}/></li>
                    </ul>
                </div>
            </div>}
        </div>
    </>
}