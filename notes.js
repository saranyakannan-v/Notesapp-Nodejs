const fs = require('fs') // require File system module
const chalk = require('chalk') // require chalk library to color the console output

// const getNotes = () => {
//     return 'your notes...'
// }

const addNote = (title, body) => {
    const notes = loadNotes()
        // shorter method of using function in arrow key ES6 syntax
        //const duplicateNotes = notes.filter((note) => note.title === title) // filter method returns array of matches
        // or another method of using function
        // const duplicateNotes = notes.filter(function(note) {
        //     return note.title === title
        // })
    const duplicateNote = notes.find((note) => note.title === title) // find method returns the first match is find if any otherwise it defines undefined

    if (!duplicateNote) {
        notes.push({
            title: title,
            body: body
        })
        saveNotes(notes)
        console.log(chalk.green.inverse('New note added!'))
    } else {
        console.log(chalk.red.inverse('Note title already taken!'))
    }
}

const removeNote = (title) => {
    const notes = loadNotes()
    const notesToKeep = notes.filter((note) => note.title !== title)
        // or another method of function
        // const notesToKeep = notes.filter(function(note) {
        //     return note.title !== title
        // })
    if (notes.length > notesToKeep.length) {
        console.log(chalk.green.inverse('Notes removed!'))
        saveNotes(notesToKeep)
    } else {
        console.log(chalk.red.inverse('No note found!'))
    }

}
const listNotes = () => {
    const notes = loadNotes()

    console.log(chalk.inverse('Your Notes'))

    notes.forEach((note) => {
        console.log(note.title)
    })
}

const readNote = (title) => {
    const notes = loadNotes()
    const note = notes.find((note) => note.title === title)

    if (note) {
        console.log(chalk.inverse(note.title))
        console.log(note.body)
    } else {
        console.log(chalk.red.inverse('Notes not found!'))
    }

}

const saveNotes = (notes) => {
    const dataJSON = JSON.stringify(notes)
    fs.writeFileSync('notes.json', dataJSON)
}

const loadNotes = () => {
    try {
        const dataBuffer = fs.readFileSync('notes.json')
        const dataJSON = dataBuffer.toString()
        return JSON.parse(dataJSON)
    } catch (e) {
        return []
    }
}
module.exports = {
    // getNotes: getNotes,
    addNote: addNote,
    removeNote: removeNote,
    listNotes: listNotes,
    readNote: readNote
}