import uuid from 'uuid/v4'


export class Project {
  constructor ({ id = uuid(), title }) {
    this.id = id
    this.title = title
  }

}
