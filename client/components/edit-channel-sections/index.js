/**
 * This `index.js` exists simply as a 'central export' for our edit channel components.
 * This way, we can import all of our components from the same place, rather than
 * having to figure out which file they belong to!
 */
export {default as EditDescription} from './description-channel'
export {default as EditImage} from './imageUrl-channel'
export {default as EditName} from './rename-channel'
