/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/js/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/js/Notebook.js":
/*!****************************!*\
  !*** ./src/js/Notebook.js ***!
  \****************************/
/*! exports provided: Notebook */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"Notebook\", function() { return Notebook; });\n\r\nclass Notebook {\r\n\r\n    constructor() {\r\n        this.noteText = null;\r\n        this.notesSection = null;\r\n        this.notesArray = [];\r\n        this.pageCounter = 0;\r\n        this.arrowLeft = null;\r\n        this.arrowRight = null;\r\n\r\n\r\n        this.UISelectors = {\r\n            noteText: \"[data-form]\",\r\n            notesSection: \"[data-notes]\",\r\n            notesList: \"[data-notes-list]\",\r\n            pageCounter: \"[data-counter]\",\r\n            arrowLeft: \"[data-notes-left-btn]\",\r\n            arrowRight: \"[data-notes-right-btn]\"   \r\n        }\r\n    }\r\n\r\n\r\n\r\n    initializeNotebook() {   \r\n        this.noteText = document.querySelector(this.UISelectors.noteText);\r\n        this.notesSection = document.querySelector(this.UISelectors.notesSection);\r\n        this.notesList = document.querySelector(this.UISelectors.notesList);\r\n        this.pageCounter = document.querySelector(this.UISelectors.pageCounter);\r\n        this.arrowLeft = document.querySelector(this.UISelectors.arrowLeft);\r\n        this.arrowRight = document.querySelector(this.UISelectors.arrowRight); \r\n\r\n        this.loadNote();\r\n        this.addListeners();\r\n        \r\n    };\r\n\r\n\r\n    addListeners() {\r\n        this.notesArray.forEach(item => {\r\n            item.querySelector(\"[data-delete-option]\").addEventListener(\"click\", () => this.removeNote(event));\r\n            item.querySelector(\"[data-delete-option]\").addEventListener(\"keypress\", () => this.removeNote(event));\r\n            item.querySelector(\"[data-edit-option]\").addEventListener(\"click\", () => this.editNote(event));\r\n            item.querySelector(\"[data-edit-option]\").addEventListener(\"keypress\", () => this.editNote(event));\r\n        });\r\n\r\n        this.noteText.addEventListener(\"blur\", () => this.saveNote());\r\n        this.arrowLeft.addEventListener(\"click\", () => this.moveLeft());\r\n        this.arrowRight.addEventListener(\"click\", () => this.moveRight())\r\n    }\r\n\r\n\r\n    isEmpty () {\r\n        String(this.noteText.value) !== \"\" \r\n            ? false\r\n            : true\r\n    };\r\n\r\n    myStorage() {\r\n        let myArray;\r\n        if (localStorage.getItem(\"notes\") !== null) {\r\n            return (myArray = JSON.parse(localStorage.getItem(\"notes\")));\r\n        } else {\r\n            return myArray = [];\r\n        }\r\n    };\r\n\r\n    setListItems () {\r\n        this.notesArray = document.querySelectorAll(\"[data-notes-items]\");\r\n    }\r\n\r\n    clearList() {\r\n        this.notesArray = document.querySelectorAll(\"data-notes-items\");\r\n        this.notesArray.forEach(item => {\r\n            item.remove();\r\n        })\r\n    }\r\n\r\n    loadNote () {\r\n        const notes = this.myStorage();\r\n\r\n        if (notes.length > 0) {\r\n            notes.forEach((note, index) => {\r\n                let page = index + 1;\r\n                let itemsList = `\r\n                    <li class=\"notes__item ${index == 0 ? \"notes__item--active\" : \"\"}\" data-notes-items>\r\n                        <div class=\"options-panel\">\r\n                            <button class=\"options-panel__btn\" data-delete-option note=\"${note.id}\">\r\n                                <img src=\"./assets/public/icons/icon-delete.svg\" alt=\"Delete button.\" class=\"option-panel__icon\"\r\n                                note=\"${note.id}\"/>\r\n                            </button>\r\n                            <button class=\"options-panel__btn\" data-edit-option note=\"${note.id}\">\r\n                            <img src=\"./assets/public/icons/icon-edit.svg\" alt=\"Edit button.\" class=\"option-panel__icon\"\r\n                            note=\"${note.id}\"/>\r\n                            </button>\r\n                        </div>\r\n                        <p class=\"notes__content\" data-notes-content>\r\n                        ${note.text}</p>\r\n                        <footer class=\"notes-footer\">\r\n                            <p class=\"notes-footer__date\">\r\n                        ${note.saveAt}\r\n                            </p>\r\n                            <p class=\"notes-footer__page-number\">\r\n                            ${page++}\r\n                            </p>\r\n                        </footer>\r\n                    </li>\r\n                \r\n                ` ;\r\n                this.notesList.insertAdjacentHTML(\"beforeend\", itemsList);\r\n            });\r\n\r\n            this.setListItems();\r\n            this.addListeners();\r\n            this.pageCounter.innerHTML = `number of notes: ${notes.length}`;\r\n            this.notesSection.classList.add(\"notes--show\");\r\n        } else {\r\n            this.notesSection.classList.remove(\"notes--show\");\r\n        }\r\n    };\r\n\r\n    saveNote() {\r\n        const notes = this.myStorage();\r\n\r\n        if (!this.isEmpty()) {\r\n            if (this.noteText.attributes.note.value === \"\") {\r\n                let note = {\r\n                    id: Date.now(),\r\n                    text: this.noteText.value,\r\n                    saveAt: new Date().toString().slice(0, 24)\r\n                };\r\n\r\n            notes.push(note);\r\n            localStorage.setItem(\"notes\", JSON.stringify(notes));\r\n            this.clearList();\r\n            this.loadNote();\r\n\r\n            } else {\r\n            const noteId = this.noteText.attributes.note.value;\r\n            const theNoteIndex = notes.findIndex(note => note.id == noteId);\r\n\r\n            notes[theNoteIndex].text = this.noteText.value;\r\n            notes[theNoteIndex].saveAt = new Date().toString().slice(0, 24);\r\n\r\n            this.noteText.attributes.note.value = \"\";\r\n            localStorage.setItem(\"notes\", JSON.stringify(notes));\r\n            this.clearList();\r\n            this.loadNote();\r\n            } \r\n\r\n            this.noteText.value = \"\";\r\n\r\n        }\r\n\r\n    }\r\n\r\n    editNote (event) {\r\n        event.preventDefault();\r\n\r\n        if (event.type === \"click\" || (event.type === \"keypress\" && event.key === \"Enter\")) {\r\n            const notes = this.myStorage();\r\n            const noteId = event.target.attributes.note.value;\r\n            const theNoteIndex = notes.findIndex(note => note.id == noteId);\r\n\r\n            this.noteText.value = notes[theNoteIndex].text;\r\n            this.noteText.attributes.note.value = noteId;\r\n\r\n            localStorage.setItem(\"notes\", JSON.stringify(notes));\r\n            this.noteText.focus({preventScroll: false});\r\n        }\r\n    }\r\n\r\n    removeNote (event) {\r\n        event.preventDefault();\r\n\r\n        if (event.type === \"click\" || (event.type === \"keypress\" && event.key === \"Enter\")) {\r\n            const notes = this.myStorage();\r\n            const noteId = event.target.attributes.note.value;\r\n            const theNoteIndex = notes.findIndex(note => note.id == noteId);\r\n            const itemsList = event.composedPath()[3];\r\n\r\n            this.moveRight();\r\n            notes.splice(theNoteIndex, 1);\r\n            itemsList.remove();\r\n\r\n            localStorage.setItem(\"notes\", JSON.stringify(notes));\r\n            this.setListItems();\r\n            this.pageCounter.innerHTML = `notes ${notes.length}`;\r\n            if (notes.length === 0) {\r\n                this.loadNote();\r\n            }\r\n        }\r\n    };\r\n\r\n    moveLeft() {\r\n        let newIndex = null;\r\n        this.notesArray.forEach((slide, index) => {\r\n            if (slide.classList.contains(\"notes__item--active\") && newIndex !== index) {\r\n                slide.classList.remove(\"notes__item--active\");\r\n                if (index === 0) {\r\n                    this.notesArray[this.notesArray.length - 1].classList.add(\"notes__item--active\");\r\n                    newIndex = this.notesArray.length - 1;\r\n                } else {\r\n                    this.notesArray[index - 1].classList.add(\"notes__item--active\");\r\n                    newIndex = index - 1;\r\n                }\r\n            }\r\n        });\r\n    };\r\n\r\n    moveRight() {\r\n        let newIndex = null;\r\n        this.notesArray.forEach((slide, index) => {\r\n            if (slide.classList.contains(\"notes__item--active\") && newIndex !== index) {\r\n                slide.classList.remove(\"notes__item-active\");\r\n                if (index === this.notesArray.length - 1) {\r\n                    this.notesArray[0].classList.add(\"notes__item--active\");\r\n                    newIndex = 0;\r\n                } else {\r\n                    this.notesArray[index + 1].classList.add(\"notes__item--active\");\r\n                    newIndex = index + 1;\r\n                }\r\n            }\r\n        });\r\n    };\r\n\r\n}\r\n\n\n//# sourceURL=webpack:///./src/js/Notebook.js?");

/***/ }),

/***/ "./src/js/Slider.js":
/*!**************************!*\
  !*** ./src/js/Slider.js ***!
  \**************************/
/*! exports provided: Slider */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"Slider\", function() { return Slider; });\nclass Slider {\r\n\r\n    constructor(images) {\r\n\t\tthis.images = images;\r\n\t\tthis.slide = null;\r\n\t\tthis.prevBtn = null;\r\n\t\tthis.nextBtn = null;\r\n\t\tthis.image = null;\r\n\t\tthis.currentSlide = 0;\r\n\t\tthis.slideArrayLength = 0;\r\n\t\tthis.slideCaption = null;\r\n\r\n\t\tthis.UISelectors = {\r\n\t\t\tslide: \"[data-slide]\",\r\n\t\t\tprevButton: \"[data-button-prev]\",\r\n\t\t\tnextButton: \"[data-button-next]\",\r\n\t\t};\r\n\t}\r\n\r\n\tinitializeSlider() {\r\n\t\tthis.slide = document.querySelector(this.UISelectors.slide);\r\n\t\tthis.prevBtn = document.querySelector(this.UISelectors.prevButton);\r\n\t\tthis.nextBtn = document.querySelector(this.UISelectors.nextButton);\r\n\r\n\t\tthis.image = document.createElement(\"img\");\r\n\t\tthis.image.setAttribute(\"class\", \"slide__image\");\r\n\r\n\t\tthis.setSlideAttributes(0);\r\n\r\n\t\tthis.slideArrayLength = this.images && this.images.length;\r\n\r\n\t\tthis.slide.appendChild(this.image);\r\n\r\n\t\tthis.slideCaption = document.createElement(\"figcaption\");\r\n\t\tthis.addCaption();\r\n\t\tthis.slideCaption.setAttribute(\"class\", \"slide__caption\");\r\n\t\tthis.slide.appendChild(this.slideCaption);\r\n\r\n\t\tthis.disableButtons();\r\n\t\tthis.addListeners();\r\n\t}\r\n\r\n\taddListeners() {\r\n\t\tthis.prevBtn.addEventListener(\"click\", () =>\r\n\t\t\tthis.changeSlide(this.currentSlide - 1)\r\n\t\t);\r\n\t\tthis.nextBtn.addEventListener(\"click\", () =>\r\n\t\t\tthis.changeSlide(this.currentSlide + 1)\r\n\t\t);\r\n\r\n\t\tdocument.addEventListener(\"keydown\", (e) => {\r\n\t\t\tif (e.keyCode === 37) {\r\n\t\t\t\tthis.changeSlide(this.currentSlide - 1);\r\n\t\t\t} else if (e.keyCode === 39) {\r\n\t\t\t\tthis.changeSlide(this.currentSlide + 1);\r\n\t\t\t}\r\n\t\t});\r\n\t}\r\n\r\n\tdisableButtons() {\r\n\t\tthis.currentSlide === 0\r\n\t\t\t? this.prevBtn.setAttribute(\"disabled\", true)\r\n\t\t\t: this.prevBtn.removeAttribute(\"disabled\");\r\n\t\tthis.currentSlide === this.slideArrayLength - 1\r\n\t\t\t? this.nextBtn.setAttribute(\"disabled\", true)\r\n\t\t\t: this.nextBtn.removeAttribute(\"disabled\");\r\n\t}\r\n\r\n\tchangeSlide(index) {\r\n\t\tif (index === -1 || index === this.slideArrayLength) return;\r\n\t\tthis.currentSlide = index;\r\n\r\n\t\tthis.addCaption();\r\n\r\n\t\tthis.setSlideAttributes(index);\r\n\t\tthis.disableButtons();\r\n\t}\r\n\r\n\taddCaption() {\r\n\t\tthis.slideCaption.innerText = `${this.currentSlide + 1}/${\r\n\t\t\tthis.slideArrayLength\r\n\t\t}`;\r\n\t}\r\n\r\n\tsetSlideAttributes(index) {\r\n\t\tthis.image.setAttribute(\r\n\t\t\t\"src\",\r\n\t\t\tArray.isArray(this.images) &&\r\n\t\t\t\tthis.images.length &&\r\n\t\t\t\tthis.images[index]\r\n\t\t);\r\n\t\tthis.image.setAttribute(\"alt\", `Slide o numerze ${index + 1}`);\r\n\t}\r\n\r\n\r\n}\n\n//# sourceURL=webpack:///./src/js/Slider.js?");

/***/ }),

/***/ "./src/js/index.js":
/*!*************************!*\
  !*** ./src/js/index.js ***!
  \*************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _Slider__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Slider */ \"./src/js/Slider.js\");\n/* harmony import */ var _Notebook__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Notebook */ \"./src/js/Notebook.js\");\n/* harmony import */ var _sass_main_scss__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../sass/main.scss */ \"./src/sass/main.scss\");\n/* harmony import */ var _sass_main_scss__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_sass_main_scss__WEBPACK_IMPORTED_MODULE_2__);\n\r\n\r\n\r\n\r\nconst imageArray = [\r\n        './assets/public/img/rpi.jpg',\r\n        './assets/public/img/sushi.jpg',\r\n        './assets/public/img/armtable.jpg'\r\n]\r\n\r\nconst slider = new _Slider__WEBPACK_IMPORTED_MODULE_0__[\"Slider\"](imageArray);\r\nslider.initializeSlider();\r\n\r\nconst notebook = new _Notebook__WEBPACK_IMPORTED_MODULE_1__[\"Notebook\"]();\r\nnotebook.initializeNotebook();\n\n//# sourceURL=webpack:///./src/js/index.js?");

/***/ }),

/***/ "./src/sass/main.scss":
/*!****************************!*\
  !*** ./src/sass/main.scss ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("// extracted by mini-css-extract-plugin\n\n//# sourceURL=webpack:///./src/sass/main.scss?");

/***/ })

/******/ });