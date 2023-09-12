import Button from "./Button"

interface AlertProps {
    message: string
    level: string
    onAccept: () => void
}

export default function Alert({ message, level, onAccept}: AlertProps) {
    return <section className="fixed top-0 left-0 h-screen w-screen bg-[var(--black-transparent)] flex flex-col gap-4 justify-center items-center z-30">
        <div className={"w-4/5 max-w-xs h-fit p-8 m-0 rounded-3xl bg-[var(--grey-700)] flex flex-col gap-2"}>
            <p className={`border-b border-solid border-[var(--grey-500)] m-0 pb-2 font-normal ${level === 'error' || level === 'warn'? 'text-[var(--orange-300)]' : ''}`}>{level === 'error' ? 'ERROR: ' : 'WARNING: '}</p>
            <p className='m-0 pb-2 self-center text-[var(--grey-500)]'>{message}</p>
            <div className="flex self-center" >
                <Button size='fit' type='primary' text='Accept' onClick={onAccept} ></Button>
            </div>
        </div>
    </section>
}