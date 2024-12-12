import { useDroppable } from "@dnd-kit/core";
import styles from './Column.module.css';
import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import { useCallback, useMemo, useState } from 'react';
import Document from '@/app/components/Document';
import { addDocument } from '@/lib/features/board/boardSlice';
import { GoPlusCircle } from 'react-icons/go';

export default function Column({ id, title }) {
  const { setNodeRef } = useDroppable({ id });
  const dispatch = useAppDispatch();
  const documents = useAppSelector(state => state.board.documents);
  const columnDocuments = useMemo(() => (
    documents.filter((doc) => doc.status === id)
  ), [documents]);

  const [newDocumentTitle, setNewDocumentTitle] = useState('');

  const onAddDocument = useCallback((event) => {
    event.preventDefault();

    dispatch(addDocument({
      id: `${documents.length + 1}`,
      title: newDocumentTitle,
      status: id,
    }));

    setNewDocumentTitle('');
  }, [dispatch, documents, newDocumentTitle, setNewDocumentTitle]);

  return (
    <div
      className={styles.column}
      ref={setNodeRef}
    >
      <h3>{title}</h3>
      <div className={styles.documents}>
        {columnDocuments.map((doc) => (
          <Document key={doc.id} document={doc}/>
        ))}
      </div>
      <form id={`addDocument-${id}`} onSubmit={onAddDocument}>
        <div className={styles.addInput}>
          <input type="text" placeholder="Input title..." value={newDocumentTitle}
                 onChange={(event) => setNewDocumentTitle(event.target.value)}/>
          <button className={styles.addButton}><GoPlusCircle/></button>
        </div>
      </form>
    </div>
  );
}
