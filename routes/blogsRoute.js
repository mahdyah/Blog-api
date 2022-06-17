const express = require('express')
const authMiddleware = require('../middleware/authMiddleware')
const blogModel = require('../models/BlogSchema')
const router = express.Router()
const app = express()

/**
 * @swagger
 * components:
 *   schemas:
 *    Blog:
 *       type: object
 *       required:
 *         - title
 *         - author
 *         - content
 *       properties:
 *         id:
 *           type: string
 *           description: The auto-generated id of the content
 *         title:
 *           type: string
 *           description: blog title
 *         author:
 *           type: string
 *           description: The blog author
 *         Date:
 *           type: Date
 *           description: The time the blog was created
 *       example:
 *         id: d5fE_asz
 *         title: The Unnamed
 *         author: undefined
 * 
 *   securitySchemes:
 *     bearerAuth: 
 *       type:http
 *       scheme:bearer
 *       bearerFormat:JWT
 * 
 *   security:
 *      - bearerAuth: [] 
 * 
 * 
 */

/**
 * @swagger
 * tags:
 *   name: Blogs
 *   description: The API managing blogs
 */

/**
 * @swagger
 * /blogs:
 *   get:
 *     summary: Returns the list of all the blogs
 *     tags: [Blogs]
 *     responses:
 *       200:
 *         description: The list of the blogs
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Blog'
 */
router.get('/',authMiddleware,async (req, res) => {

    try {
        const blog = await blogModel.find()
        res.status(200).json(blog)
    } catch (error) {
        res.status(400).json('Bad request')
    }
})

/**
 * @swagger
 * /blogs:
 *   post:
 *     summary: Create a new blog
 *     tags: [Blogs]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Blog'
 *     responses:
 *       200:
 *         description: The blog was successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Blog'
 *       500:
 *         description: Some server error
 */
router.post('/', authMiddleware, async (req, res) => {
    const data = req.body
    data.user = req.user.id
    console.log(data.user, 'this is on post')
    try {
        const content = await blogModel.create(data)
        res.status(201).json(content)
    } catch (error) {
        console.log(error)
        res.status(400).json('bad request!!!')
    }
})
/**
 * @swagger
 * /blogs/{id}:
 *   delete:
 *     summary: Remove the blog by id
 *     tags: [Blogs]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The blog id
 * 
 *     responses:
 *       200:
 *         description: The blog was deleted
 *       404:
 *         description: The blog was not found
 */

router.delete('/:id', authMiddleware, async (req, res) => {
    const id = req.params.id

    console.log(id, 'id of the request')
    try {
        const contentToDelete = await blogModel.findById(id)
        console.log("the content to be deleted", contentToDelete)

        console.log(contentToDelete.user._id.toString(), '||', req.user.id)

        if (contentToDelete.user._id.toString() !== req.user.id) {
            return res.status(400).json({
                msg: 'Not Authorized! '
            })
        }
        await blogModel.findByIdAndDelete(id)
        res.status(200).json({
            msg: "The content was deleted"
        })
    } catch (error) {
        console.log(error)
        res.status(400).json({
            msg: "Problem deleting"
        })
    }
})

/**
 * @swagger
 * /blogs/{id}:
 *  put:
 *    summary: Update the blog by the id
 *    tags: [Blogs]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *        description: The blog id
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/Blog'
 *    responses:
 *      200:
 *        description: The blog was updated
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Blog'
 *      404:
 *        description: The blog was not found
 *      500:
 *        description: Some error happened
 */
router.put('/:id', authMiddleware, async (req, res) => {
    const id = req.params.id
    const newContentData = req.body
    try {
        const blog = await blogModel.findByIdAndUpdate(id, newContentData, {
            new: true
        })

        res.status(202).json(blog)
    } catch (error) {
        res.status(400).json({
            msg: "Problem with updates"
        })
    }
})


module.exports = router;