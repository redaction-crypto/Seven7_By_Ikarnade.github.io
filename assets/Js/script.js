'use strict';

/*** PRELOADER ***/

let loaded = document.querySelector('[data-preload]');

window.addEventListener('load', function() {
    loaded.classList.add('loaded');
    document.querySelector('body').classList.add('loaded');
});

const addEventOnElements = function (elements, eventType, callback) {
    for (let i = 0, len = elements.length; i < len; i++) {
        elements[i].addEventListener(eventType, callback);
    }
}

const navbar = document.querySelector("[data-navbar]");
const navTogglers = document.querySelectorAll("[data-nav-toggler]");
const overlay = document.querySelector("[data-overlay]");
let toggleNavbar = function () {
    navbar.classList.toggle("active");
    overlay.classList.toggle("active");
    document.body.classList.toggle("nav-active");
};

addEventOnElements(navTogglers, "click", toggleNavbar);



/**
 * HEADER & BACK TOP BTN
 */

const header = document.querySelector("[data-header]");
const backToTop = document.querySelector('[data-back-to-top]');
let lastScrollPos = 0;


const hideHeader = function () {
    const isScrollBottom = lastScrollPos < window.scrollY;
    if (isScrollBottom) {
        header.classList.add("hide");
    } else {
        header.classList.remove("hide");
    }
    lastScrollPos = window.scrollY;
}


window.addEventListener("scroll", function () {
    if (window.scrollY >= 50) {
        header.classList.add("active");
        hideHeader();
    }
    if(window.scrollY >= 200) {
        backToTop.classList.add("active");
    } else {
        header.classList.remove("active");
        backToTop.classList.remove("active");
    }
});

let comments = document.querySelectorAll("[data-comment]");

window.addEventListener('load', function() {
    for (let index = 0; index < comments.length; index++) {
        let comment = comments[index].textContent;
        
        if(comment.length > 130) {
            comments[index].textContent = comment.substring(0, 130) + "... ";
            let button = document.createElement("button");
            button.classList.add('read-all-message');
            button.textContent = "read all message";
            
            button.addEventListener("click", function() {
                document.body.classList.add("nav-active");
                document.body.classList.add("nav-active-pointer");

                let allMessage = document.createElement("div");
                allMessage.classList.add('all-message-parent');
                allMessage.classList.add('flex-center');
                allMessage.classList.add('flex-direction');
                allMessage.id = 'allMessage';

                let close = document.createElement("div");
                close.classList.add('close-message'); 

                let closeBTN = document.createElement("button");
                closeBTN.classList.add('close-btn-img');
                closeBTN.id = "close-comment";
                closeBTN.onclick = myfunction;
                close.appendChild(closeBTN);

                allMessage.appendChild(close);

                let content_message = document.createElement("div");
                content_message.classList.add('content-message'); 
                content_message.textContent = comment;
                allMessage.appendChild(content_message);

                document.querySelector('body').appendChild(allMessage);

            });
            comments[index].appendChild(button);
        }
    }
});

function myfunction() {
    let closeButton = document.getElementById('close-comment');
    if(closeButton != null) {
        document.body.classList.remove("nav-active");
        document.body.classList.remove("nav-active-pointer");
        document.querySelector('#allMessage').remove();
    }
}
