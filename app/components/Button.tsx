interface ButtonProps {
    submit?: boolean,
    size: string,
    type: string,
    text: string,
    rounded?: boolean,
    onClick?: (event: React.SyntheticEvent) => void
}

export default function Button({ submit = false, size, type, text, rounded = false, onClick, ...props }: ButtonProps) {
    return <>
        <button type={`${submit ? "submit" : "button"}`} className={`
            ${size === "fit" && "fit-button" }
            ${size === "wide" && "wide-button"}
            ${type === "primary" && "primary"}
            ${type === "secondary" && "secondary"}
            ${type === "grey" && "grey"}
            ${type === "no-fill" && "no-fill"}
            ${rounded && 'rounded-full'}
        `}{...props} onClick={onClick}>{text}</button>
    </>
}