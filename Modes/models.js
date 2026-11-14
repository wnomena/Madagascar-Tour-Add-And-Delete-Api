const {Sequelize,Model,DataTypes,Deferrable} = require("sequelize")
const getenv = require("getenv")
const sequelize = new Sequelize(getenv("database").toString(),getenv("user").toString(),getenv("password"),{dialect : 'mysql',host : getenv("host")});
class Circuit extends Model {}
Circuit.init({
  id : {
    type : DataTypes.INTEGER,
    primaryKey : true,
    autoIncrement : true
  },
  title : {
    type : DataTypes.STRING(50),
    allowNull : true
  },
  subtitle : DataTypes.STRING(250),
  duration : DataTypes.STRING(250),
  difficulty : {
    type : DataTypes.INTEGER,
    defaultValue : 0,
    allowNull : false
  },
  price : {
    type : DataTypes.INTEGER,
    allowNull : false
  },
  image : {
    type : DataTypes.TEXT,
    allowNull : false
  },
  description : {
    type : DataTypes.TEXT,
    allowNull : false
  }
}
,{
  sequelize,
  modelName : "Circuit",
  tableName: "circuit",
  freezeTableName : false,
  timestamps : false
})
Circuit.getData = function () {
  
}

class Contact extends Model {}
Contact.init({
    id : {
    type : DataTypes.INTEGER,
    primaryKey : true,
    autoIncrement : true
  },
  name : {
    type : DataTypes.TEXT,
    allowNull : false
  },
  subject : DataTypes.STRING(250),
  body : {
    type : DataTypes.TEXT,
    allowNull : false
  },
  number : DataTypes.TEXT,
  begining : DataTypes.DATE,
  number_of_person : {
    type : DataTypes.INTEGER,
    defaultValue : 1
  },
  circuit_id : {
    type : DataTypes.INTEGER,
    references : {
      model : Circuit,
      key : "id",
      deferrable : Deferrable.INITIALLY_IMMEDIATE
    }
  },
  mail : {
    type : DataTypes.STRING(250),
    allowNull : false
  },
  total_price : {
    type: DataTypes.INTEGER,
    allowNull : false
  }
  ,
  Completed : {
    type : DataTypes.TINYINT,
    defaultValue : 1
  }
},{sequelize,
    modelName : 'Contact',
    tableName : "contact",
    freezeTableName : false,
    timestamps : false
  })

Contact.getData = function () {
  
}

class Equipement extends Model {}
Equipement.init({
    id : {
    type : DataTypes.INTEGER,
    primaryKey : true,
    autoIncrement : true
  },
  equipment : {
    type : DataTypes.TEXT,
    allowNull : false
  },
  circuit_id : {
    type : DataTypes.INTEGER,
    references : {
      model : Circuit,
      key : "id",
      deferrable : Deferrable.INITIALLY_IMMEDIATE
    }
  }
},{sequelize,
  modelName : "Equipement",
  tableName : "equipment_needed",
  freezeTableName : false,
  timestamps : false,
})

Equipement.getData = function () {
  
}

class Included extends Model {}
Included.init({
      id : {
    type : DataTypes.INTEGER,
    primaryKey : true,
    autoIncrement : true
  },
  content : {
    type : DataTypes.TEXT,
    allowNull : false
  }
  ,
  circuit_id : {
    type : DataTypes.INTEGER,
    references : {
      model : Circuit,
      key : "id",
      deferrable : Deferrable.INITIALLY_IMMEDIATE
    }
  }
},{sequelize,modelName : "Included",
  tableName : "included_in_price",
  timestamps : false
})

Included.getData = function () {
  
}

class Itineraire extends Model {}

Itineraire.init({
    id : {
    type : DataTypes.INTEGER,
    primaryKey : true,
    autoIncrement : true
  },
  place : {
    type : DataTypes.TEXT,
    allowNull : false
  },
  order_id : {
    type : DataTypes.TEXT,
    allowNull : false
  },
  circuit_id : {
    type : DataTypes.INTEGER,
    references : {
      model : Circuit,
      key : "id",
      deferrable : Deferrable.INITIALLY_IMMEDIATE
    }
  },
  description : {
    type : DataTypes.TEXT,
    allowNull : false
  },
  day : {
    type : DataTypes.INTEGER,
    allowNull : false
  }
},{sequelize,modelName : "Itineraire",
  tableName : "itinerary",
  timestamps : false
})

Itineraire.getData = function () {
  
}

class Adrenaline extends Model {}
Adrenaline.init({
      id : {
    type : DataTypes.INTEGER,
    primaryKey : true,
    autoIncrement : true
  },
  content : {
    type : DataTypes.TEXT,
    allowNull : false
  }
  ,
  circuit_id : {
    type : DataTypes.INTEGER,
    references : {
      model : Circuit,
      key : "id",
      deferrable : Deferrable.INITIALLY_IMMEDIATE
    }
  }
},{sequelize,modelName : "Adrenaline",
  tableName : "adrenaline",
  timestamps : false
})

Adrenaline.getData = function () {
  
}

//Les jointure
/*
Contat et Circuit
Equipement et circuit
Itineraire et circuit
Included et circuit */


Circuit.hasMany(Contact,{  foreignKey : {    name : "circuit_id",    allowNull : true,  },  onDelete : "CASCADE"})
Circuit.hasMany(Equipement,{foreignKey : { name : "circuit_id",allowNull : false},onDelete : "CASCADE"})
Circuit.hasMany(Included,{foreignKey : { name : "circuit_id",allowNull : false},onDelete : "CASCADE"})
Circuit.hasMany(Itineraire,{foreignKey : { name : "circuit_id",allowNull : false},onDelete : "CASCADE"})
Circuit.hasMany(Adrenaline,{foreignKey : { name : "circuit_id",allowNull : false },onDelete : "CASCADE"})
Equipement.belongsTo(Circuit,{foreignKey : {name : "circuit_id"}})
Included.belongsTo(Circuit,{foreignKey : {name : "circuit_id"}})
Contact.belongsTo(Circuit,{foreignKey : {name : "circuit_id"}})
Itineraire.belongsTo(Circuit,{foreignKey : {name : "circuit_id"}})
Adrenaline.belongsTo(Circuit,{foreignKey : {name : "circuit_id"}})

module.exports = {
  Circuit : Circuit,
  Contact : Contact,
  Included : Included,
  Itineraire : Itineraire,
  Equipement : Equipement,
  Adrenaline : Adrenaline,
  sequelize : sequelize
}
