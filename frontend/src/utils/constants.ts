export type Ttodo = {
  id: number
  description: string
  title: string
  completed: boolean
}

export type TtodosViewMode = 'all' | 'active' | 'completed'

export const serverPort = 8080

export const maxTitleLength = 253
export const maxDescriptionLength = 1998