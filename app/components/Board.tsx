'use client'

import { useAppDispatch } from '@/lib/hooks';
import { useCallback, useId } from 'react';
import { moveDocument, StatusEnum } from '@/lib/features/board/boardSlice';
import { DndContext, DragEndEvent } from '@dnd-kit/core';
import styles from './Board.module.css';
import Column from '@/app/components/Column';

export default function Board() {
  const id = useId();
  const dispatch = useAppDispatch();

  const handleDragEnd = useCallback((event: DragEndEvent) => {
    const { active, over } = event;
    if (!over){
      return;
    }
    const id = active.id as string;
    const status = over.id as StatusEnum;

    dispatch(moveDocument({ id, status }))
  }, [dispatch]);

  return (
    <div>
      <h1>Kanban Board</h1>
      <div className={styles.board}>
        <DndContext id={id} onDragEnd={handleDragEnd}>
          <Column id={StatusEnum.inProgress} title="InProgress" />
          <Column id={StatusEnum.underReview} title="UnderReview" />
          <Column id={StatusEnum.completed} title="Completed" />
        </DndContext>
      </div>
    </div>

  )
}
