/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { SortableContext, useSortable } from "@dnd-kit/sortable";
import { createTask, handlerDelete, handlerUpdateColumn } from "../functions";
import { Column, Task } from "../types/column";
import { BsTrash3Fill } from "react-icons/bs";
import { CSS } from "@dnd-kit/utilities";
import React from "react";
import { AiOutlinePlus } from "react-icons/ai";
import TaskCard from "./TaskCard";


type Props = {
  column: Column
  columns: Column[]
  tasks: Task[]
  setColumns: (columns: Column[]) => void
  setTasks: (tasks: Task[]) => void

}

const ColumnContainer = ({ column, setColumns, columns, tasks, setTasks }: Props) => {
  const [editMode, setEditMode] = React.useState<boolean>(false)
  const tasksId = React.useMemo(() => tasks.map((task) => task.id), [tasks])
  const sort = useSortable({
    id: column.id,
    data: {
      type: "Column",
      column
    },
    disabled: editMode // ? We can't drag the column when we are editing the title
  })

  const style = {
    transition: sort.transition,
    transform: CSS.Transform.toString(sort.transform),
  }


  if (sort.isDragging) {
    return <div ref={sort.setNodeRef} style={style} className="opacity-40 bg-columnBackground w-[350px] h-[500px] max-h-[500px] rounded-md flex flex-col"></div>
  }


  return (
    <div
      // ? The dnd-kit library can handle our <div>
      ref={sort.setNodeRef} // * The ref prop is used to attach a ref to the element. This is used to access the DOM element in React. The ref prop is a function that takes the reference to the element as an argument.
      style={style}
      className="bg-columnBackground w-[350px] h-[500px] max-h-[500px] rounded-md flex flex-col">
      {/* Column title */}
      <div
        // ? We only can drag the column by the <div> title
        {...sort.attributes}
        {...sort.listeners}
        onClick={() => setEditMode(true)}
        className="bg-mainBackground text-md h-[60px] cursor-grab rounded-md round-b-none p-3 font-bold border-4 border-columnBackground flex items-center justify-between">
        <div className="flex gap-2 ">
          <span className="flex items-center justify-center px-2 py-1 text-sm rounded-full text-rose-700 bg-columnBackground">{columns.findIndex((col: Column) => col.id === column.id)}</span>
          <h3 className="mt-1">
            {editMode
              ? <input value={column.title} onChange={(e) => handlerUpdateColumn(columns, column.id, e.target.value, setColumns)} autoFocus onBlur={() => setEditMode(false)} onKeyDown={(e) => {
                if (e.key !== 'Enter') return
                setEditMode(false)
              }}
                className="px-2 bg-black border rounded outline-none focus:border-rose-400"
              />
              : column.title
            }
          </h3>
        </div>
        <div className="flex">
          <button
            onClick={() => handlerDelete(columns, setColumns, column.id, setTasks, tasks)}
            type="button" className="z-10 mt-1">
            <BsTrash3Fill className="align-bottom text-emerald-500 hover:text-emerald-300" />
          </button>

        </div>
      </div>
      {/* Column task container */}
      <div className="flex flex-grow overflow-x-hidden overflow-y-auto">
        <SortableContext items={tasksId}>
          <section>
            {
              tasks.filter((task) => task.columnId === column.id).map((task) => (
                <TaskCard task={task} tasks={tasks} key={task.id} setTasks={setTasks} />
              ))
            }
          </section>
        </SortableContext>

      </div>
      {/* Column footer */}
      <button
        onClick={() => createTask(column.id, tasks, setTasks)}
        className="flex items-center gap-2 p-4 border-2 rounded-md border-columnBackground border-x-columnBackground hover:bg-mainBackground hover:text-rose-500 active:bg-black"
      >
        <AiOutlinePlus className="inline-block ml-2" />
        <span >Add Task</span>
      </button>
    </div>
  )
}

export default ColumnContainer