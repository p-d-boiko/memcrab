import { type FC } from 'react'
import classNames from 'classnames'

import { useMatrix } from 'root:matrix'
import { Cell } from 'root:types'

import styles from './styles.module.css'
import type { CellClickHandler, MouseOverHandler, ColAverageCalculator, RowSumCalculator } from './types'

const Table: FC = () => {
  const { matrix, updateCell, chooseNearest, nearest } = useMatrix()
  const handleCellClick: CellClickHandler =
    ({ row, col, amount }) =>
    () => {
      updateCell({ row, col, amount: amount + 1 })
      chooseNearest({ id: matrix[row][col].id, amount: amount + 1 })
    }
  const calculateSum: RowSumCalculator = (row: Cell[]) => row.reduce((a, b) => a + b.amount, 0)
  const calculateAvg: ColAverageCalculator = (index: number) => {
    return matrix.reduce((a, b) => a + b[index].amount, 0) / matrix.length
  }
  const handleMouseOver: MouseOverHandler = (cell) => () => {
    chooseNearest(cell)
  }

  return (
    <table className={classNames({ [styles.matrix]: true, [styles['matrix-visible']]: !!matrix.length })}>
      <tbody>
        {matrix.map((row, i) => (
          <tr key={i}>
            {row.map((cell, j) => (
              <td
                key={cell.id}
                onMouseOver={handleMouseOver(cell)}
                onMouseOut={handleMouseOver()}
                onClick={handleCellClick({ row: i, col: j, amount: cell.amount })}
                className={classNames({ [styles.nearest]: nearest.includes(cell.id) })}
              >
                {cell.amount}
              </td>
            ))}
            <td>{calculateSum(row)}</td>
          </tr>
        ))}
      </tbody>
      <tfoot>
        <tr>
          {matrix[0]?.map((_, i) => (
            <td key={i}>
              {String(calculateAvg(i))
                .split('.')
                .map((part) => (
                  <span>{part}</span>
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
