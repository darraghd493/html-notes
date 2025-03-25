let notes = []; // dicts: title & content
let template;

// save load notes
const loadNotes = () => {
    notes = JSON.parse(localStorage.getItem('notes'));
    if (notes === null) {
        notes = [];
    }
};

const saveNotes = () => {
    if (notes === null) {
        notes = [];
    }
    localStorage.setItem('notes', JSON.stringify(notes));
};

// page modal functionality
const openCreateNoteModal = () => {
    const modal = document.getElementById('create-note-modal');
    modal.style.display = 'block';
    
    const content = modal.getElementsByClassName('modal-content')[0];
    content.getElementsByTagName('input')[0].focus();
    content.getElementsByTagName('input')[0].value = '';
    content.getElementsByTagName('textarea')[0].value = '';
}

const closeCreateNoteModal = () => {
    const modal = document.getElementById('create-note-modal');
    modal.style.display = 'none';
}

// page notes functionality
const createNote = () => {
    const modal = document.getElementById('create-note-modal');
    modal.style.display = 'block';
    
    const mContent = modal.getElementsByClassName('modal-content')[0];
    const title = mContent.getElementsByTagName('input')[0].value;
    const content = mContent.getElementsByTagName('textarea')[0].value;

    const note = {
        title: title,
        content: content
    };

    notes.push(note);
    saveNotes();
    closeCreateNoteModal();
    loadNotesList();
}

const deleteNote = (elem) => {
    const note = elem.parentNode.parentNode; // buttom > div > div
    const title = note.querySelector('#note-title').innerText;
    const content = note.querySelector('#note-content').innerText;
    notes = notes.filter(n => n.title !== title || n.content !== content);
    saveNotes();
    loadNotesList();
}

const loadNotesList = () => {
    const notesList = document.getElementById('notes-list');
    notesList.innerHTML = '';
    notes.forEach(note => {
        const newNote = template.cloneNode(true);
        newNote.querySelector('#note-title').innerText = note.title;
        newNote.querySelector('#note-content').innerText = note.content;
        notesList.appendChild(newNote);
    });
};

window.onload = () => {
    template = document.getElementById('note-template').cloneNode(true);
    template.removeAttribute('id');
    template.style.display = 'block';
    document.getElementById('note-template').remove();
    loadNotes();
    loadNotesList();
};
