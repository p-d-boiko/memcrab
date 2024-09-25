import { type FC } from 'react'

import StartConfigurator from 'root:components/start-configurator'
import Table from 'root:components/table'
import 'root:styles/app.css'

const App: FC = () => (
  <>
    <StartConfigurator />
    <Table />
  </>
)

export default App
