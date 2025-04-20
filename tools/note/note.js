document.addEventListener('DOMContentLoaded', () => {
    const notesList = document.getElementById('notes');
    const addNoteBtn = document.getElementById('add-note');
    const newNoteInput = document.getElementById('new-note');
    const noteColorInput = document.getElementById('note-color');
    const noteFontInput = document.getElementById('note-font');
    const clearAllBtn = document.getElementById('clear-all');
    const sortNotesBtn = document.getElementById('sort-notes');
    const backToHomeBtn = document.getElementById('back-to-home');
    const MAX_LENGTH = 1000;
    let notes = JSON.parse(localStorage.getItem('notes')) || [];
    let sortAsc = true;

    function saveNotes() {
        localStorage.setItem('notes', JSON.stringify(notes));
    }

    function renderNotes() {
        notesList.innerHTML = '';
        notes.forEach((note, idx) => {
            const li = document.createElement('li');
            li.style.backgroundColor = note.color;
            li.style.fontFamily = note.font;
            li.setAttribute('draggable', 'true');
            li.dataset.index = idx;
            // Inline edycja
            if (note.editing) {
                li.innerHTML = `
                    <div class="note-date">${note.date}</div>
                    <textarea class="edit-note-text" maxlength="1000">${note.text}</textarea>
                    <div class="note-actions">
                        <input type="color" class="color-picker" value="${note.color}" title="Zmień kolor">
                        <select class="font-picker" title="Zmień czcionkę">
                            <option value="Roboto"${note.font === 'Roboto' ? ' selected' : ''}>Roboto</option>
                            <option value="Arial"${note.font === 'Arial' ? ' selected' : ''}>Arial</option>
                            <option value="Georgia"${note.font === 'Georgia' ? ' selected' : ''}>Georgia</option>
                            <option value="Courier New"${note.font === 'Courier New' ? ' selected' : ''}>Courier New</option>
                            <option value="Times New Roman"${note.font === 'Times New Roman' ? ' selected' : ''}>Times New Roman</option>
                        </select>
                        <button class="save-edit"><i class="fa fa-check"></i> Zapisz</button>
                        <button class="cancel-edit"><i class="fa fa-times"></i> Anuluj</button>
                    </div>
                `;
                li.querySelector('.save-edit').onclick = () => {
                    const newText = li.querySelector('.edit-note-text').value.trim();
                    if (newText && newText.length <= 1000) {
                        note.text = newText;
                        note.editing = false;
                        saveNotes();
                        renderNotes();
                    }
                };
                li.querySelector('.cancel-edit').onclick = () => {
                    note.editing = false;
                    renderNotes();
                };
                li.querySelector('.color-picker').oninput = (e) => {
                    note.color = e.target.value;
                    saveNotes();
                    renderNotes();
                };
                li.querySelector('.font-picker').onchange = (e) => {
                    note.font = e.target.value;
                    saveNotes();
                    renderNotes();
                };
            } else {
                li.innerHTML = `
                    <div class="note-date">${note.date}</div>
                    <div class="note-content">${marked.parse(note.text)}</div>
                    <div class="note-actions">
                        <input type="color" class="color-picker" value="${note.color}" title="Zmień kolor">
                        <select class="font-picker" title="Zmień czcionkę">
                            <option value="Roboto"${note.font === 'Roboto' ? ' selected' : ''}>Roboto</option>
                            <option value="Arial"${note.font === 'Arial' ? ' selected' : ''}>Arial</option>
                            <option value="Georgia"${note.font === 'Georgia' ? ' selected' : ''}>Georgia</option>
                            <option value="Courier New"${note.font === 'Courier New' ? ' selected' : ''}>Courier New</option>
                            <option value="Times New Roman"${note.font === 'Times New Roman' ? ' selected' : ''}>Times New Roman</option>
                        </select>
                        <button class="edit-note" title="Edytuj notatkę"><i class="fa fa-edit"></i></button>
                        <button class="delete-note" title="Usuń notatkę"><i class="fa fa-trash"></i></button>
                    </div>
                `;
                li.querySelector('.edit-note').onclick = () => {
                    note.editing = true;
                    renderNotes();
                };
                li.querySelector('.delete-note').onclick = () => {
                    notes.splice(idx, 1);
                    saveNotes();
                    renderNotes();
                };
                li.querySelector('.color-picker').oninput = (e) => {
                    note.color = e.target.value;
                    saveNotes();
                    renderNotes();
                };
                li.querySelector('.font-picker').onchange = (e) => {
                    note.font = e.target.value;
                    saveNotes();
                    renderNotes();
                };
            }
            // Drag & drop events
            li.addEventListener('dragstart', (e) => {
                li.classList.add('dragging');
                e.dataTransfer.setData('text/plain', idx);
            });
            li.addEventListener('dragend', () => {
                li.classList.remove('dragging');
            });
            li.addEventListener('dragover', (e) => {
                e.preventDefault();
                li.classList.add('drag-over');
            });
            li.addEventListener('dragleave', () => {
                li.classList.remove('drag-over');
            });
            li.addEventListener('drop', (e) => {
                e.preventDefault();
                li.classList.remove('drag-over');
                const fromIdx = parseInt(e.dataTransfer.getData('text/plain'));
                const toIdx = idx;
                if (fromIdx !== toIdx) {
                    const moved = notes.splice(fromIdx, 1)[0];
                    notes.splice(toIdx, 0, moved);
                    saveNotes();
                    renderNotes();
                }
            });
            notesList.appendChild(li);
        });
    }

    addNoteBtn.onclick = () => {
        const text = newNoteInput.value.trim();
        if (!text) return;
        if (text.length > MAX_LENGTH) {
            alert('Notatka jest za długa! Maksymalnie 1000 znaków.');
            return;
        }
        const now = new Date();
        const date = now.toLocaleDateString() + ' ' + now.toLocaleTimeString();
        notes.push({
            text,
            color: noteColorInput.value,
            font: noteFontInput.value,
            date
        });
        saveNotes();
        renderNotes();
        newNoteInput.value = '';
    };

    clearAllBtn.onclick = () => {
        if (confirm('Czy na pewno chcesz usunąć wszystkie notatki?')) {
            notes = [];
            saveNotes();
            renderNotes();
        }
    };

    sortNotesBtn.onclick = () => {
        notes.sort((a, b) => sortAsc ? a.date.localeCompare(b.date) : b.date.localeCompare(a.date));
        sortAsc = !sortAsc;
        renderNotes();
    };

    backToHomeBtn.onclick = () => {
        window.location.href = '../../index.html';
    };

    // Limit input length live
    newNoteInput.oninput = () => {
        if (newNoteInput.value.length > MAX_LENGTH) {
            newNoteInput.value = newNoteInput.value.slice(0, MAX_LENGTH);
        }
    };

    renderNotes();
});
