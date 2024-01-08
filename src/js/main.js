// Root
const root = document.querySelector(':root');

// Observers
const paddingNode = document.querySelector('input[id="padding"]');
paddingNode.addEventListener("change", (event) => {
    const val = event.target.value;
    root.style.setProperty('--page-padding', `${val}px`);
});

const pagesNode = document.getElementById('pages');
const pagesConfig = { attributes: true, childList: true };
const pagesCallback = function(mutationsList) {
    for(const mutation of mutationsList) {
        if (mutation.type == 'childList') {
            console.log('A child node has been added or removed.');
        }
        else if (mutation.type == 'attributes') {
            console.log('The ' + mutation.attributeName + ' attribute was modified.');
        }
    }
};
const pagesObserver = new MutationObserver(pagesCallback);
pagesObserver.observe(pagesNode, pagesConfig);


// Tools
function addImage() {
    const file = document.createElement('input');
    file.type = 'file';
    file.click();

    file.onchange = async (e) => {
        const file = e.target.files[0];
        const img = document.createElement("img");
        img.src = await toBase64(file);
        getLatestPage().appendChild(img);
    }
}

function addText() {
    const span = document.createElement('span');
    const response = window.prompt("Provide text:", "");
    span.innerHTML = response;
    span.classList.add('text-node');
    getLatestPage().appendChild(span);
}

// Utils
const toBase64 = (file) => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
});

function getLatestPage() {
    console.log(pagesNode)
    const latestPage = pagesNode.lastElementChild;
    pagesObserver.observe(latestPage, pagesConfig);
    return latestPage;
}
