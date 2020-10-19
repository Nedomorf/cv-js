window.onload = () => {
    let fields = document.getElementsByClassName('field');
    for (let i = 0; i < fields.length; i++) {
        if (fields[i].value !== '') {
            fields[i].nextElementSibling.classList.add('writing');
        }
    }
}

const photoInput = document.getElementById('uploadPhotoInput');
photoInput.addEventListener('change', (event) => {
    const image = document.getElementById('photo');
    image.src = URL.createObjectURL(event.target.files[0]);
})

const onInputFocus = (event) => {
    const label = event.currentTarget.labels[0];
    label.classList.add('writing');
    const inputId = event.currentTarget.id;
    if (inputId === 'phoneInput') {
        event.currentTarget.value = event.currentTarget.value.split(' - ').join('');
    }
}

const onInputBlur = (event) => {
    const value = event.target.value;
    if (value === '') {
        const label = event.currentTarget.labels[0];
        label.classList.remove('writing');
    }
    let inputValue = event.currentTarget.value;
    let exitValue = [];
    inputValue.split('').filter((el, index) => {
        if (index === 2 || index === 4) {
            exitValue.push(el);
            exitValue.push(' - ');
        } else {
            exitValue.push(el);
        }
    })
    if (event.currentTarget.value.length === 7) event.currentTarget.value = exitValue.join('');
}


const addInfoBlock = () => {
    const informationBlock = document.getElementById('informationBlock');
    const addInfoBlock = document.getElementById('addInfoBlock');
    addInfoBlock.classList.remove('fullPage');
    createInfoBlockItem(informationBlock, addInfoBlock);
}

const createInfoBlockItem = (informationBlock, addInfoBlock) => {
    const infoBlockItem = document.createElement('div');
    infoBlockItem.classList.add('infoBlockItem');
    infoBlockItem.id = `infoBlockItem${informationBlock.childElementCount}`;

    const deleteInfoBlockItem = document.createElement('button');
    deleteInfoBlockItem.innerHTML = "X"
    deleteInfoBlockItem.classList.add('deleteInfoBlockItem');

    infoBlockItem.appendChild(deleteInfoBlockItem);
    infoBlockItem.appendChild(createInfoBlockTitle(infoBlockItem));

    informationBlock.insertBefore(infoBlockItem, addInfoBlock);

    deleteInfoBlockItem.addEventListener('click', () => {
        debugger
        let id = deleteInfoBlockItem.offsetParent.id;
        for (let i = 0; i < informationBlock.childNodes.length; i++) {
            if (informationBlock.childNodes[i].id === id) {
                const item = informationBlock.childNodes[i];
                return informationBlock.removeChild(item);
            }
        }
    })

}


const createInfoBlockTitle = (infoBlockItem) => {
    const INPUT = document.createElement('input');
    INPUT.classList.add('field');
    INPUT.id = 'titleInput';
    INPUT.placeholder = 'Введите заголовок блока';

    const SUBMIT_BUTTON = document.createElement('button');
    SUBMIT_BUTTON.innerText = '⩗';

    const infoBlockTitle = document.createElement('div');
    infoBlockTitle.classList.add('baseInfoElement', 'titleInfo');

    infoBlockTitle.appendChild(INPUT);
    infoBlockTitle.appendChild(SUBMIT_BUTTON);

    const addInfoItem = document.createElement('button');
    addInfoItem.classList.add('addInfoItem');

    SUBMIT_BUTTON.addEventListener('click', () => {
        // let error = document.createElement('p');
        if (INPUT.value !== '') {
            infoBlockTitle.innerHTML = `<h2>${INPUT.value}</h2>`;
            INPUT.value = '';
            INPUT.classList.remove('handleError');
            // debugger
            // for (node in infoBlockItem.childNodes) {
            //     debugger
            //     if (infoBlockItem.childNodes[node] === '2') {
            //         debugger
            //         infoBlockItem.removeChild(error);
            //     }
            // }
            createInfoBlockValues(infoBlockItem, addInfoItem);
        } else {
            // error.classList.add('errorMsg');
            // error.classList.add('oneError');
            // error.innerText = 'Заполните поле';
            // infoBlockItem.appendChild(error);
            INPUT.classList.add('handleError');
        }
    })

    addInfoItem.onclick = () => {
        createInfoBlockValues(infoBlockItem, addInfoItem);
    }

    return infoBlockTitle;
}
const createInfoBlockValues = (infoBlockItem, addInfoItem) => {

    const infoItem = document.createElement('div');
    infoItem.classList.add('baseInfoElement', 'infoItem');

    const fieldInput = document.createElement('input');
    fieldInput.classList.add('field', 'handleError');
    fieldInput.id = 'fieldInput';
    fieldInput.placeholder = 'Введите название поля';

    const fieldInputValue = document.createElement('input');
    fieldInputValue.classList.add('field', 'handleError');
    fieldInputValue.id = 'fieldInputValue';
    fieldInputValue.placeholder = 'Введите значение поля';

    const createInfoItem = document.createElement('button');
    createInfoItem.innerText = '⩗';

    infoItem.appendChild(fieldInput);
    infoItem.appendChild(fieldInputValue);
    infoItem.appendChild(createInfoItem);

    if (infoBlockItem.lastChild === addInfoItem) infoBlockItem.removeChild(addInfoItem);
    infoBlockItem.appendChild(infoItem);

    const deleteInfoItem = document.createElement('button');
    deleteInfoItem.innerHTML = "X";
    deleteInfoItem.classList.add('deleteInfoItem');
    deleteInfoItem.addEventListener('click', () => {
        const id = deleteInfoItem.offsetParent.id;
        for (let i = 0; i < infoItem.offsetParent.childNodes.length; i++) {
            debugger
            if (infoItem.offsetParent.childNodes[i].id === id) {
                debugger
                const item = infoItem.offsetParent.childNodes[i];
                return infoItem.offsetParent.removeChild(item);
            }
        }
    })

    const submitInfoItem = () => {

        infoItem.innerHTML = `<div>${fieldInput.value}: ${fieldInputValue.value}</div>`;
        infoItem.classList.add('completedInfoItem');
        infoItem.appendChild(deleteInfoItem);
        infoItem.id = `infoItem${Number(infoBlockItem.childElementCount) - 2}`;

        let title = '';
        for (let node in infoBlockItem.childNodes) {
            if (node === '1') title = infoBlockItem.childNodes[node]
        }

        addInfoItem.innerText = `Добавить еще ${title.innerText.toLowerCase()}`;

        debugger
        // if (fieldInput.value !== '' && fieldInputValue.value !== '') {
        //     debugger
        //     infoBlockItem.appendChild(infoItem);
        //     infoBlockItem.appendChild(addInfoItem);
        // }
        infoBlockItem.appendChild(infoItem);
        infoBlockItem.appendChild(addInfoItem);

    }

    createInfoItem.addEventListener('click', submitInfoItem);

}


function exportHTML() {
    let header = "<html xmlns:o='urn:schemas-microsoft-com:office:office' " +
        "xmlns:w='urn:schemas-microsoft-com:office:word' " +
        "xmlns='http://www.w3.org/TR/REC-html40'>" +
        "<head><meta charset='utf-8'><title>Export HTML to Word Document with JavaScript</title></head><body>";
    let footer = "</body></html>";

    const DIV = document.createElement('div');
    DIV.innerText = 'hello';

    const image = document.getElementById('photo');

    DIV.appendChild(image);

    let sourceHTML = header + DIV.innerHTML + footer;

    let source = 'data:application/vnd.ms-word;charset=utf-8,' + encodeURIComponent(sourceHTML);
    let fileDownload = document.createElement("a");
    document.body.appendChild(fileDownload);
    fileDownload.href = source;
    fileDownload.download = 'document.doc';
    fileDownload.click();
    document.body.removeChild(fileDownload);
}
