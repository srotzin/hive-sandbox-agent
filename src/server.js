'use strict';
const express=require('express');const cors=require('cors');const app=express();const PORT=process.env.PORT||3033;
app.use(cors());app.use(express.json());app.use('/',require('./routes/health'));app.use('/',require('./routes/sandbox'));
app.get('/',(_,r)=>r.json({service:'hive-sandbox-agent',version:'1.0.0',description:'Developer sandbox — safe testing environment, mock data, API playground, integration testing',endpoints:{execute:'POST /v1/sandbox/execute',record:'GET /v1/sandbox/record/:id',stats:'GET /v1/sandbox/stats',records:'GET /v1/sandbox/records',health:'GET /health',pulse:'GET /.well-known/hive-pulse.json',ai:'GET /.well-known/ai.json'}}));
const hc=require('./services/hive-client');
app.listen(PORT,async()=>{console.log(`[hive-sandbox-agent] Listening on port ${PORT}`);try{await hc.registerWithHiveTrust()}catch(e){}try{await hc.registerWithHiveGate()}catch(e){}});
module.exports=app;
