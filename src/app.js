const express = require('express');
const bodyParser = require("body-parser");
const {
    getEnvironment,
    getEnvironmentById,
    createEnvironment,
    updateEnvironments,
    deleteEnvironment,
    patchEnvironment
} = require('./services/environment.services');

const app = express();

app.use(bodyParser.json());

app.get('/', (req, res) => {
    try {
        const environment = getEnvironment();
        res.status(200).send(environment);
    } catch (error) {
        res.status(500).send(`Error GET / : ${error.message}`);
    }
});

app.get('/:id', (req, res) => {
    try {
        const {
            id
        } = req.params;
        const environment = getEnvironmentById(id);
        res.status(200).send(environment);
    } catch (error) {
        res.status(500).send(`Error GET /:id : ${error.message}`);
    }
});

app.post('/', (req, res) => {
    try {
        const {
            label,
            category,
            priority
        } = req.body;
        const environments = createEnvironment(label, category, priority);
        res.status(200).send(environments);
    } catch (error) {
        res.status(500).send(`Error POST / : ${error.message}`);
    }
});

app.put('/:id', (req, res) => {
    try {
        const {
            id
        } = req.params;
        const {
            label,
            category,
            priority
        } = req.body;
        const updateEnvitonments = updateEnvironments(id,
            label,
            category,
            priority);
        res.status(200).send(updateEnvitonments);
    } catch (error) {
        res.status(500).send(`Error PUT / : ${error.message}`);
    }
});

app.delete('/:id', (req, res) => {
    try {
        const {
            id
        } = req.params;
        const environments = deleteEnvironment(id);
        res.status(200).send(environments);
    } catch (error) {
        res.status(500).send(`Error DELETE /:id : ${error.message}`);
    }
});

app.patch('/:id', (req, res) => {
    const { id } = req.params;
    const environment = patchEnvironment(id, req.body);
    res.status(200).send(environment);
});

module.exports = app;