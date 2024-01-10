
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
            const latestPage = getLatestPage();
            if (isOverflown(latestPage)) {
                const lastElementChild = latestPage.lastElementChild;
                const fragment = document.createDocumentFragment();
                fragment.appendChild(lastElementChild);
                addNewPage(fragment);
                alert('page overflow');
            }
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
const maxMsBetweenClicks = 300;
var clickTimeoutId = null;

function addImage() {
    const file = document.createElement('input');
    file.type = 'file';
    file.click();

    file.onchange = async (e) => {
        const file = e.target.files[0];
        const img = document.createElement("img");
        img.addEventListener('dblclick', deleteNode);
        img.addEventListener('click', changeFile);
        img.title = "Double click to delete...";
        img.src = await toBase64(file);
        img.classList.add('click-to-remove');
        getLatestPage().appendChild(img);
    }
}

function changeFile(element) {
    clearTimeout(clickTimeoutId);
    clickTimeoutId = setTimeout( () => {
        const file = document.createElement('input');
        file.type = 'file';
        file.click();

        file.onchange = async (e) => {
            const file = e.target.files[0];
            element.target ? element.target.src = await toBase64(file) : element.src = await toBase64(file);
        }
    }, maxMsBetweenClicks);
}

function addText() {
    const span = document.createElement('span');
    const response = window.prompt("Provide text:", "");
    span.innerHTML = response;
    span.addEventListener('dblclick', deleteNode);
    span.addEventListener('click', changeText);
    span.title = "Double click to delete...";
    span.classList.add('text-node');
    span.classList.add('click-to-remove');
    getLatestPage().appendChild(span);
}

function changeText(element) {
    clearTimeout(clickTimeoutId);
    clickTimeoutId = setTimeout( () => {
        const response = window.prompt("Provide text:", "");
        if (response) element.target ? element.target.innerHTML = response : element.innerHTML = response;
    }, maxMsBetweenClicks);
}

async function addProduct() {
    const duplicateTemplate = document.getElementById("product-row").cloneNode(true);
    duplicateTemplate.classList.add('product-row');
    getLatestPage().appendChild(duplicateTemplate);
}

function deleteNode(element) {
    clearTimeout(clickTimeoutId);
    element.target ? element.target.remove() : element.remove();
}

function addNewPage(element) {
    const newPage = pagesNode.lastElementChild.cloneNode(false);
    const id = newPage.id;
    let number = Number(id.replace(/^\D+/g, '')) + 1;
    const idWithoutNumber = id.replace(/[0-9]/g, '');
    newPage.setAttribute("id", `${idWithoutNumber}${number}`);
    const inner = document.createElement('div');
    inner.classList.add('page-inner');
    inner.appendChild(element);
    newPage.appendChild(inner);
    pagesNode.appendChild(newPage);
}

// Utils
const toBase64 = (file) => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
});

function getLatestPage() {
    const latestPage = pagesNode.lastElementChild.firstElementChild;
    pagesObserver.observe(latestPage, pagesConfig);
    return latestPage;
}

async function getTemplate(filepath) {
    const response = await fetch(filepath);
    const txt = response.text();
    const html =  new DOMParser().parseFromString(txt, 'text/html');
    return html.querySelector('head > template');
}

const isOverflown = ({ clientWidth, clientHeight, scrollWidth, scrollHeight }) => {
    return scrollHeight > clientHeight || scrollWidth > clientWidth;
}
