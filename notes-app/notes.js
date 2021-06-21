const fs = require('fs');
const chalk = require('chalk');

const getNotes = () => {
	return 'Your notes...';
};

const addNote = (title, body) => {
	const notes = loadNotes();
	const duplicateNotes = notes.filter((note) => note.title === title && note.body === body);

	if (duplicateNotes.length === 0) {
		notes.push({
			title,
			body
		});
		saveNotes(notes);
		console.log('New note added');
	} else {
		console.log('It is duplicated');
	}
};

const removeNote = (title, body) => {
	const notes = loadNotes();
	const notesToKeep = notes.filter((note) => note.title !== title && note.body !== body);
	if (notes.length > notesToKeep.length) {
		saveNotes(notesToKeep);
		console.log(chalk.green('Note removed'));
	} else {
		console.log(chalk.bgRed('No notes to remove found'));
	}
};

const saveNotes = (notes) => {
	const dataJSON = JSON.stringify(notes);
	fs.writeFileSync('notes.json', dataJSON);
};

const loadNotes = () => {
	try {
		const dataBuffer = fs.readFileSync('notes.json');
		const dataJSON = dataBuffer.toString();
		return JSON.parse(dataJSON);
	} catch (e) {
		return [];
	}
};

module.exports = {
	getNotes: getNotes,
	addNote: addNote,
	removeNote: removeNote
};
