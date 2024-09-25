import { createContext, useState, type FC, type ReactNode, type Context } from 'react'

import type { Cell } from 'root:types'

import type { MatrixContextType } from './types'

const MatrixContext: Context<MatrixContextType> = createContext<MatrixContextType>({
  matrix: [],
  nearest: [],
  chooseNearest: () => {},
  updateCell: () => {},
  updateMatrix: () => {},
  deleteRow: () => {},
})

const MatrixContextProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [matrix, setMatrix] = useState<MatrixContextType['matrix']>([])
  const [nearest, setNearest] = useState<Cell['id'][]>([])
  const updateMatrix: MatrixContextType['updateMatrix'] = ({ rows, cols }) => {
    setMatrix(
      Array.from({ length: rows }, (_, i) =>
        Array.from({ length: cols }, (_, j) => ({ id: i * cols + j, amount: Math.ceil(Math.random() * rows * cols) })),
      ),
    )
  }
  const updateCell: MatrixContextType['updateCell'] = ({
    row,
    col,
    amount,
  }: {
    row: number
    col: number
    amount: number
  }) => {
    matrix[row][col].amount = amount
    setMatrix([...matrix])
  }
  const chooseNearest: MatrixContextType['chooseNearest'] = (hoveredCell?: Cell) => {
    if (hoveredCell === undefined) {
      setNearest([])
    } else {
      const amount = hoveredCell.amount
      const ray = matrix.flat() // make a one-dimention array from the matrix, i.e. a ray
      const hoverCellInRayIndex = ray.findIndex(({ id }) => id === hoveredCell.id)
      ray.splice(hoverCellInRayIndex, 1) // get rid of hovered cell from the ray
      const ids: Cell['id'][] = ray
        .sort((a, b) => Math.abs(a.amount - amount) - Math.abs(b.amount - amount)) // sort by nearest amount
        .slice(0, amount) // cut off by amount
        .map((cell) => cell.id) // extract ids

      setNearest(ids)
    }
  }
  const deleteRow: MatrixContextType['deleteRow'] = (rowIndex) => {
    const newMatrix = [...matrix]
    newMatrix.splice(rowIndex, 1)
    setMatrix(newMatrix)
  }

  return (
    <MatrixContext.Provider value={{ matrix, nearest, chooseNearest, updateMatrix, updateCell, deleteRow }}>
      {children}
    </MatrixContext.Provider>
  )
}

export { MatrixContext, MatrixContextProvider }
