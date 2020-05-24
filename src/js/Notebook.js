
export class Notebook {

    constructor() {
        this.noteText = null;
        this.notesSection = null;
        this.notesArray = [];
        this.pageCounter = 0;
        this.arrowLeft = null;
        this.arrowRight = null;


        this.UISelectors = {
            noteText: "[data-form]",
            notesSection: "[data-notes]",
            notesList: "[data-notes-list]",
            pageCounter: "[data-counter]",
            arrowLeft: "[data-notes-left-btn]",
            arrowRight: "[data-notes-right-btn]"   
        }
    }



    initializeNotebook() {   
        this.noteText = document.querySelector(this.UISelectors.noteText);
        this.notesSection = document.querySelector(this.UISelectors.notesSection);
        this.notesList = document.querySelector(this.UISelectors.notesList);
        this.pageCounter = document.querySelector(this.UISelectors.pageCounter);
        this.arrowLeft = document.querySelector(this.UISelectors.arrowLeft);
        this.arrowRight = document.querySelector(this.UISelectors.arrowRight); 

        this.loadNote();
        this.addListeners();
        
    };


    addListeners() {
        this.notesArray.forEach(item => {
            item.querySelector("[data-delete-option]").addEventListener("click", () => this.removeNote(event));
            item.querySelector("[data-delete-option]").addEventListener("keypress", () => this.removeNote(event));
            item.querySelector("[data-edit-option]").addEventListener("click", () => this.editNote(event));
            item.querySelector("[data-edit-option]").addEventListener("keypress", () => this.editNote(event));
        });

        this.noteText.addEventListener("blur", () => this.saveNote());
        this.arrowLeft.addEventListener("click", () => this.moveLeft());
        this.arrowRight.addEventListener("click", () => this.moveRight())
    }


    isEmpty () {
        String(this.noteText.value) !== "" 
            ? false
            : true
    };

    myStorage() {
        let myArray;
        if (localStorage.getItem("notes") !== null) {
            return (myArray = JSON.parse(localStorage.getItem("notes")));
        } else {
            return myArray = [];
        }
    };

    setListItems () {
        this.notesArray = document.querySelectorAll("[data-notes-items]");
    }

    clearList() {
        this.notesArray = document.querySelectorAll("data-notes-items");
        this.notesArray.forEach(item => {
            item.remove();
        })
    }

    loadNote () {
        const notes = this.myStorage();

        if (notes.length > 0) {
            notes.forEach((note, index) => {
                let page = index + 1;
                let itemsList = `
                    <li class="notes__item ${index == 0 ? "notes__item--active" : ""}" data-notes-items>
                        <div class="options-panel">
                            <button class="options-panel__btn" data-delete-option note="${note.id}">
                                <img src="./assets/public/icons/icon-delete.svg" alt="Delete button." class="option-panel__icon"
                                note="${note.id}"/>
                            </button>
                            <button class="options-panel__btn" data-edit-option note="${note.id}">
                            <img src="./assets/public/icons/icon-edit.svg" alt="Edit button." class="option-panel__icon"
                            note="${note.id}"/>
                            </button>
                        </div>
                        <p class="notes__content" data-notes-content>
                        ${note.text}</p>
                        <footer class="notes-footer">
                            <p class="notes-footer__date">
                        ${note.saveAt}
                            </p>
                            <p class="notes-footer__page-number">
                            ${page++}
                            </p>
                        </footer>
                    </li>
                
                ` ;
                this.notesList.insertAdjacentHTML("beforeend", itemsList);
            });

            this.setListItems();
            this.addListeners();
            this.pageCounter.innerHTML = `number of notes: ${notes.length}`;
            this.notesSection.classList.add("notes--show");
        } else {
            this.notesSection.classList.remove("notes--show");
        }
    };

    saveNote() {
        const notes = this.myStorage();

        if (!this.isEmpty()) {
            if (this.noteText.attributes.note.value === "") {
                let note = {
                    id: Date.now(),
                    text: this.noteText.value,
                    saveAt: new Date().toString().slice(0, 24)
                };

            notes.push(note);
            localStorage.setItem("notes", JSON.stringify(notes));
            this.clearList();
            this.loadNote();

            } else {
            const noteId = this.noteText.attributes.note.value;
            const theNoteIndex = notes.findIndex(note => note.id == noteId);

            notes[theNoteIndex].text = this.noteText.value;
            notes[theNoteIndex].saveAt = new Date().toString().slice(0, 24);

            this.noteText.attributes.note.value = "";
            localStorage.setItem("notes", JSON.stringify(notes));
            this.clearList();
            this.loadNote();
            } 

            this.noteText.value = "";

        }

    }

    editNote (event) {
        event.preventDefault();

        if (event.type === "click" || (event.type === "keypress" && event.key === "Enter")) {
            const notes = this.myStorage();
            const noteId = event.target.attributes.note.value;
            const theNoteIndex = notes.findIndex(note => note.id == noteId);

            this.noteText.value = notes[theNoteIndex].text;
            this.noteText.attributes.note.value = noteId;

            localStorage.setItem("notes", JSON.stringify(notes));
            this.noteText.focus({preventScroll: false});
        }
    }

    removeNote (event) {
        event.preventDefault();

        if (event.type === "click" || (event.type === "keypress" && event.key === "Enter")) {
            const notes = this.myStorage();
            const noteId = event.target.attributes.note.value;
            const theNoteIndex = notes.findIndex(note => note.id == noteId);
            const itemsList = event.composedPath()[3];

            this.moveRight();
            notes.splice(theNoteIndex, 1);
            itemsList.remove();

            localStorage.setItem("notes", JSON.stringify(notes));
            this.setListItems();
            this.pageCounter.innerHTML = `notes ${notes.length}`;
            if (notes.length === 0) {
                this.loadNote();
            }
        }
    };

    moveLeft() {
        let newIndex = null;
        this.notesArray.forEach((slide, index) => {
            if (slide.classList.contains("notes__item--active") && newIndex !== index) {
                slide.classList.remove("notes__item--active");
                if (index === 0) {
                    this.notesArray[this.notesArray.length - 1].classList.add("notes__item--active");
                    newIndex = this.notesArray.length - 1;
                } else {
                    this.notesArray[index - 1].classList.add("notes__item--active");
                    newIndex = index - 1;
                }
            }
        });
    };

    moveRight() {
        let newIndex = null;
        this.notesArray.forEach((slide, index) => {
            if (slide.classList.contains("notes__item--active") && newIndex !== index) {
                slide.classList.remove("notes__item-active");
                if (index === this.notesArray.length - 1) {
                    this.notesArray[0].classList.add("notes__item--active");
                    newIndex = 0;
                } else {
                    this.notesArray[index + 1].classList.add("notes__item--active");
                    newIndex = index + 1;
                }
            }
        });
    };

}
