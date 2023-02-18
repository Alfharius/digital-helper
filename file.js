// ==UserScript==
// @name         New Userscript
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://grants.myrosmol.ru/*
// @icon         data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==
// @grant        none
// ==/UserScript==

(function () {
    'use strict';


    const createModal = (title) => {
        const modalWrapper = document.createElement('div');
        modalWrapper.className = 'base-alert base-alert--success';
        const modal = document.createElement('div');
        modal.className = 'base-alert__content';
        const description = document.createElement('p');
        description.innerText = title;

        modal.append(description)
        modalWrapper.append(modal)
        return modalWrapper
    }

    const removeModal = () => {

    }

    const buttonInModal = (x, y) => {
        const button = document.createElement('button');
        button.type = 'button';
        const style = `padding: 5px; position: absolute; left: ${x}px; top: ${y}px; z-index: 1000;`;
        button.style = style;
        button.textContent = '+'
        return button;
    }

    const initiateModal = (title, x, y) => {
        const button = buttonInModal(x, y);
        document.getElementById('app').append(button);
        button.addEventListener('click', () => {
            button.append(createModal(title));
        })
    }

    const addEvent = (baseInput, baseTextArea, baseMultiSelect, baseDatePicker) => {
        baseInput.forEach(input => {
            input.addEventListener('click', (event) => {
                initiateModal(input.children[1].title, event.pageX, event.pageY)
            })
        });
        baseTextArea.forEach(textArea => {
            textArea.addEventListener('click', (event) => {
                initiateModal(textArea.children[1].title, event.pageX, event.pageY)
            })
        })
        baseMultiSelect.forEach(multiSelect => {
            multiSelect.addEventListener('click', (event) => {
                console.log(multiSelect)
                initiateModal(multiSelect.children[1].title, event.pageX, event.pageY)
            })
        })
        baseDatePicker.forEach(datePicker => {
            datePicker.addEventListener('click', (event) => {
                initiateModal(datePicker.children[1].title, event.pageX, event.pageY)
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
})();