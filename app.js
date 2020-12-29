// ============================
/* const fs = require('fs');

 fs.writeFileSync('notes.txt', 'My name is Saranya.'); // writeFileSync method is used for writing data to a file

 fs.appendFileSync('notes.txt', ' I am from India'); // appendFileSync is used to add the content to the file */
// =============================

// =============================
/* const add = require('./utils.js')

 const sum = add(5, 7)

 console.log(sum) */

// ============== Used Validator Library ==============
/* const validator = require('validator') // it's a package in node_modules which is used to validate the passed string in the file.
const getNotes = require('./notes.js')

const msg = getNotes();
console.log(msg)

console.log(validator.isEmail('saran@gmail.com')) // it return true if the email is valid or else it returns false. isEmail is a method used in the validator to check the email format.

console.log(validator.isURL('https://saran.com')) // isURL method is used to check the format of the URL. */

// ============== Used Chalk Library ==============
/*const chalk = require('chalk') // it's a package in node_modules which is used to print the console.log output in colors.
const getNotes = require('./notes.js')

const msg = getNotes();
console.log(msg)

const greenMsg = chalk.yellow.bold('Success')
console.log(greenMsg)*/
// ===================================================

// ============= Getting Input From User =============
/*const chalk = require('chalk')
const getNotes = require('./notes.js')

const command = process.argv[2]

console.log(process.argv) // process is an object which has lots of methods init. argument vector is just an array in js to store the datas

if (command === 'add') {
    console.log('Adding Notes!')
} else if (command === 'remove') {
    console.log('Removing Notes!')
}*/
// =====================================================

// ============= Argument Parsing with yargs =============
const chalk = require('chalk')
const { argv } = require('yargs')
const yargs = require('yargs')
const notes = require('./notes.js')

// Customize yargs version
yargs.version('1.1.0')

// In the notes app customers want to add, remove, read, list notes

// Create add command
yargs.command({
    command: 'add',
    describe: 'Add a new note',
    builder: {
        title: {
            describe: 'Note title',
            demandOption: true, // required to fill the title
            type: 'string'
        },
        body: {
            describe: 'Note Body',
            demandOption: true, //required to fill the body
            type: 'string'
        }
    },
    handler(argv) {
        notes.addNote(argv.title, argv.body)
    }
})

// Create Remove command
yargs.command({
    command: 'remove',
    describe: 'Remove a note',
    builder: {
        title: {
            describe: 'Note title',
            demandOption: true, // required to fill the title
            type: 'string'
        }
    },
    handler(argv) {
        notes.removeNote(argv.title)
    }
})

// Create a List command
yargs.command({
    command: 'list',
    describe: 'List your notes',
    handler() {
        notes.listNotes()
    }
})

// Create a Read command
yargs.command({
    command: 'read',
    describe: 'Read a note',
    builder: {
        title: {
            describe: 'Note title',
            demandOption: true,
            type: 'string'
        }
    },
    handler(argv) {
        notes.readNote(argv.title)
    }
})
yargs.parse() // returns the argv object

// console.log(yargs.argv) // show the data more precisely eg: in command --> node app.js add --title="Things to buy"