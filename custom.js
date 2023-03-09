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

function drawSaveButton(saveButton){
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

function drawPlayListButtons(saveButton){
    const checklist_tags = [{"Watch later": null},{"Javascript": ["javascript", "React"]},{"Flutter": ["ASMR"]},{"Unity": ["Unity"]}, {"Programming": null}]
    const likeButtonRenderer = document.getElementById('segmented-like-button');
    const menuRenderer = likeButtonRenderer.parentElement;
    const saveButtonRenderer = saveButton.parentElement.parentElement;
    const videoTitle = document.querySelector("#title > h1 > yt-formatted-string").innerHTML;

    let playlistQuerySelector = 'yt-formatted-string[aria-label="Watch later Private"]';
    
    waitForElement(playlistQuerySelector).then((watchLaterPrivateButtonText) => {
        let checkListPrivateButtonText = watchLaterPrivateButtonText;
        for (checklist of checklist_tags) {
            const keyWords = Object.values(checklist);
            const playlistName = Object.keys(checklist)[0];
            playlistQuerySelector = `yt-formatted-string[aria-label="${playlistName} Private"]`;
            if (checkListPrivateButtonText == null) {
                checkListPrivateButtonText = document.querySelector(playlistQuerySelector);
            }
            
            for (keyWord of keyWords){
                if (keyWord == null){
                    drawCheckListButton(checkListPrivateButtonText, saveButtonRenderer, menuRenderer);
                    break;
                }
                if (keyWord.some((word) => videoTitle.toLowerCase().includes(word.toLowerCase()))){
                    drawCheckListButton(checkListPrivateButtonText, saveButtonRenderer, menuRenderer);
                    break;
                }
            }

            checkListPrivateButtonText = null;
        }
    });
}

function drawCheckListButton(checkListPrivateButtonText, saveButtonRenderer, menuRenderer){
    const checklistPlaylistOptionButton = checkListPrivateButtonText.parentElement.parentElement.parentElement.parentElement.parentElement;
    const checklistLabel = checkListPrivateButtonText.parentElement.parentElement.parentElement;

    checklistLabel.style.paddingLeft = "0px";

    menuRenderer.insertBefore(checklistPlaylistOptionButton, saveButtonRenderer);
}

window.addEventListener('load', () => {
    const saveButton_querySelector = 'button[aria-label="Save to playlist"]';

    waitForElement(saveButton_querySelector).then((saveButton) => {
        drawSaveButton(saveButton);
        clickSaveButton(saveButton);
        drawPlayListButtons(saveButton);
    });
});