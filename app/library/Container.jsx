export default function Container({ children, tag: Tag = "div", className = '', ...props }) {
    return <Tag className={`flex flex-col justify-center items-center ${className}`} {...props}>
        {children}
    </Tag>
}