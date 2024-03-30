/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/ban-types */

import { AiOutlinePlus } from "react-icons/ai";
import { createColumn, handlerOnDragEnd, handlerOnDragStart } from "../functions"; // Ensure createColumn accepts two arguments
import React from "react";
import { Column, Task } from "../types/column";
import ColumnContainer from "./ColumnContainer";
import { DndContext, DragCancelEvent, DragOverlay, DragStartEvent, PointerSensor, useSensor, useSensors } from "@dnd-kit/core";
import { SortableContext } from "@dnd-kit/sortable";
import { createPortal } from "react-dom";

type Props = {}



const KanbanBoard = (_props: Props) => {
  const [columns, setColumns] = React.useState<Column[]>([])
  // $ columns.map((column) => column.id) is an array of only column ids. With useMemo it will only recalculate the value when the dependencies change either by adding or deleting a column.
  const columnsId = React.useMemo(() => columns.map((column) => column.id), [columns]) // ? Calculate the columnsId every time [columns] changes: By using useMemo, we can avoid recalculating columnsId every time the component re-renders. This is because useMemo will only recalculate the value when the dependencies change.
  //console.log(columns); //console.log(columnsId);
  const [tasks, setTasks] = React.useState<Task[]>([])
  const [activeColumn, setActiveColumn] = React.useState<Column | null>(null)
  const sensors = useSensors(useSensor(PointerSensor, {
    activationConstraint: {
      distance: 50, // 50px // ? The distance the pointer must travel before the drag sequence begins.
    }

  }))

  return (
    <div className="m-auto flex min-h-screen w-full items-center overflow-auto overflow-y-hidden px-[40px]">
      <DndContext
        onDragStart={(e: DragStartEvent) => {
          const event = e
          handlerOnDragStart(setActiveColumn, event)
        }}
        onDragEnd={(e: DragCancelEvent) => handlerOnDragEnd(e, columns, setColumns)}
        sensors={sensors}
      >
        <div className="flex flex-col gap-4 m-auto">
          {
            columns.length > 0
              ? <section className="flex gap-4 ">
                <SortableContext items={columnsId}>
                  {
                    columns.map((column) => (
                      <ColumnContainer column={column} key={column.id} setColumns={setColumns} columns={columns} />
                    ))
                  }
                </SortableContext>
              </section>
              : <p className="text-2xl font-bold text-center text-rose-700">No columns yet</p>
          }

          <button
            onClick={() => createColumn({ columns, setColumns })} // Ensure createColumn accepts two arguments
            className="h-[60px] w-[350px] min-w-[350px] cursor-pointer rounded-lg bg-mainBackground border-2 border-columnBackground hover:bg-slate-800 hover:text-rose-700 p-4 ring-rose-500 hover:ring-2">
            <span>Add Column</span>
            <AiOutlinePlus className="inline-block mb-1 ml-2" />
          </button>
        </div>
        <DragOverlay>
          {
            createPortal(
              activeColumn ? <ColumnContainer key={activeColumn.id} column={activeColumn} setColumns={setColumns} columns={columns} /> : null,
              document.body
            )
          }
        </DragOverlay>
      </DndContext>
    </div>
  )
}

export default KanbanBoard