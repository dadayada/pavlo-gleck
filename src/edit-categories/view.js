import React from 'react';
import { useStore } from 'effector-react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { ListItem } from 'baseui/list';
import { Button } from 'baseui/button';
import { DeleteAlt } from 'baseui/icon';
import { Input } from 'baseui/input';
import { Block } from 'baseui/block';
import { Grab } from 'baseui/icon';
import { Display4 } from 'baseui/typography';
import { $categories } from '../core/state';
import { categoriesReordered, categoryNameChanged } from '../core';
import { deleteCategoryClicked } from '.';

export function EditCategories() {
  const categories = useStore($categories);
  const list = categories.map((item, index) => (
    <Draggable draggableId={String(item.id)} index={index} key={item.id}>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          style={{
            border: `${snapshot.isDragging ? '2px solid black' : 'none'}`,
            ...provided.draggableProps.style,
          }}
        >
          <ListItem>
            <Grab size='scale1200' />
            <Input
              value={item.name}
              onChange={e =>
                categoryNameChanged({ id: item.id, value: e.target.value })
              }
            />
            <Button
              kind='tertiary'
              onClick={() => deleteCategoryClicked({ id: item.id })}
            >
              <DeleteAlt size='scale800' />
            </Button>
          </ListItem>
        </div>
      )}
    </Draggable>
  ));
  return (
    <DragDropContext
      onDragEnd={result =>
        categoriesReordered({
          source: result.source.index,
          dest: result.destination.index,
        })
      }
    >
      <Block margin='scale500'>
        <Display4>Edit categories</Display4>
      </Block>
      <Droppable droppableId='pohuy'>
        {provided => (
          <div ref={provided.innerRef} {...provided.droppableProps}>
            {list}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
}
