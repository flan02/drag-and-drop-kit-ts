export interface Person {
  name: string
  age: number
  id: number
}

export interface IHandlerDragEnd {
  active: {
    id: number
  }
  over: {
    id: number
  }
}