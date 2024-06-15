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
           
          },
          RstMessage:{
            type:DataTypes.STRING,
            
          },
          Voutput:{
            type:DataTypes.STRING,
            
          },
          TCoutput:{
            type:DataTypes.STRING,
            
          },
          FWoutput:{
            type:DataTypes.STRING,
            
          },
          TVoutput:{
            type:DataTypes.STRING,
            
          },
          FotaURLoutput:{
            type:DataTypes.STRING,
          
          },
          URLoutput:{
            type:DataTypes.STRING,
            
          },
          Coutput:{
            type:DataTypes.STRING,
            
          },
          Soutput:{
            type:DataTypes.STRING,
            
          },
          HBToutput:{
            type:DataTypes.STRING,
            
          },
          SIPoutput:{
            type:DataTypes.STRING,
            
          },
          SSIDoutput:{
            type:DataTypes.STRING,
            
          },
          PWDoutput:{
            type:DataTypes.STRING,
            
          },
          SSID1output:{
            type:DataTypes.STRING,
            
          },
          PWD1output:{
            type:DataTypes.STRING,
            
          },
          CAoutput:{
            type:DataTypes.STRING,
            
          },
          CAmessage:{
            type:DataTypes.STRING,
            
          },
          RPoutput:{
            type:DataTypes.STRING,
            
          },
          Color:{
            type:DataTypes.STRING,
            
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