import { useCallback, type FC } from 'react'
import classNames from 'classnames'

import { useMatrix } from 'root:matrix'
import { Cell } from 'root:types'

import styles from './styles.module.css'
import type { CellClickHandler } from './types'

const Table: FC = () => {
  const { matrix, updateCell } = useMatrix()
  const handleCellClick: CellClickHandler =
    ({ row, col, amount }) =>
    () => {
      updateCell({ row, col, amount: amount + 1 })
    }
  const calculateSum = (row: Cell[]) => row.reduce((a, b) => a + b.amount, 0)
  const calculateAvg = useCallback(
    (index: number) => {
      return matrix.reduce((a, b) => a + b[index].amount, 0) / matrix.length
    },
    [matrix],
  )

  return (
    <table className={classNames({ [styles.matrix]: true, [styles['matrix-visible']]: !!matrix.length })}>
      <tbody>
        {matrix.map((row, i) => (
          <tr key={i}>
            {row.map((cell, j) => (
              <td key={cell.id} onClick={handleCellClick({ row: i, col: j, amount: cell.amount })}>
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
