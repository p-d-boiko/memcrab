import type { Cell } from 'root:types'

type MatrixContextType = {
  matrix: Cell[][]
  nearest: Cell['id'][]
  chooseNearest(value?: Cell): void
  updateCell({ row, col, amount }: { row: number; col: number; amount: number }): void
  updateMatrix({ rows, cols }: { rows: number; cols: number }): void
  deleteRow(index: number): void
  appendRow(): void
}

export type { MatrixContextType }
