import { categoriaModel } from '../model/categoriaModel.js';
import { recetaModel } from '../model/recetaModel.js';


export const createReceta = async (req, res) => {
    try {
        const { nombre, categoria_id } = req.body;

        // Validar que se envíen todos los campos necesarios
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

// Editar una receta existente
export const updateReceta = async (req, res) => {
    try {
        const id = req.params.id;
        const {nombre, categoria_id } = req.body;

        if(!nombre || !categoria_id){
            res.redirect('/')
        }

        const recetaU = await recetaModel.findByPk(id);
        if (!recetaU) {
            res.redirect('/')
        }else{
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

// Eliminar una receta
export const deleteReceta = async (req, res) => {
    try {
        const id = req.params.id;

        const receta = await recetaModel.findByPk(id);
        if (!receta) {
            res.redirect('/')
        }else{
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

export const filtrarReceta = async (req, res) => {
    const { categoria_id } = req.query;

    try {
        // Obtener todas las categorías para mostrarlas en el filtro
        const categorias = await categoriaModel.findAll(); 

        let recetas = [];

        if (categoria_id) {
            // Buscar la categoría seleccionada
            //const categoriaSeleccionada = await categoriaModel.findOne({ where: { nombre: categoria } });

            //if (categoriaSeleccionada) {
                // Buscar las recetas que coinciden con la categoría seleccionada
                recetas = await recetaModel.findAll({
                    where: { categoria_id: categoria_id },
                    include: categoriaModel
                });
           // }
        } else {
            // Si no hay filtro, mostrar todas las recetas
            recetas = await recetaModel.findAll({
                include: categoriaModel
            });
        }

        // Pasar las recetas y categorías a la vista
        res.render('recetas', { recetas, categorias });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


export const FiltrarRecetas = async (req, res) => {
    try {
      const user = await recetaModel.findAll({where:{id:req.params.id}});
      if(!user){
        res.status(404).json({message: "user not found"});
      }
      res.status(200).json({user});
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };




