import type { Cell } from 'root:types'

type CellClickHandler = ({ row, col, amount }: { row: number; col: number; amount: number }) => () => void

type RowSumCalculator = (row: Cell[]) => number

type ColAverageCalculator = (colIndex: number) => number

type MouseOverCellHandler = (cell?: Cell) => () => void

type MouseOverSumHandler = (rowIndex?: number) => () => void

type RowHeaderClickHandler = (rowIndex: number) => () => void

export type {
  CellClickHandler,
  ColAverageCalculator,
  MouseOverCellHandler,
  MouseOverSumHandler,
  RowHeaderClickHandler,
  RowSumCalculator,
}
