/* eslint-disable @typescript-eslint/no-unused-vars */
import { DragEndEvent, DragOverEvent, DragStartEvent } from "@dnd-kit/core";
import { Column, ColumnParams, Task } from "../types/column";
import { arrayMove } from "@dnd-kit/sortable";
//import { arrayMove } from "@dnd-kit/sortable";



const generateId = () => {
  return Math.floor(Math.random() * 1000.33)
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

export const handlerColumnDelete = (columns: Column[], setColumns: (columns: Column[]) => void, id: number | string, setTasks: (tasks: Task[]) => void, tasks: Task[]) => {
  //console.log('delete button clicked', id);
  const filteredColumns = columns.filter((column) => column.id !== id)
  setColumns(filteredColumns)
  // ? Deleting all tasks from the column. Avoiding orphan tasks
  const newTasks = tasks.filter((task: Task) => task.columnId !== id)
  setTasks(newTasks)
}

export const handlerOnDragStart = (setActiveColumn: (activeColumn: Column) => void, e: DragStartEvent, setActiveTask: (activeTask: Task) => void) => {
  //console.log(e)
  if (e.active.data.current?.type === 'Column') { // * Warning, maybe there is a bug here or error
    setActiveColumn(e.active.data.current.column)
    return 0
  }

  if (e.active.data.current?.type === 'Task') { // * Warning, maybe there is a bug here or error
    //console.log(e.active.id);
    setActiveTask(e.active.data.current.task)
    return 0
  }
  return 0
}

export const handlerOnDragEnd = (e: DragEndEvent, columns: Column[], setColumns: (columns: Column[]) => void, setActiveColumn: (activeColumn: Column | null) => void, setActiveTask: (activeTask: Task | null) => void) => {
  //console.log(e);
  // ? When the drag ends, we are removing our <DragOverlay> components
  setActiveColumn(null)
  setActiveTask(null)

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
  return // * Maybe this return isn't necessary. Keep an eye on it
}

export const handlerOnDragOver = (e: DragOverEvent, tasks: Task[], setTasks: (tasks: Task[]) => void) => {
  if (e.active.id === e.over?.id) return
  const isActiveTask = e.active.data.current?.type === 'Task'
  const isOverTask = e.over?.data.current?.type === 'Task'
  if (!isActiveTask) return // ? I'm not dragging a Task, so I don't need to do anything
  // ? I'm dropping a Task over another Task
  if (isActiveTask && isOverTask) {
    //console.log('I\'m dropping a Task over another Task')
    setTasks((() => {
      const activeIndex = tasks.findIndex((task) => task.id === e.active.id)
      const overIndex = tasks.findIndex((task) => task.id === e.over?.id)

      // ? If the tasks are in different columns, we need to update the columnId
      if (tasks[activeIndex].columnId !== tasks[overIndex].columnId) {
        tasks[activeIndex].columnId = tasks[overIndex].columnId // ? Updating the columnId
      }

      return arrayMove(tasks, activeIndex, overIndex)
    })());
    return // * Maybe this return isn't necessary. Keep an eye on it
  }

  const isOverColumn = e.over?.data.current?.type === 'Column'
  // ? I'm dropping a Task over a Column
  if (isActiveTask && isOverColumn) {
    //console.log('I\'m dropping a Task over a Column')
    setTasks((() => {
      const activeIndex = tasks.findIndex((task) => task.id === e.active.id)

      tasks[activeIndex].columnId = e.over?.id as number | string
      return arrayMove(tasks, activeIndex, activeIndex) // ? params:  array: Task[], from: number, to: number
    })());
  }


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
    content: `This is the new Task number ${tasksLength + 1} for id: ${id}`,
    date: new Date().toLocaleString(),
    updatedAt: false
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
      content: eventValue,
      date: new Date().toLocaleString(),
      updatedAt: true
    }
  })


  setTasks(newTasks)
}