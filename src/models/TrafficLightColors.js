'use strict';
module.exports = (sequelize, DataTypes) => {
  const TrafficLightColors = sequelize.define('TrafficLightColors', {
    Junction:DataTypes.STRING,
    ACV:DataTypes.STRING,
    ACI:DataTypes.STRING,
    DCV:DataTypes.STRING,
    DCI:DataTypes.STRING,


   
  }, {
    tableName: 'TrafficLightColors'
  });
  TrafficLightColors.associate = function(models) {
    // associations can be defined here
  };
  return TrafficLightColors;
};