// noinspection JSUnusedGlobalSymbols
import uuid from 'uuid/v4'


export class Symbol {
  constructor ({ id = uuid(), title = null, type }) {
    this.id = id
    this.type = type
    this.title = title
  }

  // get title () {
  //   return this._title
  // }
  //
  // set title (title) {
  //   this._title = title
  // }
}
