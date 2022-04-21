const express = require("express");
const { updateOne } = require("../models/model");
const router = express.Router();
const users = require("../models/model");

/**
 * @swagger
 * components:
 *   schemas:
 *     Users:
 *       type: object
 *       required:
 *         - name
 *         - email
 *         - number
 *       properties:
 *         id:
 *           type: string
 *           description: The auto-generated id of the user
 *         name:
 *           type: string
 *           description: The name of user
 *         email:
 *           type: string
 *           description: The emal of user
 *         number:
 *           type: number
 *           description: The phone number of user
 *       example:
 *         id: unique_hex
 *         name: The name of user
 *         email: The email of user
 *         number: The phone number of user
 */



/**
 * @swagger
 * /users:
 *   get:
 *     summary: Returns the list of all the users
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: The list of the users
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/'
 *       400:
 *         description: error in getting all users
 */

router.get("/", async (req, res) => {
  try {

    const allUsers = await users.find();
    if (!allUsers) res.status(400).json({ "message": "cant't fetch all users" });

    res.status(200).json(allUsers);

  } catch (error) {
    res.json({ message: error.message });
  }
});


/**
 * @swagger
 * /users/{id}:
 *   get:
 *     summary: Get the user by id
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The user id
 *     responses:
 *       200:
 *         description: The user description by id
 *         contens:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       404:
 *         description: The user was not found
 */

router.get("/:id", async (req, res) => {
  try {
    const user = await users.findOne({ name: req.params.id });
    res.json(user);
  } catch (error) {
    res.json({ messagez: error.message });
  }
});

/**
 * @swagger
 * /users:
 *   post:
 *     summary: Create a new user
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       200:
 *         description: The user was successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       500:
 *         description: Some server error
 */

router.post("/", async (req, res) => {
  const user = new users({
    name: req.body.name,
    email: req.body.email,
    number: req.body.number,
  });
  try {
    await user.save();
    res.json({ message: "User created successfully" });
  } catch (error) {
    res.json({ message: error.message });
  }
});

/**
 * @swagger
 * /users/{id}:
 *   delete:
 *     summary: Remove the user by id
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The user id
 * 
 *     responses:
 *       200:
 *         description: The user was deleted successfully
 *       404:
 *         description: The user was not found
 */

router.delete("/:id", async (req, res) => {
  try {
    await users.remove({ name: req.params.id });
    res.send({ message: "User deleted successfully" });
  } catch (error) {
    res.json({ messagez: error.message });
  }
});


/**
 * @swagger
 * /users/{id}:
 *  put:
 *    summary: Update the user by the id
 *    tags: [Users]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *        description: The user id
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/Book'
 *    responses:
 *      200:
 *        description: The user was updated
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Book'
 *      404:
 *        description: The user was not found
 */
router.patch("/:id", async (req, res) => {
  try {
    await users.updateOne({ name: req.params.id }, { $set: req.body });
    res.json({ message: "user data updated successfully" });
  } catch (error) {
    res.json({ messagez: error.message });
  }
});

module.exports = router;
