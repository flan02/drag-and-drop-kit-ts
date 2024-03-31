/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/ban-types */

import { BsFillTrash3Fill } from "react-icons/bs"
import { Task } from "../types/column"
import React from "react"
import { handlerTaskDelete, handlerUpdateTask, toggleEditMode } from "../functions"
import { useSortable } from "@dnd-kit/sortable"
import { CSS } from "@dnd-kit/utilities";



type Props = {
  task: Task
  tasks: Task[]
  setTasks: (tasks: Task[]) => void
  setActiveTask?: (activeTask: Task) => void
}

const TaskCard = ({ task, tasks, setTasks }: Props) => {

  const [mouseIsOver, setMouseIsOver] = React.useState<boolean>(false)
  const [editMode, setEditMode] = React.useState<boolean>(false)
  const sort = useSortable({
    id: task.id,
    data: {
      type: "Task",
      task
    },
    disabled: editMode // ? We can't drag the column when we are editing the title
  })

  const style = {
    transition: sort.transition,
    transform: CSS.Transform.toString(sort.transform),
  }

  if (sort.isDragging) {
    return <div ref={sort.setNodeRef} style={style} className="opacity-50 task relative cursor-grab w-[350px] bg-mainBackground mt-1 p-2 h-[100px] min-h-[100px] items-center flex text-left hover:ring-2 hover:ring-inset hover:ring-rose-500">
      {task.content}
    </div>
  }

  return (
    <>
      {
        !editMode ?
          <article
            style={style}
            ref={sort.setNodeRef}
            {...sort.attributes}
            {...sort.listeners}
            onClick={() => toggleEditMode(editMode, setEditMode, setMouseIsOver)}
            onMouseEnter={() => {
              if (!editMode) setMouseIsOver(true)
              return
            }}
            onMouseLeave={() => {
              if (!editMode) setMouseIsOver(false)
              return
            }}
            key={task.id}
            className="task relative cursor-grab w-[350px] bg-mainBackground mt-1 p-2 h-[100px] min-h-[100px] items-center flex text-left hover:ring-2 hover:ring-inset hover:ring-rose-500">
            <p className="w-[305px] my-auto h-[90%] overflow-x-hidden overflow-y-auto whitespace-pre-wrap">
              {task.content}
            </p>
            {
              mouseIsOver
                ? <button
                  onClick={() => handlerTaskDelete(task.id, tasks, setTasks)}
                  className="absolute -translate-y-1/2 stroke-white right-4 top-1/2 bg-columnBackground">
                  <BsFillTrash3Fill className="text-sky-100 hover:text-sky-300" />
                </button>
                : null
            }
          </article >
          :
          <div
            style={style}
            ref={sort.setNodeRef}
            {...sort.attributes}
            {...sort.listeners}
          >
            <textarea
              className="overflow-auto resize-none border-none mx-auto ml-2 mt-1 p-2 w-[334px] h-[100px] min-h-[100px] bg-transparent focus:online-none"
              value={task.content} autoFocus onBlur={() => toggleEditMode(editMode, setEditMode, setMouseIsOver)}
              onKeyDown={(e) => {
                if (e.key == 'Enter' && e.shiftKey) toggleEditMode(editMode, setEditMode, setMouseIsOver) // * This is a way to handle the "Enter key" of our KEYBOARD
                //if (e.key == 'Enter') toggleEditMode(editMode, setEditMode, setMouseIsOver) // * This is a way to handle the "Enter key" of our KEYBOARD
              }}
              onChange={(e) => {
                //console.log(e);
                const eventValue = e.target.value
                handlerUpdateTask(tasks, task.id, eventValue, setTasks)
              }}
            />
          </div>
      }
    </>

  )
}

export default TaskCard