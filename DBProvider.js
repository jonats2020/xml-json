import React, { createContext, useContext, useEffect, useState } from 'react'
import PouchDB from 'pouchdb-react-native';
import find from 'pouchdb-find';
import rel from 'relational-pouch';

PouchDB
  .plugin(find)
  .plugin(rel);

  const DBContext = createContext();

const DBProvider = ({ children }) => {
  const [localDb, setLocalDb] = useState(null);
  const [remoteDb, setRemoteDb] = useState(null);
  const [syncStatus, setSyncStatus] = useState('');
  const syncOptions = { live: true, retry: true };
  const remoteUrl = 'http://admin:0000@178.128.210.242:5981/'
  const schema = [
    {singular: 'user_doctor', plural: 'user_doctors'},
    {singular: 'appointment', plural: 'appointments'},
    {singular: 'patient', plural: 'patients'}
  ];

  useEffect(() => {
    let sync;
    if (localDb && remoteDb) {
      sync = localDb.sync(remoteDb, syncOptions)
      .on('paused', () => setSyncStatus('paused'))
      .on('active', () => setSyncStatus('active'));
    }

    // return () => {
    //   sync.cancel();
    // }
  }, [localDb, remoteDb])

  const actions = {
    initializeDb: (dbName) => {
      const dbLocal = new PouchDB(dbName);
      const dbRemote = new PouchDB(remoteUrl + dbName);
  
      setupSchema(dbLocal);
      setupSchema(dbRemote);
      setLocalDb(dbLocal)
      setRemoteDb(dbRemote)
    },
    create: (type, data) => localDb.rel.save(type, data)
  }

  const setupSchema = (database) => {
    database.setSchema(schema);
  }

  return (
    <DBContext.Provider value={{syncStatus, actions}}>
      {children}
    </DBContext.Provider>
  )
}

const useDB = () => {
  const context = useContext(DBContext);

  if (!context) {
    throw new Error('useDB must be used within an DBProvider');
  }

  return context;
}

export {DBProvider, DBContext, useDB}