import express from 'express';
import { 
    createReceta, 
    updateReceta, 
    deleteReceta,
    filtrarReceta 
} from '../controller/recetaController.js';
import {recetaModel} from '../model/recetaModel.js'
import { where } from 'sequelize';
import { categoriaModel } from '../model/categoriaModel.js';

const router = express.Router();

// Ruta para mostrar las recetas 
router.get('/', async (req, res)=>{
    const recetas = await recetaModel.findAll({
        where: {status: false},
        include: {
            model: categoriaModel,
            as: 'enlace',
            attributes: ['categoria']
        }
    });
    
    const categorias = await categoriaModel.findAll({
        where: {status:false}
    });
    res.render('receta',  {recetas, categorias})
  })

router.get('/updateR/:id', async(req, res)=> {
    const id = req.params.id;
    const capturado = await recetaModel.findByPk(id);
    const categorias = await categoriaModel.findAll({
        where:{status: false}
    });


    res.render('updateR', {capturado: capturado, categorias: categorias})
})

// Crear, actualizar y eliminar recetas
router.post('/createReceta', createReceta); // Crear una nueva receta
router.post('/updateReceta/:id', updateReceta); // Actualizar una receta existente
router.get('/deleteR/:id', deleteReceta); // Eliminar una receta existente
router.get('/recetas',filtrarReceta);

export const recetaRoute=router;

