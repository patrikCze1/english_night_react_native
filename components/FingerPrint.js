import React, {useEffect, useState} from 'react';
import {StyleSheet, View, Button, Image, TextInput, Text} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import TouchID from 'react-native-touch-id';
import firestore from '@react-native-firebase/firestore';
import * as Keychain from 'react-native-keychain';

const FingerPrint = props => {
  const [bioType, setBioType] = useState(null);
  const [creditialsLoaded, setCreditialsLoaded] = useState(false);
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [idShowed, setIdShowed] = useState(false);
  const [id, setId] = useState('');
  const [codes, setCodes] = useState([]);

  const navigation = useNavigation();
  const iconPath = require('../static/images/icon.png');
  
  useEffect(() => {
    const credentials = loadCredentials()
    .then(credentials => {return credentials});
    
    if (creditialsLoaded) {
      authWithTouchId()
    }

    TouchID.isSupported()
      .then(bioType => {
        if (bioType === 'FaceID') {
          setBioType('FaceID');
        } else {
          setBioType('TouchID');
        }
      })
      .catch(error => {
        setBioType(null);
      });

  });

  async function loadCredentials() {
    // check if user was loged here
    const credentials = await Keychain.getGenericPassword();
    if (credentials) {
      setCreditialsLoaded(true);
      return credentials;

    } else {
      await Keychain.resetGenericPassword();
      console.log('No credentials stored');
    }
    return credentials;
  }

  async function authWithTouchId() {
    const credentials = await loadCredentials()
    .then(res => {return res});

    const userInfo = await loadUserInfo(credentials.username, credentials.password)
      .then(userInfo => {
        return {
          userId: userInfo.userId,
          name: userInfo.name,
          codes: userInfo.codes,
        }
      })
      console.log(userInfo);
    const optionalConfigObject = {
      fallbackLabel: 'Show Passcode', // iOS (if empty, then label is hidden)
      //passcodeFallback: true,
    };
    console.log(credentials);

    if (!idShowed) {
      TouchID.authenticate(
        'to demo this react-native component',
        optionalConfigObject,
      )
        .then((success) => {
          setName(credentials.username);
          setPassword(credentials.password);

          navigation.navigate('Games', {userInfo});
        })
        .catch(error => {
          console.log(error);
        });

      setIdShowed(true);
    }
  }

  async function loadUserInfo(loginName = name, loginPass = password) {
    const lowerName = loginName.toLowerCase();
    console.log(lowerName)
    console.log(loginPass)//nic
    const res = await firestore()
      .collection('Users')
      .where('name', '==', lowerName)
      .where('password', '==', loginPass)
      .get()
      .then(function(querySnapshot) {
        //success
        if (querySnapshot.docs[0]) {
          
          return {
            userId: querySnapshot.docs[0].id,
            name: querySnapshot.docs[0]._data.name,
            codes: querySnapshot.docs[0]._data.codes,
          }
        } else {
          
          alert('wrong cred');
        }
      })
      .catch(function(error) {
        // new user
        console.log('login error');
      });

      console.log(res);
      return res;
  }

  async function login() {//with login btn
    const userInfo = await loadUserInfo()
    .then(userInfo => {
      return userInfo;
    })
    .catch(console.log);
    
    setUserCredentials(userInfo.name);
    console.log(userInfo)
    navigation.navigate('Games', {userInfo});
  }

  async function successLogin() {
    await loadUserInfo()
    .then(userInfo => {
      console.log(userInfo)
      navigation.navigate('Games', {userInfo});
    })
    .catch(console.log);
  }

  async function setUserCredentials(userName) {
    console.log('setting creditials 144 '+ userName + ' ' + password)
    await Keychain.setGenericPassword(userName, password);
  }

  function showTouchId() {
    setIdShowed(false);
    loadCredentials();
  }

  const loginText = 'Login with ' + bioType;

  return (
    <View>
      <View style={styles.imageCenter}>
        <Image source={iconPath} style={styles.image} />
      </View>

      <View style={styles.container}>
        <TextInput
          placeholder="Name"
          style={styles.input}
          name="name"
          onChangeText={value => setName(value)}
          value={name}
        />
        <TextInput
          placeholder="Password"
          style={styles.input}
          name="password"
          secureTextEntry={true}
          onChangeText={value => setPassword(value)}
          value={password}
        />

        <Button title="Login" onPress={() => login()} />
      </View>

      {bioType != null ? (
        creditialsLoaded ? (
          <Button title={loginText} onPress={showTouchId} />
        ) : (
          <Button title={loginText} disabled />
        )
      ) : (
        <Text />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  image: {
    borderRadius: 400 / 2,
  },
  imageCenter: {
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 15,
  },
  container: {
    margin: 20,
  },
  input: {
    marginBottom: 15,
    padding: 10,
    height: 50,
    borderColor: 'gray',
    borderRadius: 30,
    borderWidth: 1,
  },
});

export default FingerPrint;
