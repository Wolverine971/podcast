

export interface IComment {
  id?: string,
  text: string,
  parentId: string,
  parentTitle: string,
  comments: any[],
  likes: any[],
  modifiedDate: Date,
  createdDate: Date,
}
