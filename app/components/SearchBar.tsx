interface SearchBarProps {
    onChange: (arg0: any) => void
}

export default function SearchBar({onChange}: SearchBarProps) {
    return <>
    <input type="search" className="search" placeholder="Search" onChange={onChange}></input>
    </>
}