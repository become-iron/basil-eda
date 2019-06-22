import uuid from 'uuid/v4'


export class ComponentsLibrary {
  constructor ({ id = uuid(), title }) {
    this.id = id
    this.title = title
  }
}
