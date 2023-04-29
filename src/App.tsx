import { Container } from './components/Layout/Container'
import { DevControls } from './components/DevControls'
import { Block } from 'components/Block'
import { useBlockContext } from 'contexts/BlockContext'
import classes from './css/App.module.css'

const BLOCK_COUNT = 3

function App() {
    const { state } = useBlockContext()
    return (
        <Container>
            <DevControls />
            <div className={classes.blockContainer} style={{ ...state }}>
                {Array(BLOCK_COUNT)
                    .fill(<></>)
                    .map((_, i) => (
                        <Block key={i} />
                    ))}
            </div>
        </Container>
    )
}

export default App
