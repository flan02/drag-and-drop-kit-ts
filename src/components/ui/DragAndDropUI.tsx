/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/ban-types */
import React from 'react'
import { IHandlerDragEnd, Person } from '../../types/person'
import { people } from '../../fakedb'
import { DndContext, KeyboardSensor, MouseSensor, PointerSensor, TouchSensor, closestCenter, useSensor, useSensors } from '@dnd-kit/core'
import { SortableContext, verticalListSortingStrategy, arrayMove, sortableKeyboardCoordinates } from '@dnd-kit/sortable'
import { restrictToVerticalAxis } from '@dnd-kit/modifiers'
import User from '../User'
import { Reorder } from 'framer-motion'

type Props = {}




const DragAndDropUI = (_props: Props) => {
  const initialState: Person[] = people
  const [listPeople, setListPeople] = React.useState<Person[]>(initialState)


  const handlerDragEnd = (e: unknown) => {
    // $ e: The event that is triggered when the element is released
    //console.log(e);
    const { active, over } = e as IHandlerDragEnd
    if (active.id === over.id) return // ? If the element is released in the same position, do nothing (return
    setListPeople((listPeople) => {
      const oldIndex = listPeople.findIndex((person) => person.id === active.id) // ? Find the start index of the element that is being dragged (FROM)
      const newIndex = listPeople.findIndex((person) => person.id === over.id) // ? Find the index of the element that is being dragged over (TO)
      const reorderPeople = arrayMove(listPeople, oldIndex, newIndex) // ? Reorder the element to the new index
      //console.log(reorderPeople);
      // * We could send the new order to the backend doing a axios request
      return reorderPeople; // ? Update the state with the new order. It returns the People[] reordered
    })
  }

  const sensors = useSensors(
    useSensor(MouseSensor),
    useSensor(PointerSensor),
    useSensor(TouchSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates
    })
  )

  return (

    <DndContext
      collisionDetection={closestCenter}
      onDragEnd={handlerDragEnd}
      sensors={sensors}
      modifiers={[restrictToVerticalAxis]}
    >

      <SortableContext
        items={listPeople}
        strategy={verticalListSortingStrategy}
      >

        {
          listPeople.map((person) => (

            <User person={person} key={person.id} />

          ))
        }

      </SortableContext>



    </DndContext>

    /* 
    $ Framer Motion animation for drag and drop
    <DndContext
      collisionDetection={closestCenter}
      onDragEnd={handlerDragEnd}
      sensors={sensors}
      modifiers={[restrictToVerticalAxis]}
    >
      <SortableContext
        items={listPeople}
        strategy={verticalListSortingStrategy}
      >
        <Reorder.Group values={listPeople} onReorder={setListPeople}>
          {
            listPeople.map((person) => (
              <Reorder.Item key={person.id} value={person}>
                <User person={person} key={person.id} />
              </Reorder.Item>
            ))
          }
        </Reorder.Group>
      </SortableContext>
    </DndContext>
    */

  )
}

export default DragAndDropUI