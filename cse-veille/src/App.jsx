// App.jsx — orchestrateur CSE Veille
// État global : bts, screen, pins, livrable, mailOpened

import { useState } from 'react'
import Topbar from './components/Topbar.jsx'
import ScreenBTS from './screens/ScreenBTS.jsx'
import ScreenM1 from './screens/ScreenM1.jsx'
import ScreenM2 from './screens/ScreenM2.jsx'
import ScreenM3 from './screens/ScreenM3.jsx'
import ScreenM4 from './screens/ScreenM4.jsx'
import ScreenM5 from './screens/ScreenM5.jsx'
import ScreenM6 from './screens/ScreenM6.jsx'
import ScreenM7 from './screens/ScreenM7.jsx'

export default function App() {
  const [screen, setScreen] = useState('bts')
  const [bts, setBts] = useState(null)
  const [mailOpened, setMailOpened] = useState(false)
  const [pins, setPins] = useState([])
  const [livrable, setLivrable] = useState('')

  function navigate(id) { setScreen(id) }

  function handleBTSSelect(code) {
    setBts(code)
    navigate('m1')
  }

  const showTopbar = !['bts', 'm1'].includes(screen)

  return (
    <div className="screen-root">
      {showTopbar && <Topbar current={screen} navigate={navigate} />}
      <div className="screen-body">
        {screen === 'bts' && <ScreenBTS onSelect={handleBTSSelect} />}
        {screen === 'm1' && <ScreenM1 navigate={navigate} />}
        {screen === 'm2' && <ScreenM2 navigate={navigate} onMailOpened={() => setMailOpened(true)} />}
        {screen === 'm3' && <ScreenM3 mailOpened={mailOpened} />}
        {screen === 'm4' && <ScreenM4 navigate={navigate} />}
        {screen === 'm5' && <ScreenM5 navigate={navigate} pins={pins} setPins={setPins} />}
        {screen === 'm6' && <ScreenM6 navigate={navigate} btsCode={bts} pins={pins} livrable={livrable} setLivrable={setLivrable} />}
        {screen === 'm7' && <ScreenM7 btsCode={bts} pins={pins} livrable={livrable} />}
      </div>
    </div>
  )
}
