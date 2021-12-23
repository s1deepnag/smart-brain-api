const clarifai = require('clarifai');

const app = new clarifai.App({
    apiKey: 'fd7e352183894e5f822991aebd5bda95'
   });

const handleImageUrl = (req, res) => {
    const {input} = req.body;
    app.models.predict(
        clarifai.FACE_DETECT_MODEL, 
        input)
        .then(data => {
            res.json(data);
        })
        .catch(err => res.status(400).json('Unable to work with the API'))
}

const handleImage = (req, res, db) => {
    const { id } = req.body;
    db('users').where('id', '=', id)
    .increment('entries', 1)
    .returning('entries')
    .then(entries => {
        res.json(entries[0]);
    })
    .catch(err => res.status(400).json('unable to get entries'))
}

module.exports = {
    handleImage: handleImage,
    handleImageUrl: handleImageUrl
};