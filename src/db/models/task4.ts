import { DataTypes, Model, Optional } from "sequelize";
import sequelizeconnection from "../config";

interface StaffAttributes {
    staffId: number;
    Name: string;
    email: string;
    position: string;
}

export interface StaffInput extends Optional<StaffAttributes, 'staffId'> {}
export interface StaffOutput extends Required<StaffAttributes> {}

class Staff extends Model<StaffAttributes, StaffInput> implements StaffAttributes {
    public staffId!: number;
    public Name!: string;
    public email!: string;
    public position!: string;
    public readonly createdAt?: Date;
    public readonly updatedAt?: Date;
}

Staff.init(
    {
        staffId: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            unique: true,
            allowNull: false,
        },
        Name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        position: {
            type: DataTypes.STRING,
            allowNull: false
        },
    },
    {
        tableName: 'staff',
        timestamps: true,
        paranoid: true,
        sequelize: sequelizeconnection
    }
);

export default Staff;
