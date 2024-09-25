import type { Cell } from 'root:types'

type CellClickHandler = ({ row, col, amount }: { row: number; col: number; amount: number }) => () => void

type RowSumCalculator = (row: Cell[]) => number

type ColAverageCalculator = (colIndex: number) => number

type MouseOverHandler = (cell?: Cell) => () => void

export type { CellClickHandler, MouseOverHandler, RowSumCalculator, ColAverageCalculator }
