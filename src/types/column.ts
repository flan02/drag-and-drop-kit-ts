type Id = string | number

export type Column = {
  id: Id
  title: string
}

export type Task = {
  id: Id
  columnId: Id
  content: string
  date: string
  updatedAt: boolean
}

export interface ColumnParams {
  columns: Column[]
  setColumns: (columns: Column[]) => void
}

