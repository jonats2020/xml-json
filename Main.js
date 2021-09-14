import React, { useEffect } from 'react'
import { Button, SafeAreaView, StyleSheet, Text, View } from 'react-native'
import { useDB } from './DBProvider'

const Main = () => {

  const { syncStatus, actions } = useDB();

  useEffect(() => {
    actions.initializeDb('sample1');
  }, [])

  const addData = () => {
    actions.create('user_doctor', {
      name: 'test'
    })
    .then(response => console.log(response))
    .catch(error => console.log(response));
  }

  console.log(syncStatus)

  return (
    <SafeAreaView style={styles.container}>
      <Text>{syncStatus}</Text>
      <Button title='add data' onPress={addData}/>
    </SafeAreaView>
  )
}

export default Main

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
})


