import * as React from 'react'
import DraggableListItem from './DraggableListItem'
import {
    DragDropContext,
    Droppable,
    OnDragEndResponder
} from 'react-beautiful-dnd'
import { IPhaseCreate } from '~/interfaces/PhasePreset'

export type DraggableListProps = {
    items: IPhaseCreate[]
    onDragEnd: OnDragEndResponder
    deletePhase: (index: number) => void
    setPhases: React.Dispatch<React.SetStateAction<IPhaseCreate[]>>
}

const DraggableList = React.memo(({ items, onDragEnd, deletePhase, setPhases }: DraggableListProps) => {
    return (
        <DragDropContext onDragEnd={onDragEnd}>
            <Droppable droppableId="droppable-list">
                {provided => (
                    <div ref={provided.innerRef} {...provided.droppableProps}>
                        {items.map((item, index) => (
                            <DraggableListItem item={item} index={index} key={item.order} deletePhase={deletePhase} setPhases={setPhases} items={items} />
                        ))}
                        {provided.placeholder}
                    </div>
                )}
            </Droppable>
        </DragDropContext>
    )
})

export default DraggableList