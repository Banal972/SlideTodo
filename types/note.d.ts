export type TNoteId = { noteId: number }

export type PostFormData = {
  title: string
  content: string
  linkUrl: string
}

export interface IPostNote {
  todoId: number
  title: string
  content: string
  linkUrl: string
}

export interface IUpdateNote {
  todoId: number
  title: string
  content: string
  linkUrl: string
  noteId: number
}

export type NoteSlug = {
  slug: string
}

export interface noteType {
  title: string
  content: string
  todoTitle: string
  todoCreateDate: string
  createDate: string
  id: string
}

export interface IuseSumbit extends NoteSlug {
  editor: EditorBridge
}

export interface INoteDetailModal {
  isModal: boolean
}

interface ILinkModal {
  control: Control<FormData, any>
  isModal: boolean
  setIsModal: React.Dispatch<React.SetStateAction<boolean>>
}

export interface INoteDetail {
  todo: TodoDetail
  linkUrl: string
  content: string
  updatedAt: string
  createdAt: string
  title: string
  id: number
  goal: GoalDetail
  userId: number
  teamId: string
}

interface TodoDetail {
  done: boolean
  fileUrl: string
  linkUrl: string
  title: string
  id: number
}

interface GoalDetail {
  title: string
  id: number
}

interface IuseGetNoteListType {
  goalId?: number
  cursor?: number
  size?: number
}

export interface IuseGetNoteListReturn {
  nextCursor: number
  totalCount: number
  notes: NoteList[]
}

export interface NoteList {
  todo: Pick<TodoDetail, "done" | "title" | "id">
  updatedAt: string
  createdAt: string
  title: string
  id: number
  goal: GoalDetail
  userId: number
  teamId: string
}
