const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const router = Router();

const recipeRoute = require('./recipes');
const dietRoute = require('./diets');

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.use('/recetas', recipeRoute);
router.use('/dietas', dietRoute);

module.exports = router;
