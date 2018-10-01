const express = require('express')
const app = express()

app.get('/getThumbnail/:id', (req, res) => {
    let id = req.params.id;

    var options = {
        root: __dirname + '/dist/'
    }

    res.sendFile(`out${id}.png`, options)
})

app.listen(3000, () => console.log('Example app listening on port 3000!'))