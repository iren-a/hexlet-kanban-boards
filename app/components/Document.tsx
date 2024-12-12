import { useDraggable } from "@dnd-kit/core";
import { CSS } from '@dnd-kit/utilities';
import styles  from './Document.module.css';

export default function Document({ document }) {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: document.id,
  });

  const style = {
    transform: CSS.Translate.toString(transform),
  }

  return (
    <div
      style={style}
      className={styles.document}
      ref={setNodeRef}
      {...listeners}
      {...attributes}
    >
      {document.title}
    </div>
  );
}
