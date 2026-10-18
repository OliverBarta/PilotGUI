import { useState } from "react"

import TopBar from "./TopBar"
import WindowArea from "./WindowArea"

function App() {
  const [numWindows, setNumWindows] = useState(1)

  return (
    <div className="appOuterDiv">
      <TopBar numWindows={numWindows} setNumWindows={setNumWindows}/>
      <WindowArea numWindows={numWindows} />
    </div>
  )
}

export default App
