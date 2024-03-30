/* eslint-disable @typescript-eslint/no-unused-vars */
import { DragEndEvent, DragStartEvent } from "@dnd-kit/core";
import { Column, ColumnParams, Task } from "../types/column";
//import { arrayMove } from "@dnd-kit/sortable";



const generateId = () => {
  return Math.floor(Math.random() * 10000)
}

export const createColumn = ({ columns, setColumns }: ColumnParams) => {
  //console.log('everything is working by now...');
  const newColumn: Column = {
    id: generateId(),
    title: `Column ${columns.length + 1}`
  }

  setColumns([...columns, newColumn])
  return columns
}

export const handlerDelete = (columns: Column[], setColumns: (columns: Column[]) => void, id: number | string) => {
  console.log('delete button clicked', id);
  const filteredColumns = columns.filter((column) => column.id !== id)
  setColumns(filteredColumns)
}

export const handlerOnDragStart = (setActiveColumn: (activeColumn: Column) => void, e: DragStartEvent) => {
  //console.log(e)
  if (e.active.data.current?.type === 'Column') { // * Warning, maybe there is a bug here or error
    setActiveColumn(e.active.data.current.column)
    return
  }
}

export const handlerOnDragEnd = (e: DragEndEvent, columns: Column[], setColumns: (columns: Column[]) => void) => {
  //console.log(e);
  if (!e.over) return // ? it means we are not dragging over any column / a valid element
  if (e.active.id === e.over.id) return // ? it means we are dragging over the same column

  //const newColumns = 
  setColumns((() => {
    const oldIndex = columns.findIndex((column: Column) => column.id === e.active.id)
    const newIndex = columns.findIndex((column: Column) => column.id === e.over?.id)
    const newColumns = [...columns]
    newColumns.splice(oldIndex, 1)
    newColumns.splice(newIndex, 0, columns[oldIndex])
    //return arrayMove(columns, oldIndex, newIndex) // $ This solution is provided by the dnd-kit library
    return newColumns
  })());

}

export const handlerUpdateColumn = (columns: Column[], columnId: number | string, eventValue: string, setColumns: (columns: Column[]) => void) => {
  //console.log(columnId, eventValue);
  const newColumns = columns.map((column) => {
    if (column.id !== columnId) return column
    return {
      ...column,
      title: eventValue
    }
  })
  setColumns(newColumns)
}

export const createTask = (id: number | string, tasks: Task[], setTasks: (tasks: Task[]) => void) => {
  //console.log('creating task in column with id: ', id);
  const tasksLength = tasks.filter((task) => task.columnId === id).length
  const newTask: Task = {
    id: generateId(),
    columnId: id,
    content: `This is the new Task number ${tasksLength + 1} for id: ${id}`
  }
  //console.log(newTask)
  setTasks([...tasks, newTask])
  return 0
}

export const handlerTaskDelete = (id: number | string, tasks: Task[], setTasks: (tasks: Task[]) => void) => {
  //console.log('delete task button clicked', id);
  const filteredTasks = tasks.filter((task) => task.id !== id)
  setTasks(filteredTasks)
}

export const toggleEditMode = (editMode: boolean, setEditMode: (editMode: boolean) => void, setMouseIsOver: (editMode: boolean) => void) => {
  //setEditMode((prev) => !prev)
  setEditMode(!editMode)
  setMouseIsOver(false)
}

export const handlerUpdateTask = (tasks: Task[], id: number | string, eventValue: string, setTasks: (tasks: Task[]) => void) => {
  //console.log(taskId, eventValue);
  const newTasks = tasks.map((task) => {
    if (task.id !== id) return task

    return {
      ...task,
      content: eventValue
    }
  })
  setTasks(newTasks)
}