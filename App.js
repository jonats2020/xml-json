import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { Button, SafeAreaView, StyleSheet, Text, TextInput, View } from 'react-native';
// import PouchDB from 'pouchdb-react-native';
// import find from 'pouchdb-find';
// import rel from 'relational-pouch';
import { DBProvider } from './DBProvider';
import Main from './Main';

// PouchDB
//   .plugin(find)
//   .plugin(rel);

// import {
//   getAllAllergyAgent,
//   getAllData,
//   getAllDrugs,
//   getAllDrugsLocal,
//   getClinicalContent,
//   refreshDB,
// } from './pepid';

export default function App() {

  // const [drugs, setdrugs] = useState();

  // const getAllDrugs = async () => await getAllDrugsLocal();

  // useEffect(() => {
  //   setdrugs(getAllDrugs());
  // }, [])


  // useEffect(() => {
  //   async function getData() {
  //     refreshDB();
  //   }
  //   getData();
  // }, []);

  // if (drugs == null) return <SafeAreaView><Text>Loading...</Text></SafeAreaView>

  // console.log(drugs);

  // const [remoteDb, setremoteDb] = useState(null);
  // const [dbName, setDbName] = useState('');

  // const REMOTE = 'http://admin:0000@178.128.210.242:5981/db_ust_123456'

  // useEffect(() => {
  //   setremoteDb(new PouchDB(REMOTE + dbName));
  // }, [])

  // useEffect(() => {
  //   if (remoteDb === null) return;

  //   remoteDb.setSchema([
  //     {singular: 'user_doctor', plural: 'user_doctors'},
  // {singular: 'appointment', plural: 'appointments'},
  // {singular: 'patient', plural: 'patients'}
  //   ]);
  // }, [remoteDb])

  // const addNewData = () => {
  //   if (remoteDb === null) return

  //   remoteDb.rel.save('user_doctor', {
  //     name: 'test'
  //   })
  //   remoteDb.rel.save('user_doctor', {
  //     name: 'test2'
  //   })
  //   remoteDb.rel.save('appointment', {
  //     time: '9:00am'
  //   })
  //   remoteDb.rel.save('patient', {
  //     details: 'test'
  //   })
  // }

  // const findData = async () => {
  //   if (remoteDb === null) return

  //   const result = await remoteDb.rel.find('patients');
  //   console.log(result);
  // }
  
  // console.log(remoteDb)

  return (
    <DBProvider>
      <Main />
    </DBProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
