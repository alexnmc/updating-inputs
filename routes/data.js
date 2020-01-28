const express = require('express')
const dataRouter = express.Router()
const Data = require("../models/data")




dataRouter.post('/', (req, res, next) => {      
    const newData = new Data(req.body)
    newData.save((err, data) => {
        if (err) {
            res.status(500)
            return next(err)
        }
        return res.status(201).send('data saved')
    })
}
)


dataRouter.get('/:id', (req, res, next) => {    
    Data.find({_id: req.params.id}, (err, data) => {
        if(err) {
            res.status(500)
            return next(err)
        }
        return res.status(200).send(data)
    })
})



dataRouter.get('/', (req, res, next) => {    
    Data.find((err, data) => {
        if(err) {
            res.status(500)
            return next(err)
        }
        return res.status(200).send(data)
    })
})


dataRouter.delete('/', (req, res, next) => {
    Data.remove((err, data) => {      // for postman testing, deletes everything !
        if (err) {
            res.status(500)
            return next(err)
        }
        return res.status(202).send('all data was deleted!')
    })
})




dataRouter.put('/:id',  (req, res, next) => {    
        Data.findOneAndUpdate(
                {_id: req.params.id},
                req.body,                           
                {new: true},                 
                (err, updatedNotes) => {
                    if (err) {
                        res.status(500)
                        return next(err)
                    }
                    return res.status(201).send(updatedNotes)
                }
        )
})  


dataRouter.delete('/delete/:id', (req, res, next) => {  
    Data.remove({userID: req.params.id},(err, data) => {
        if (err) {
            res.status(500)
            return next(err)
        }
        return res.status(202).send('deletion succesful')
    })
})
    


module.exports = dataRouter