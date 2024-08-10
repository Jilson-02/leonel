import express from 'express';
import { createCategoria, updateCategoria, deleteCategoria } from '../controller/categoriaController.js';

import { categoriaModel } from '../model/categoriaModel.js';

const router = express.Router();

// Ruta para mostrar la vista de categorías
router.get('/categorias', async (req, res) => {

    const categorias = await categoriaModel.findAll({
        where:{
        'status': false
        }
    });
    res.render('categoria', { categorias: categorias });
    
});

router.get('/updateP/:id', (req, res)=> {
    const id = req.params.id;

    res.render('updateC', {id: id})
})

// Otras rutas
router.post('/create', createCategoria);
router.post('/update/:id', updateCategoria);
router.get('/delete/:id', deleteCategoria);

export const categoriaRoute=router;
