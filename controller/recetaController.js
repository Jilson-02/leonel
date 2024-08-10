import { categoriaModel } from '../model/categoriaModel.js';
import { recetaModel } from '../model/recetaModel.js';

export const createReceta = async (req, res) => {
    try {
        const { nombre, categoria_id } = req.body;

        if (!nombre || !categoria_id) {
            res.redirect('/')
        }

        const newReceta = await recetaModel.create({ nombre:nombre, categoria_id: categoria_id });
        res.redirect('/')
    } catch (error) {
        console.error("Error al crear la receta:", error);
        res.status(500).json({ message: "Error al crear la receta" });
    }
};

export const updateReceta = async (req, res) => {
    try {
        const id = req.params.id;
        const { nombre, categoria_id } = req.body;

        if (!nombre || !categoria_id) {
            res.redirect('/')
        }

        const recetaU = await recetaModel.findByPk(id);
        if (!recetaU) {
            res.redirect('/')
        } else {
            recetaU.set({
                nombre: nombre,
                categoria_id: categoria_id
            });

            recetaU.save();

            res.redirect('/')
        }

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const deleteReceta = async (req, res) => {
    try {
        const id = req.params.id;

        const receta = await recetaModel.findByPk(id);
        if (!receta) {
            res.redirect('/')
        } else {
            receta.set({
                status: true
            });

            receta.save();
            res.redirect('/')
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const obtenerRecetasConCategorias = async (req, res) => {
    try {
        const categoriaId = req.query.categoria_id;

        const whereCondition = categoriaId ? { categoria_id: categoriaId, status: false } : { status: false };

        const recetasConCategorias = await recetaModel.findAll({
            where: whereCondition,
            include: {
                model: categoriaModel,
                as: 'enlace',
                attributes: ['categoria']
            }
        });

        const categorias = await categoriaModel.findAll();

        res.render('receta', { recetas: recetasConCategorias, categorias: categorias });
    } catch (error) {
        console.error('Error al obtener recetas con categorías:', error);
        res.status(500).json({ message: 'Error al obtener recetas con categorías' });
    }
};
