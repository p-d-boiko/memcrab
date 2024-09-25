import { useState, type FC } from 'react'
import classNames from 'classnames'

import { useMatrix } from 'root:matrix'
import { Cell } from 'root:types'

import styles from './styles.module.css'
import type {
  CellClickHandler,
  ColAverageCalculator,
  MouseOverCellHandler,
  MouseOverSumHandler,
  RowHeaderClickHandler,
  RowSumCalculator,
} from './types'

const Table: FC = () => {
  const [percentageRow, setPercentageRow] = useState<number | undefined>()
  const { matrix, updateCell, chooseNearest, nearest, deleteRow, appendRow } = useMatrix()
  const handleCellClick: CellClickHandler =
    ({ row, col, amount }) =>
    () => {
      updateCell({ row, col, amount: amount + 1 })
      chooseNearest({ id: matrix[row][col].id, amount: amount + 1 })
    }
  const calculateSum: RowSumCalculator = (row: Cell[]) => row.reduce((a, b) => a + b.amount, 0)
  const calculateAvg: ColAverageCalculator = (index) => {
    return matrix.reduce((a, b) => a + b[index].amount, 0) / matrix.length
  }
  const handleMouseOverCell: MouseOverCellHandler = (cell) => () => {
    chooseNearest(cell)
  }
  const handleMouseOverSum: MouseOverSumHandler = (rowIndex) => () => {
    setPercentageRow(rowIndex)
  }
  const handleRowHeaderClick: RowHeaderClickHandler = (rowIndex) => () => {
    deleteRow(rowIndex)
  }

  return (
    <table className={classNames({ [styles.matrix]: true, [styles['matrix-visible']]: !!matrix.length })}>
      <tbody>
        {matrix.map((row, i) => (
          <tr key={i}>
            <th scope="row" onClick={handleRowHeaderClick(i)}>
              ❌
            </th>
            {row.map((cell, j) => {
              const isHighlighted = nearest.includes(cell.id) || percentageRow === i

              return (
                <td
                  key={cell.id}
                  onMouseOver={handleMouseOverCell(cell)}
                  onMouseOut={handleMouseOverCell()}
                  onClick={handleCellClick({ row: i, col: j, amount: cell.amount })}
                  className={classNames({ [styles.highlighted]: isHighlighted })}
                >
                  {percentageRow === i ? `${Math.round((cell.amount / calculateSum(row)) * 100)}%` : cell.amount}
                </td>
              )
            })}
            <td onMouseOver={handleMouseOverSum(i)} onMouseOut={handleMouseOverSum()}>
              {calculateSum(row)}
            </td>
          </tr>
        ))}
      </tbody>
      <tfoot>
        <tr>
          <th scope="row" onClick={appendRow}>
            +
          </th>
          {matrix[0]?.map((cell, i) => (
            <td key={i}>
              {String(calculateAvg(i))
                .split('.')
                .map((part) => (
                  <span key={`${cell.id}-${part}`}>{part}</span>
                ))}
            </td>
          ))}
          <td />
        </tr>
      </tfoot>
    </table>
  )
}

export default Table
