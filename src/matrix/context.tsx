import { createContext, useState, type FC, type ReactNode, type Context } from 'react'

import type { MatrixContextType } from './types'

const MatrixContext: Context<MatrixContextType> = createContext<MatrixContextType>({
  matrix: [],
  updateCell: () => {},
  updateMatrix: () => {},
})

const MatrixContextProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [matrix, setMatrix] = useState<MatrixContextType['matrix']>([])
  const updateMatrix: MatrixContextType['updateMatrix'] = ({ rows, cols }) => {
    setMatrix(
      Array.from({ length: rows }, (_, i) =>
        Array.from({ length: cols }, (_, j) => ({ id: i * cols + j, amount: Math.ceil(Math.random() * 9) })),
      ),
    )
  }
  const updateCell = ({ row, col, amount }: { row: number; col: number; amount: number }) => {
    matrix[row][col].amount = amount
    setMatrix([...matrix])
  }

  return <MatrixContext.Provider value={{ matrix, updateMatrix, updateCell }}>{children}</MatrixContext.Provider>
}

export { MatrixContext, MatrixContextProvider }
