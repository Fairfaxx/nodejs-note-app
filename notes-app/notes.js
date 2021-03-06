const fs = require('fs');
const chalk = require('chalk');

const addNote = (title, body) => {
	const notes = loadNotes();
	const duplicateNotes = notes.find((note) => note.title === title && note.body === body);

	if (!duplicateNotes) {
		notes.push({
			title,
			body
		});
		saveNotes(notes);
		console.log(chalk.green.inverse('New note added'));
	} else {
		console.log(chalk.red.inverse('It is duplicated'));
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

const listNotes = () => {
	const notes = loadNotes();
	const allNotes = notes.map((note) =>
		console.log(chalk.green(`Title: ${note.title}`), chalk.blue(`Body: ${note.body}`))
	);
	return allNotes;
};

const readNote = (title) => {
  const notes = loadNotes();
  const noteToRead = notes.find((note) => note.title === title);
  if(noteToRead){
    console.log(chalk.inverse.green(noteToRead.title), chalk.blue(noteToRead.body))
  } else{
    console.log(chalk.inverse.red('Note not found...'))
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
	addNote: addNote,
	removeNote: removeNote,
	listNotes: listNotes,
  readNote: readNote,
};
