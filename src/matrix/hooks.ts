import { useContext } from 'react'

import { MatrixContext } from './context'

const useMatrix = () => useContext(MatrixContext)

export { useMatrix }
