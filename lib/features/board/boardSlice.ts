import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export enum StatusEnum {
  inProgress = "in-progress",
  underReview = "under-review",
  completed = "completed",
}

interface Document {
  id: string;
  title: string;
  status: StatusEnum;
}
const initialDocuments: Document[] = [
  { id: "1", title: "Сварить борщ", status: StatusEnum.inProgress },
  { id: "2", title: "Посадить дерево", status: StatusEnum.inProgress },
  { id: "3", title: "Изучить Next.js", status: StatusEnum.underReview },
];

const boardSlice = createSlice({
  name: 'board',
  initialState: {
    documents: initialDocuments,
  },
  reducers: {
    addDocument: (state, { payload }: PayloadAction<Document>) => {
      state.documents.push(payload);
    },
    moveDocument: (state, { payload }: PayloadAction<{ id: string, status: StatusEnum }>) => {
      const doc = state.documents.find((document) => document.id === payload.id);
      if (doc) {
        doc.status = payload.status;
      }
    }
  }
})

export const { addDocument, moveDocument } = boardSlice.actions

export default boardSlice.reducer
