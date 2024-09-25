import type { Cell } from 'root:types'

type MatrixContextType = {
  matrix: Cell[][]
  updateCell({ row, col, amount }: { row: number; col: number; amount: number }): void
  updateMatrix({ rows, cols }: { rows: number; cols: number }): void
}

export type { MatrixContextType }
