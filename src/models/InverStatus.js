'use strict';
module.exports = (sequelize, DataTypes) => {
  const InverterStaus = sequelize.define('InverterStaus', {
    Junction:DataTypes.STRING,
    ACV:DataTypes.STRING,
    ACI:DataTypes.STRING,
    DCV:DataTypes.STRING,
    DCI:DataTypes.STRING,


   
  }, {
    tableName: 'InverterStaus'
  });
  InverterStaus.associate = function(models) {
    // associations can be defined here
  };
  return InverterStaus;
};