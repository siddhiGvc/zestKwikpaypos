module.exports = {
    up: (queryInterface, Sequelize) => queryInterface.createTable('TrafficMacMapping', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      UID: {
        
        type: Sequelize.STRING,
      },

      MacID: {
        
        type: Sequelize.STRING,
      },
      Location: {
        
        type: Sequelize.STRING,
      },
      City: {
        
        type: Sequelize.STRING,
      },
      SocketNumber: {
        
        type: Sequelize.STRING,
      },
    
      V1: {
        type: Sequelize.STRING,
      },
      V2: {
        type: Sequelize.STRING,
      },
      V3: {
        type: Sequelize.STRING,
      },
      V4: {
        type: Sequelize.STRING,
      },
      V5: {
        type: Sequelize.STRING,
      },
      V6: {
        type: Sequelize.STRING,
      },
      V7: {
        type: Sequelize.STRING,
      },
      lastHeartBeatTime:{
        type:Sequelize.DATE,
        allowNull:false
      },
    
      FotaMessage:{
        type:Sequelize.STRING,
       
      },
      RstMessage:{
        type:Sequelize.STRING,
        
      },
    
      FWoutput:{
        type:Sequelize.STRING,
        
      },
    
      FotaURLoutput:{
        type:Sequelize.STRING,
      
      },
      URLoutput:{
        type:Sequelize.STRING,
        
      },
     
     
      HBToutput:{
        type:Sequelize.STRING,
        
      },
      SIPoutput:{
        type:Sequelize.STRING,
        
      },
      SSIDoutput:{
        type:Sequelize.STRING,
        
      },
      SSIDmessage:{
        type:Sequelize.STRING,
        
      },
      PWDoutput:{
        type:Sequelize.STRING,
        
      },
      SSID1output:{
        type:Sequelize.STRING,
        
      },
      PWD1output:{
        type:Sequelize.STRING,
        
      },
   
      SNoutput:{
        type:Sequelize.STRING,
        
      },
      SNmessage:{
        type:Sequelize.STRING,
        
      },
      ERASEoutput:{
        type:Sequelize.STRING,
        
      },
     
      ERASEmessage:{
        type:Sequelize.STRING,
        
      },
     
      SIPmessage:{
        type:Sequelize.STRING,
        
      },
      Loutput:{
        type:Sequelize.STRING,
        
      },

    
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    }),
    down: (queryInterface, Sequelize) => queryInterface.dropTable('TrafficMacMapping'),
  };





