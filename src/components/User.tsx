/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/ban-types */

import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Person } from '../types/person'


type Props = {
  person: Person;
}


const User = ({ person }: Props) => {
  const dndSortable = useSortable({ id: person.id }); // ? Identifies the element as a sortable item
  //console.log(dndSortable);
  // ? dndSortable.attritubes: What properties will have the element when it is being dragged  
  // ? dndSortable.listeners: What events will be triggered when the element is being dragged  
  // ? dndSortable.setNodeRef: A reference in React DOM to the element that will be dragged 

  const style = {
    //transform: `translate3d(${dndSortable.transform?.x}px, ${dndSortable.transform?.y}px, 0)`, // $ move the element in any position
    transition: dndSortable.transition,
    transform: CSS.Transform.toString(dndSortable.transform)
  }
  // ? dndSortable.transform: The position of the element when it is being dragged  
  // ? dndSortable.transition: The transition of the element when it is being dragged 
  return (


    <ul>
      <li
        ref={dndSortable.setNodeRef}
        {...dndSortable.attributes}
        {...dndSortable.listeners}
        style={style}
        key={person.id} className='bg-teal-200 py-4 shadow-md rounded-md my-1 hover:bg-teal-300'>Name: {person.name} Age: {person.age} id: {person.id}
      </li>


    </ul>


  )
}

export default User