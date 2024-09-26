import type { TransitionEventHandler } from 'react'

type CreateMatrixHandler = ({ rows, cols }: { rows: number; cols: number }) => TransitionEventHandler<HTMLFormElement>

export type { CreateMatrixHandler }
