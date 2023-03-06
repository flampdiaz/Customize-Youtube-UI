function waitForElement(selector) {
    return new Promise(resolve => {
        const observer = new MutationObserver(mutations => {
            const element = document.querySelector(selector);
            if (element) {
                resolve(element);
                observer.disconnect();
            }
        });

        observer.observe(document.body, {
            childList: true,
            subtree: true
        });
    });
}

function moveSaveButton(saveButton){
    const likeButtonRenderer = document.getElementById('segmented-like-button');
    const menuRenderer = likeButtonRenderer.parentElement;
    const saveButtonShape = saveButton.parentElement;
    const saveButtonRenderer = saveButtonShape.parentElement;

    menuRenderer.insertBefore(saveButtonRenderer, likeButtonRenderer);
}

//Request to get watch later playlist
function clickSaveButton(saveButton){
    const saveButtonFeedback_querySelector = ".yt-spec-touch-feedback-shape__fill";
    const saveButtonFeedback = saveButton.querySelector(saveButtonFeedback_querySelector);
    const closeSaveListPopUpButton_querySelector = "#close-button > #button > yt-icon";

    saveButtonFeedback.click();

    waitForElement(closeSaveListPopUpButton_querySelector).then((closeSaveListPopUpButton) => {
        closeSaveListPopUpButton.click();
    });
}

function moveWatchLaterButton(saveButton){
    const watchLaterPrivateButtonText_querySelector = 'yt-formatted-string[aria-label="Watch later Private"]';

    waitForElement(watchLaterPrivateButtonText_querySelector).then((watchLaterPrivateButtonText) => {
        const likeButtonRenderer = document.getElementById('segmented-like-button');
        const menuRenderer = likeButtonRenderer.parentElement;
        const watchLaterPlaylistOptionButton = watchLaterPrivateButtonText.parentElement.parentElement.parentElement.parentElement.parentElement;
        const watchLaterLabel = watchLaterPrivateButtonText.parentElement.parentElement.parentElement;

        const saveButtonShape = saveButton.parentElement;
        const saveButtonRenderer = saveButtonShape.parentElement;

        watchLaterLabel.style.paddingLeft = "0px";

        menuRenderer.insertBefore(watchLaterPlaylistOptionButton, saveButtonRenderer);
    });
}

window.addEventListener('load', () => {
    console.log("RUNNING custom Youtube ----------------------------------------------------------");
  
    const saveButton_querySelector = 'button[aria-label="Save to playlist"]';

    waitForElement(saveButton_querySelector).then((saveButton) => {
        moveSaveButton(saveButton);
        clickSaveButton(saveButton);
        moveWatchLaterButton(saveButton);
    });
});
  
console.log("CUSTOM YOUTUBE JAVASCRIPT LOADED");
  
