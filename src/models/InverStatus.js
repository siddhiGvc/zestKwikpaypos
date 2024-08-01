'use strict';
module.exports = (sequelize, DataTypes) => {
  const InverterStaus = sequelize.define('InverterStatus', {
    Junction:DataTypes.STRING,
    ACV:DataTypes.STRING,
    ACI:DataTypes.STRING,
    DCV:DataTypes.STRING,
    DCI:DataTypes.STRING,


   
  }, {
    tableName: 'InverterStatus'
  });
  InverterStaus.associate = function(models) {
    // associations can be defined here
  };
  return InverterStaus;
};