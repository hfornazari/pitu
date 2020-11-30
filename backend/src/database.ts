import  {Sequelize} from 'sequelize';

const sequelize = new Sequelize('pitu','pituuser','teste#123',{dialect:"mysql"});

export default sequelize;