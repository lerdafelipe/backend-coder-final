const express = require('express');
//Router
const router = express.Router();


router.get('/', (req, res) => {
    res.json({
        Argumentos_de_entrada: process.argv,
        Path: process.execPath,
        plataforma: process.platform,
        id: process.pid,
        node_version: process.version,
        carpeta: process.cwd(),
        uso_memoria: process.memoryUsage(),
        numProcess: require('os').cpus().length
    })
});

module.exports = router;