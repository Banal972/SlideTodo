export type PostFormData = {
  title: string
  content: string
  linkUrl: string
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
