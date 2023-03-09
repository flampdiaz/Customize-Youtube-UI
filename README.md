# This extension is to customize Youtube UX/UI.

##### Learning purpose...

## What is this?

This is a Google Chrome / Brave Browser extension that allow to customize the UI and UX by drawing buttons on another part of the DOM and adding custom styles.

## What it can do?

- The "save" button is not hidden any more, now it is outside right beside the like and dislike button
- The "Watch later," and other Playlist are outside depending of the video title if keywords are configured properly
- The style of the playlists after pressing "save" button now it has a better layout, showing more playlist available and taking better advantage of the screen.

## How to install on Google Chrome or Brave Browser?

Clone the project -> Go to Settings -> Extensions -> enable "Developer Mode" -> click "Load unpacked" -> find the folder -> enable the extension -> click the reload button

## How to add more keywords to match the playlist to watch later?

### temporary solution:
Go to the custom.js file and modify the variable "checklist_tags".

### Template:

```js
const checklist_tags = [
    {"Name of your existing playlist, case sensitive": null },
    {"Name of your existing playlist, case sensitive": ["key words to match video title", "word 2", "word 3"] }
]
```

### Note: 
1. The playlist must exist in order to work. Create one if needed.

1. null -> this means that will draw the checklist button always

1. make an array and add all the key words for each playlist


## Example: 

``` js
const checklist_tags = [
    {"Watch later": null},
    {"Javascript": ["javascript", "React"]},
    {"Flutter": ["ASMR"]},
    {"Unity": ["Unity"]}, 
    {"Programming": null}
]
```