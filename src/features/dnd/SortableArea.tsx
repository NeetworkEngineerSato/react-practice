import React, { ReactElement } from 'react';
import {
  DndContext,
  DragEndEvent,
  MouseSensor,
  UniqueIdentifier,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import { SortableContext } from '@dnd-kit/sortable';

export function SortableArea(props: {
  items: (
    | UniqueIdentifier
    | {
        id: UniqueIdentifier;
      }
  )[];
  onDragEnd: (dragEndEvent: DragEndEvent) => void;
  children: ReactElement;
}) {
  const mouseSensor = useSensor(MouseSensor, {
    activationConstraint: {
      distance: 10,
    },
  });
  const sensors = useSensors(mouseSensor);
  const { items, onDragEnd, children } = props;

  return (
    <DndContext onDragEnd={onDragEnd} sensors={sensors}>
      <SortableContext items={items}>{children}</SortableContext>
    </DndContext>
  );
}
