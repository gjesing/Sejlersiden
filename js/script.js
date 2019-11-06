//
//Variables
//
const header = document.querySelector('body > header')
const nav = header.querySelector('nav')
const navUl = nav.querySelector('ul')
const navUlInnerHTML = navUl.innerHTML
const navLis = navUl.children
const navLisWithHoverEffects = navUl.querySelectorAll('li.hoverable, a.hoverable')
const menuBtn = document.querySelector('#menu-btn')
const toTopBtn = document.querySelector('#to-top-btn')

//
//On load
//

/*
//Divides the list items in the nav into two seperate lists when window width is 1200px or less and puts them them into one list if it is more
let numberOfUls = header.querySelectorAll('nav > ul').length
if (window.innerWidth <= 1200 && numberOfUls == 1) {
    navUl.insertAdjacentElement('afterend', document.createElement('ul'))
    const list2 = navUl.nextSibling
    for (let i = 5; i < navLis.length;) {
        list2.appendChild(navLis[i])
    }
} else if (window.innerWidth > 1200 && numberOfUls == 2) {
    const navUl2 = navUl.nextSibling
    navUl.insertAdjacentHTML('beforeend', navUl2.innerHTML)
    navUl2.parentElement.removeChild(navUl2)
}
*/

//Adds class "sticky" to header if page y offset is higher than 0 or the width of the window is 550px or less
if (window.pageYOffset > 0 || window.innerWidth <= 550) {
    header.classList.add('sticky')
}

//Removes class "hide" from the toTopBtn if pageYOffset is more than 90px
if (window.pageYOffset > 90 && toTopBtn.classList.contains('hide')) {
    toTopBtn.classList.remove('hide')
}

//Removes hovereffects from the links in the nav if the width of the window is 1200px or less
if (window.innerWidth <= 1200) {
    navUl.querySelectorAll('li.hoverable, a.hoverable').forEach(element => {
        element.classList.remove('hoverable')
    })
}

//
//Event listeners
//

//On scroll: adds class "sticky" to header if page y offset is higher than 0 and remove it if it is 0 and the width of the window is more than 550px
window.addEventListener('scroll', function () {
    if (window.pageYOffset > 0 && !header.classList.contains('sticky')) {
        header.classList.add('sticky')
    } else if (window.pageYOffset == 0 && window.innerWidth > 550) {
        header.classList.remove('sticky')
    }
    //Removes class "hide" from the toTopBtn if pageYOffset is more than 90px and adds it if it is less
    if (window.pageYOffset > 90 && toTopBtn.classList.contains('hide')) {
        toTopBtn.classList.remove('hide')
    } else if (window.pageYOffset <= 90 && !toTopBtn.classList.contains('hide')) {
        toTopBtn.classList.add('hide')
    }
})

//On click: scrolls down to the next section of the page when the scroll down button in the first section is clicked
document.querySelector('main section:first-child > button').addEventListener('click', function () {
    window.scroll({ top: document.querySelector('main section:first-child').clientHeight - header.clientHeight, behavior: 'smooth' })
})

//On click: scrolls to the top of the page when the toTopBtn is clicked
toTopBtn.addEventListener('click', function () {
    window.scroll({ top: 0, behavior: 'smooth' })
})

//On click: menu icon changes to close icon and the nav is displayed when the menu button is clicked - opposite when the close button is clicked. If the left arrow is clicked the main menu is shown instead of the submenu
menuBtn.addEventListener('click', function (e) {
    if (e.srcElement.classList.contains('fa-bars')) {
        setTimeout(function () {
            e.srcElement.classList.remove('fa-bars')
            e.srcElement.classList.add('fa-times')
            e.srcElement.parentElement.classList.add('close-btn')
            if (e.srcElement.parentElement.classList.contains('hide-nav')) {
                e.srcElement.parentElement.classList.remove('hide-nav')
            }
            if (nav.classList.contains('hide')) {
                nav.classList.remove('hide')
            }
            nav.classList.add('show')
            header.appendChild(document.createElement('div')).classList.add('overlay')
        }, 1);
    } else if (e.srcElement.classList.contains('fa-times')) {
        if (menuBtn.children[0].classList.contains('show')) {
            navUl.innerHTML = navUlInnerHTML
            navUl.querySelectorAll('li.hoverable, a.hoverable').forEach(element => {
                element.classList.remove('hoverable')
            })
            menuBtn.children[0].classList.remove('show')
        }
        e.srcElement.classList.remove('fa-times')
        e.srcElement.classList.add('fa-bars')
        e.srcElement.parentElement.classList.add('hide-nav')
        nav.classList.add('hide')
        header.removeChild(header.querySelector('div.overlay'))
        if (window.innerWidth <= 750) {
            e.srcElement.parentElement.classList.remove('close-btn')
            nav.classList.remove('show')
        } else {
            setTimeout(function () {
                e.srcElement.parentElement.classList.remove('close-btn')
                nav.classList.remove('show')
            }, 300)
        }
    } else if (e.srcElement.classList.contains('fa-arrow-left')) {
        navUl.innerHTML = navUlInnerHTML
        navUl.querySelectorAll('li.hoverable, a.hoverable').forEach(element => {
            element.classList.remove('hoverable')
        })
        menuBtn.children[0].classList.remove('show')
    }
})

//On click: hides nav when there are clicked somewhere else
window.addEventListener('click', function (e) {
    if (nav.classList.contains('show') && e.srcElement.classList.contains('overlay')) {
        if (menuBtn.children[0].classList.contains('show')) {
            navUl.innerHTML = navUlInnerHTML
            navUl.querySelectorAll('li.hoverable, a.hoverable').forEach(element => {
                element.classList.remove('hoverable')
            })
            menuBtn.children[0].classList.remove('show')
        }
        menuBtn.children[1].classList.remove('fa-times')
        menuBtn.children[1].classList.add('fa-bars')
        menuBtn.classList.add('hide-nav')
        nav.classList.add('hide')
        header.removeChild(header.querySelector('div.overlay'))
        setTimeout(function () {
            menuBtn.classList.remove('close-btn')
            nav.classList.remove('show')
        }, 300)
    }
})

//On click: the submenu is shown when a menu item with an arrow is clicked (1200px or less)
navUl.addEventListener('click', function (e) {
    if (window.innerWidth <= 1200 && (e.srcElement.tagName == 'I' || e.srcElement.children.length == 1)) {
        menuBtn.children[0].classList.add('show')
        if (e.srcElement.tagName == 'I') {
            const subMenu = e.srcElement.parentElement.nextSibling.nextSibling.innerHTML
            navUl.innerHTML = subMenu
            navUl.insertAdjacentElement('afterbegin', document.createElement('li')).appendChild(document.createTextNode(e.srcElement.parentElement.innerText)).parentElement.classList.add('heading')
        } else if (e.srcElement.children.length == 1) {
            const subMenu = e.srcElement.nextSibling.nextSibling.innerHTML
            navUl.innerHTML = subMenu
            navUl.insertAdjacentElement('afterbegin', document.createElement('li')).appendChild(document.createTextNode(e.srcElement.innerText)).parentElement.classList.add('heading')
        }
    }
})

//On resize: removes hovereffects from the links in the nav when the width of the window is 1200px or less and adds them if it is more
window.addEventListener('resize', function () {
    if (window.innerWidth <= 1200 && navLisWithHoverEffects[0].classList.contains('hoverable')) {
        navLisWithHoverEffects.forEach(element => {
            element.classList.remove('hoverable')
        })
    } else if (window.innerWidth > 1200 && !navLisWithHoverEffects[0].classList.contains('hoverable')) {
        navLisWithHoverEffects.forEach(element => {
            element.classList.add('hoverable')
        })
        if (menuBtn.children[0].classList.contains('show')) {
            menuBtn.children[0].classList.remove('show')
            navUl.innerHTML = navUlInnerHTML
        }
    }
    //Adds class "sticky" to header if the width of the window is 550px or less and removes it if it is more
    if (window.innerWidth <= 550 && !header.classList.contains('sticky')) {
        header.classList.add('sticky')
    } else if (window.innerWidth > 550 && window.pageYOffset == 0 && header.classList.contains('sticky')) {
        header.classList.remove('sticky')
    }
})

/*
//On resize: divides the list items in the nav into two seperate lists when window width is 1200px or less and puts them them into one list if it is more
window.addEventListener('resize', function () {
    let numberOfUls = header.querySelectorAll('nav > ul').length
    if (window.innerWidth <= 1200 && numberOfUls == 1) {
        navUl.insertAdjacentElement('afterend', document.createElement('ul'))
        const list2 = navUl.nextSibling
        for (let i = 5; i < navLis.length;) {
            list2.appendChild(navLis[i])
        }
        // for (let i = 0; i < navLis.length; i++) {
        //     const element = navLis[i]
        //     if (i % 2 == 1) {
        //         element.classList.add('list2')
        //     }
        // }
        // for (let i = 0; i < navLis.length; i++) {
        //     const element = navLis[i]
        //     if (element.classList.contains('list2')) {
        //         list2.appendChild(element)
        //         element.classList.remove('list2')
        //         if (element.getAttribute('class') == '') {
        //             element.removeAttribute('class')
        //         }
        //     }
        // }
    } else if (window.innerWidth > 1200 && numberOfUls == 2) {
        const navUl2 = navUl.nextSibling
        navUl.insertAdjacentHTML('beforeend', navUl2.innerHTML)
        navUl2.parentElement.removeChild(navUl2)
        // const navLisLength = navLis.length
        // const list2 = navUl.nextSibling
        // const list2Children = list2.children
        // for (let i = 0; i < (navLisLength > list2Children.length ? navLisLength : navLisLength - 1); i += 2) {
        //     const element = navLis[i]
        //     element.insertAdjacentHTML('afterend', list2Children[0].outerHTML)
        //     console.log(navLisLength)
        // }
    }
})
*/