interface RoundButtonProps {
    text: string,
    heigth: number,
    width: number,
    onClick?: (event: React.SyntheticEvent) => void
}

export default function RoundButton({ text, heigth, width, onClick }: RoundButtonProps) {
    return <>
        <button className={`text-3xl text-[var(--orange-300)] h-${heigth} w-${width} flex items-center`} onClick={onClick} >{text}</button>
    </>
}