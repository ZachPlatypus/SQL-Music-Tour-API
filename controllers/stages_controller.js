const stages = require('express').Router()
const db = require('../models')
const { Stage } = db
const { Op } = require('sequelize')

stages.get('/', async (req, res) => {
    try{
        const foundstages = await Stage.findAll({ 
            order: [['available_start_time', 'ASC']],
            where: {
                name: {[Op.like]: `%${req.query.name ? req.query.name : ''}%`}
            }
        })
        res.status(200).json(foundstages)
    } catch (error){
        res.status(500).json(error)
    }
})


stages.get('/', async (req, res) => {
    try{
        const foundstages = await Stage.findAll()
        res.status(200).json(foundstages)
    } catch (error){
        res.status(500).json(error)
    }
})

stages.get('/:id', async (req, res) => {
    try{
        const foundStage = await Stage.findOne({
            where: {stage_id: req.params.id}
        })
        res.status(200).json(foundStage)
    } catch (error){
        res.status(500).json(error)
    }
})

stages.post('/', async (req, res) => {
    try{
        const newStage = await Stage.create(req.body)
        res.status(200).json({
            message: 'Successfully uploaded a new stage',
            data: newStage
        })
    } catch(error){
        res.status(500).json(error)
    }
})

stages.put('/:id', async (req, res) => {
    try{
        const updatedstages = await Stage.update(req.body, {
            where: {
                stage_id: req.params.id
            }
        })
        res.status(200).json({
            message: `Successfully updated ${updatedstages}.`
        })
    } catch(error){
        res.status(500).json(error)
    }
})

stages.delete('/:id', async (req, res) => {
    try{
        const deletedstages = await Stage.destroy({
            where: {
                stage_id: req.params.id
            }
        })
        res.status(200).json({
            message: `Successfully deleted ${deletedstages}.`
        })
    } catch(error){
        res.status(500).json(error)
    }
})

module.exports = stages