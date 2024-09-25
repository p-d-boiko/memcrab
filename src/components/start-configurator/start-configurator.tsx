import { useState, type FC, type ChangeEventHandler, type TransitionEventHandler, type FormEventHandler } from 'react'
import classNames from 'classnames'

import { useMatrix } from 'root:matrix'

import styles from './styles.module.css'

const StartConfigurator: FC = () => {
  const [rows, setRows] = useState(0)
  const [cols, setCols] = useState(0)
  const [visible, setVisible] = useState(true)
  const { updateMatrix } = useMatrix()

  const handleRowsChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    setRows(parseInt(e.target.value, 10))
  }

  const handleColsChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    setCols(parseInt(e.target.value, 10))
  }

  const hideForm: FormEventHandler = (e) => {
    e.preventDefault()
    setVisible(false)
  }

  const createMatrix: TransitionEventHandler<HTMLFormElement> = (e) => {
    e.currentTarget.remove()
    updateMatrix({ cols, rows })
  }

  return (
    <form
      onSubmit={hideForm}
      onTransitionEnd={createMatrix}
      className={classNames({
        [styles.form]: true,
        [styles.hidden]: !visible,
      })}
    >
      Please provide initial matrix size
      <div>
        <input id="number-of-rows" type="number" value={rows} onChange={handleRowsChange} min={0} max={100} autoFocus />
        x
        <input id="number-of-cols" type="number" value={cols} onChange={handleColsChange} min={0} max={100} />
      </div>
      <input disabled={rows === 0 || cols === 0} type="submit" value="Create matrix" />
    </form>
  )
}

export default StartConfigurator
