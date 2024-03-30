/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { useSortable } from "@dnd-kit/sortable";
import { handlerDelete } from "../functions";
import { Column } from "../types/column";
import { BsTrash3Fill } from "react-icons/bs";
import { CSS } from "@dnd-kit/utilities";


type Props = {
  column: Column
  columns: Column[]
  setColumns: (columns: Column[]) => void
}

const ColumnContainer = ({ column, setColumns, columns }: Props) => {

  const sort = useSortable({
    id: column.id,
    data: {
      type: column,
      column
    }
  })

  const style = {
    transition: sort.transition,
    transform: CSS.Transform.toString(sort.transform),
  }

  /*
  if (sort.isDragging) {
    return <div ref={sort.setNodeRef} style={style} className="border-2 border-rose-400 opacity-40 bg-columnBackground w-[350px] h-[500px] max-h-[500px] rounded-md flex flex-col"></div>
  }
*/

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
        className="bg-mainBackground text-md h-[60px] cursor-grab rounded-md round-b-none p-3 font-bold border-4 border-columnBackground flex items-center justify-between">
        <div className="flex gap-2 ">
          <span className="flex items-center justify-center px-2 py-1 text-sm rounded-full text-rose-700 bg-columnBackground">0</span>
          <h3 className="mt-1">{column.title}</h3>
        </div>
        <div className="flex">
          <button
            onClick={() => handlerDelete(columns, setColumns, column.id)}
            type="button" className="z-10 mt-1">
            <BsTrash3Fill className="align-bottom text-emerald-500 hover:text-emerald-300" />
          </button>

        </div>
      </div>
      {/* Column task container */}
      <div className="flex flex-grow">Content</div>
      {/* Column footer */}
      <div>Footer</div>
    </div>
  )
}

export default ColumnContainer