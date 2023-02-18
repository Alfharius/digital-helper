
'use strict';
if (!window.jQuery) { //костыль, извЕните
    fetch('https://code.jquery.com/jquery-3.6.0.min.js')
        .then(res => res.clone().text())
        .then(text => {
            eval(text);
        })
}

const createModal = (title) => {
    const modalWrapper = document.createElement('div');
    modalWrapper.className = 'base-alert base-alert--success';
    modalWrapper.style.marginBottom = '0px';
    const modal = document.createElement('div');
    modal.className = 'base-alert__content';
    const description = document.createElement('p');
    description.innerText = title;
    modalWrapper.style.padding = '0 5px';

    modal.append(description)
    modalWrapper.append(modal)
    modalWrapper.addEventListener('mouseenter', (e) => {
        modalWrapper.addEventListener('mouseleave', (e) => {
            removeModal(modalWrapper);
        });
    });
    return modalWrapper
}

const removeModal = (modal) => {
    modal.remove();
}

const buttonInModal = (x, y) => {
    const button = document.createElement('button');
    button.type = 'button';
    const style = `width: 25px; height: 25px; padding: 0px; position: absolute; left: ${x}px; top: ${y}px; z-index: 1000;`;
    button.style = style;
    button.style.backgroundColor = '#fff';
    button.style.border = '1px solid #acb5bd';
    button.innerHTML = '<svg fill="none" xmlns="http://www.w3.org/2000/svg" style="color: var(--color-primary);" viewBox="0 0 24 24" focusable="false"><path d="M12 4a1 1 0 00-1 1v6H5a1 1 0 100 2h6v6a1 1 0 102 0v-6h6a1 1 0 100-2h-6V5a1 1 0 00-1-1z" fill="currentColor"></path></svg>'
    return button;
}

const initiateModal = (title, x, y) => {
    const button = buttonInModal(x, y);
    document.getElementById('app').append(button);
    button.addEventListener('click', () => {
        button.style.width = 'auto';
        button.style.height = 'auto';
        button.innerHTML = '';
        button.append(createModal(title));
        button.disabled = true;
        button.addEventListener('mouseenter', (e) => {
            button.addEventListener('mouseleave', (e) => {
                removeModal(button);
            });
        });
    });

}

const addEvent = (baseInput, baseTextArea, baseMultiSelect, baseDatePicker) => {
    baseInput.forEach(input => {
        input.addEventListener('click', (e) => {
            initiateModal(input.children[1].title, e.pageX, e.pageY)
        })
    });
    baseTextArea.forEach(textArea => {
        textArea.addEventListener('click', (e) => {
            initiateModal(textArea.children[1].title, e.pageX, e.pageY)
        })
    })
    baseMultiSelect.forEach(multiSelect => {
        multiSelect.addEventListener('click', (e) => {
            console.log(multiSelect)
            initiateModal(multiSelect.children[1].title, e.pageX, e.pageY)
        })
    })
    baseDatePicker.forEach(datePicker => {
        datePicker.addEventListener('click', (e) => {
            initiateModal(datePicker.children[1].title, e.pageX, e.pageY)
        })
    })
}

const init = () => {
    const baseInput = document.querySelectorAll('.base-input');
    const baseTextArea = document.querySelectorAll('.base-textarea');
    const baseMultiSelect = document.querySelectorAll('.base-select');
    const baseDatePicker = document.querySelectorAll('.base-datepicker');
    addEvent(baseInput, baseTextArea, baseMultiSelect, baseDatePicker)
}

setTimeout(function () {
    init()
}, 3000)