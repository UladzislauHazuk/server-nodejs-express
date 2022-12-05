const express = require('express');
const bodyParser = require("body-parser");
const {
    Environment
} = require('./services/environment.services');

class App {
    constructor() {
        this.app = express();
        this.environment = new Environment();
        this.middleware();
        this.routes();
    }

    middleware() {
        this.app.use(bodyParser.json());
    }

    routes() {
        this.app.get('/', (req, res) => {
            try {
                res.status(200).send(this.environment.getEnvironment());
            } catch (error) {
                res.status(500).send(`Error GET / : ${error.message}`);
            }
        });

        this.app.get('/:id', (req, res) => {
            try {
                const {
                    id
                } = req.params;
                res.status(200).send(this.environment.getEnvironmentById());
            } catch (error) {
                res.status(500).send(`Error GET /:id : ${error.message}`);
            }
        });

        this.app.post('/', (req, res) => {
            try {
                const {
                    label,
                    category,
                    priority
                } = req.body;
                res.status(200).send(this.environment.createEnvironment(label,
                    category,
                    priority));
            } catch (error) {
                res.status(500).send(`Error POST / : ${error.message}`);
            }
        });

        this.app.put('/:id', (req, res) => {
            try {
                const {
                    id
                } = req.params;
                const {
                    label,
                    category,
                    priority
                } = req.body;
                res.status(200).send(this.environment.updateEnvironments(id,
                    label,
                    category,
                    priority));
            } catch (error) {
                res.status(500).send(`Error PUT / : ${error.message}`);
            }
        });

        this.app.delete('/:id', (req, res) => {
            try {
                const {
                    id
                } = req.params;
                res.status(200).send(this.environment.deleteEnvironment(id));
            } catch (error) {
                res.status(500).send(`Error DELETE /:id : ${error.message}`);
            }
        });

        this.app.patch('/:id', (req, res) => {
            try {
                const {
                    id
                } = req.params;
                res.status(200).send(this.environment.patchEnvironment(id, req.body));
            } catch (error) {
                res.status(500).send(`Error DELETE /:id : ${error.message}`);
            }
        });
    }
}

module.exports = App;