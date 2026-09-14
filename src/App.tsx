import { useEffect, useState } from 'react'
import PortfolioShell from './components/PortfolioShell'
import { bindDocumentScale } from './lib/scale'
import './styles/tokens.css'

export default function App() {
  const [ready, setReady] = useState(false)

  useEffect(() => {
    const unbind = bindDocumentScale()
    setReady(true)
    return unbind
  }, [])

  return (
    <div className={`app-shell${ready ? ' is-ready' : ''}`}>
      <div className="luna-root">
        <div className="luna-canvas-row">
          <PortfolioShell />
        </div>
      </div>
    </div>
  )
}
