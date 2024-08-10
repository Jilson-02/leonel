import { categoriaModel } from '../model/categoriaModel.js'; // Asegúrate de que esta ruta y nombre sean correctos

// Crear una nueva categoría
export const createCategoria = async (req, res) => {
    const {categoria}  = req.body;

    try {
        if (!categoria) {
            res.redirect('/categorias')
        
        }
        
        const nuevaCategoria = await categoriaModel.create({
            categoria: categoria,
        });
        res.redirect('/categorias')


    } catch (error) {
        res.status(500).json({ message: 'hello' });
    }
};

// Actualizar una categoría existente
export const updateCategoria = async (req, res) => {
    try {
        const id = req.params.id;
        const { categoria } = req.body;

        if(!categoria){
            res.redirect('/categorias')
        }

        const categoriaU = await categoriaModel.findByPk(id);
        if (!categoriaU) {
            res.redirect('/categorias')
        }else{
            categoriaU.set({
                categoria: categoria
            });
    
            categoriaU.save(); 
    
            res.redirect('/categorias')
        }

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Eliminar una categoría existente
export const deleteCategoria = async (req, res) => {
    try {
        const id = req.params.id;

        const categoria = await categoriaModel.findByPk(id);
        if (!categoria) {
            res.redirect('/categorias')
        }else{
            categoria.set({
                status: true
            });
    
            categoria.save(); 
            res.redirect('/categorias')

        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
