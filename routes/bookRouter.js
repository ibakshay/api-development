const express = require('express')
const booksController = require('../controllers/booksController')

function routes(Book) {
    const router = express.Router()
    const controller = booksController(Book)
    router.route('/books').post(controller.post).get(controller.get)

    /* MIDDLEWARE*/
    router.use('/books/:bookId', (req, res, next) => {
        Book.findById(req.params.bookId, (err, book) => { //req.params.bookId will get values from the URL, books/:bookId
            if (err) {
                return res.send(err)
            }
            if (book) {
                req.book = book
                return next()
            }
            return res.sendStatus(404)
        })

    })


    router.route('/books/:bookId').get((req, res) => {
        res.json(req.book)
    }).put((req, res) => {
        const {
            book
        } = req
        book.title = req.body.title
        book.author = req.body.author
        book.genre = req.body.genre
        book.read = req.body.read
        book.save()
        return res.json(book)
    }).patch((req, res) => {
        const {
            book
        } = req
        if (req.body.title) {
            book.title = req.body.title
        }
        book.save()
        return res.json(book)
    }).delete((req, res) => {
        const book = req.book
        book.delete()
        return res.send("deleted")
    })
    return router
}

module.exports = routes