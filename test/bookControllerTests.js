const should = require('should')
const sinon = require('sinon')
const bookController = require('../controllers/booksController')

describe("Book Controller Tests", () => {
    describe('HTTP POST', () => {
        it('Should not allow posting with an empty title on post ', () => {
            const Book = function (book) {
                this.save = () => {}
            }
            const req = {
                body: {
                    author: 'Akshay Ib'
                }
            }
            const res = {
                status: sinon.spy(),
                send: sinon.spy(),
                json: sinon.spy()
            }
            const controller = bookController(Book)
            controller.post(req, res)
            res.status.calledWith(400).should.equal(true)
            res.send.calledWith('Title is Required').should.equal(true)
        })
    })
})