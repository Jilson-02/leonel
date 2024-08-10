import { DataTypes } from "sequelize";
import { sequelize } from "../db/conexion.js";
import { categoriaModel } from "./categoriaModel.js";

export const recetaModel = sequelize.define("receta", {
    id: {
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
    },
    nombre: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    status:{
        type: DataTypes.BOOLEAN,
        defaultValue: false,
        allowNull: false,
    }
}, 
{
    timestamps: false
}
);

categoriaModel.hasMany(recetaModel, { as: 'enlace', foreignKey: "categoria_id" });
recetaModel.belongsTo(categoriaModel, {as: 'enlace', foreignKey: "categoria_id" });
