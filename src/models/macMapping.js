'use strict';



module.exports = (sequelize, DataTypes) => {
    const MacMapping = sequelize.define(
      'MacMapping',
      {
        UID: {
            type: DataTypes.STRING,
      
          },
        MacID: {
            type: DataTypes.STRING,
      
          },
          Location: {
            type: DataTypes.STRING,
      
          },

          City: {
            type: DataTypes.STRING,
      
          },
        SocketNumber: {
          type: DataTypes.STRING,
    
        },
        V1: {
            type: DataTypes.STRING,
          },
          V2: {
            type: DataTypes.STRING,
          },
          V3: {
            type: DataTypes.STRING,
          },
          V4: {
            type: DataTypes.STRING,
          },
          V5: {
            type: DataTypes.STRING,
          },
          V6: {
            type: DataTypes.STRING,
          },
          V7: {
            type: DataTypes.STRING,
          },
          C1: {
            type: DataTypes.STRING,
          },
          C2: {
            type: DataTypes.STRING,
          },
          C3: {
            type: DataTypes.STRING,
          },
          C4: {
            type: DataTypes.STRING,
          },
          C5: {
            type: DataTypes.STRING,
          },
          C6: {
            type: DataTypes.STRING,
          },
          C7: {
            type: DataTypes.STRING,
          },
          lastHeartBeatTime:{
            type:DataTypes.DATE,
            allowNull:false
          },
          INHinput:{
            type:DataTypes.INTEGER,
            allowNull:false
          },
          INHoutput:{
            type:DataTypes.INTEGER,
            allowNull:false
          },
          FotaMessage:{
            type:DataTypes.STRING,
            allowNull:false
          },
          RstMessage:{
            type:DataTypes.STRING,
            allowNull:false
          },
          Voutput:{
            type:DataTypes.STRING,
            allowNull:false
          },
          TCoutput:{
            type:DataTypes.STRING,
            allowNull:false
          }
         

         

      
      },
      {
        tableName: 'MacMapping'
      }
    
    );
    MacMapping.associate = function (models) {
      // associations can be defined here
    };
    return MacMapping;
  };