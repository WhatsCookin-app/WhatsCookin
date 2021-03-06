/**
 * `components/index.js` exists simply as a 'central export' for our components.
 * This way, we can import all of our components from the same place, rather than
 * having to figure out which file they belong to!
 */
export {default as Navbar} from './navbar'
export {default as NavCopy} from './navbar copy'
export {default as Recipes} from './recipes'
export {default as MyRecipes} from './MyRecipes'

export {Login} from './auth-form'
export {default as Signup} from './CreateUser'
export {default as SingleRecipe} from './singleRecipe'
export {default as Channels} from './channels'
export {default as SingleChannel} from './single-channel'
export {default as VideoSession} from './VideoSession'
export {default as VideoSessionCopy} from './VideoSessionCopy'

export {default as SearchResults} from './searchResults'
export {default as EventsPage} from './EventPage'
export {default as SearchUsers} from './SearchUsers'
export {default as AddUser} from './AddUsers'
export {default as UserProfiles} from './UserProfiles'
export {default as BrowseChannels} from './BrowseChannels'
export {default as NotFound} from './notFound'
export {default as AddRecipe} from './addRecipe'
export {default as UserSettings} from './UserSettings'
export {default as UploadImage} from './UploadImage'
export {default as Footer} from './footer'
export {default as SingleEvent} from './singleEvent'
export {default as UpdateEvent} from './UpdateEvent'
export {default as ChannelsCarousel} from './channelsCarousel'
export {default as PrivateChannels} from './private-channels'
export {default as PublicChannels} from './public-channels'
export {default as LeaveChannel} from './leaveChannel'
export {default as VideoNavbar} from './videoNavbar'
export {default as MobileNavbar} from './mobileNavbar'
export {default as SelectChannel} from './SelectChannel'
