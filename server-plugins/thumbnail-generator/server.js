const express = require('express')
const app = express()

app.get('/getThumbnail/:id', (req, res) => {
    let id = req.params.id;

    var options = {
        root: __dirname + '/tmp/'
    }
    
    let f = (num) => {
        if (num > 1000) {
            return num;
        }

        if (num > 100) {
            return '0' + num;
        }

        if (num > 10) {
            return '00' + num;
        }

        return '000' + num;
    }

    res.sendFile(`sample-thumbnail-200x85-${f(id)}.png`, options)
})

app.listen(3000, () => console.log('Example app listening on port 3000!'))