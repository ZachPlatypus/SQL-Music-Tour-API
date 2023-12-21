const events = require('express').Router()
const db = require('../models')
const { Event } = db
const { Op } = require('sequelize')

events.get('/', async (req, res) => {
    try{
        const foundevents = await Event.findAll({ 
            order: [['available_start_time', 'ASC']],
            where: {
                name: {[Op.like]: `%${req.query.name ? req.query.name : ''}%`}
            }
        })
        res.status(200).json(foundevents)
    } catch (error){
        res.status(500).json(error)
    }
})


events.get('/', async (req, res) => {
    try{
        const foundevents = await Event.findAll()
        res.status(200).json(foundevents)
    } catch (error){
        res.status(500).json(error)
    }
})

events.get('/:id', async (req, res) => {
    try{
        const foundEvent = await Event.findOne({
            where: {event_id: req.params.id}
        })
        res.status(200).json(foundEvent)
    } catch (error){
        res.status(500).json(error)
    }
})

events.post('/', async (req, res) => {
    try{
        const newEvent = await Event.create(req.body)
        res.status(200).json({
            message: 'Successfully uploaded a new event',
            data: newEvent
        })
    } catch(error){
        res.status(500).json(error)
    }
})

events.put('/:id', async (req, res) => {
    try{
        const updatedevents = await Event.update(req.body, {
            where: {
                event_id: req.params.id
            }
        })
        res.status(200).json({
            message: `Successfully updated ${updatedevents}.`
        })
    } catch(error){
        res.status(500).json(error)
    }
})

events.delete('/:id', async (req, res) => {
    try{
        const deletedevents = await Event.destroy({
            where: {
                event_id: req.params.id
            }
        })
        res.status(200).json({
            message: `Successfully deleted ${deletedevents}.`
        })
    } catch(error){
        res.status(500).json(error)
    }
})

module.exports = events