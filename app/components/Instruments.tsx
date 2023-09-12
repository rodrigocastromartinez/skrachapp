import { TrackModel } from "../data/interfaces"
import { Dispatch, SetStateAction } from "react"
import { retrieveProject, updateInstrument } from "../logic/client"
import Button from './Button'
import { useAppContext } from "../hooks"
import context from "../logic/client/context"

interface InstrumentsProps {
    trackData: TrackModel
    projectId: string
    setModal: Dispatch<SetStateAction<string | undefined>>
    setTrackData: Dispatch<SetStateAction<TrackModel | undefined>>
}

export default function Instruments({ trackData, projectId, setModal, setTrackData }: InstrumentsProps) {
    const { alert } = useAppContext()

    const onInstrumentSelected = async (selection: string) => {
        try{
            await updateInstrument(projectId, trackData._id, selection)
    
            const project = await retrieveProject(projectId)
    
            const track = project.tracks.find((track: TrackModel) => track._id === trackData._id)
    
            setTrackData(track)
    
            setModal(undefined)

            context.instrument = selection

            console.log(context.instrument)
        } catch(error: any) {
            alert(error.message)
        }
    }

    const handleCloseModal = () => setModal(undefined)

    return <>
    <div className="fixed top-0 left-0 h-screen w-screen bg-[var(--black-transparent)] flex flex-col justify-center items-center z-30 ">
        <div className="flex justify-center items-center h-fit w-fit relative top-0 left-0 z-50">
            <div className="flex flex-col gap-2 justify-center items-center w-80 h-fit p-4 rounded-2xl bg-[var(--grey-700)]">
                <ul className="flex flex-row gap-6">
                    <li onClick={() => onInstrumentSelected('note')} ><img src="/note.svg" className={`h-8 w-8 ${trackData.instrument && trackData.instrument === 'note' ? 'filter-orange' : ''}`}/></li>
                    <li onClick={() => onInstrumentSelected('mic')}><img src="/mic.svg" className={`h-8 w-8 ${trackData.instrument && trackData.instrument === 'mic' ? 'filter-orange' : ''}`}/></li>
                    <li onClick={() => onInstrumentSelected('guitar')}><img src="/guitar.svg" className={`h-8 w-8 ${trackData.instrument && trackData.instrument === 'guitar' ? 'filter-orange' : ''}`}/></li>
                    <li onClick={() => onInstrumentSelected('piano')}><img src="/piano.svg" className={`h-8 w-8 ${trackData.instrument && trackData.instrument === 'piano' ? 'filter-orange' : ''}`}/></li>
                    <li onClick={() => onInstrumentSelected('drums')}><img src="/drums.svg" className={`h-8 w-8 ${trackData.instrument && trackData.instrument === 'drums' ? 'filter-orange' : ''}`}/></li>
                </ul>
                <Button size='wide' type='no-fill' text='Back' onClick={handleCloseModal}></Button>
            </div>
        </div>
    </div>
    </>
}