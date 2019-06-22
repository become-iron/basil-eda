import uuid from 'uuid/v4'


export class Track {
  constructor ({ id = uuid(), title = null }) {
    this.id = id
    this.title = title
  }
}
