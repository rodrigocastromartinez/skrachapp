import Container from './Container'
import './Loader.css'

export default function Loader() {
    return <Container>
        <div className="lds-ring"><div></div><div></div><div></div><div></div></div>
    </Container>
}