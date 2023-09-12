interface SettingOptionProps {
    text: string
    onOptionClicked: () => void
}

export default function SettingOption({ text, onOptionClicked }: SettingOptionProps) {
    return <>
    <li onClick={onOptionClicked} >{text}</li>
    </>
}