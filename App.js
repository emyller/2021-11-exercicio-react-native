import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from '@react-navigation/stack';
import axios from "axios";
import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { Image, Button, StyleSheet, Text, View } from 'react-native';
import { TextInput } from "react-native-gesture-handler";

const Stack = createStackNavigator();

function ListaFilmes(props) {
  var [filmes, setFilmes] = useState(null);
  var [requisicaoConcluida, setRequisicaoConcluida] = useState(false);

  if (! requisicaoConcluida) {
    axios.get('https://sujeitoprogramador.com/r-api/?api=filmes').then(function (resposta) {
      console.log(resposta.data);
      setFilmes(resposta.data);
      setRequisicaoConcluida(true);
    });
  }

  return (
    <View>
      <Text>Lista de filmes</Text>
      {filmes && filmes.map(function (filme, i) {
        return (
          <View key={i}>
            <Text>Filme: {filme.nome}</Text>
            <Image source={{ uri: filme.foto }} style={{width: 100, height: 100}} />
            <Button title="Ver detalhes" onPress={function () {
              props.navigation.navigate('Detalhes do filme', {
                sinopse: filme.sinopse,
              });
            }} />
          </View>
        );
      })}
    </View>
  )
}

function DetalhesFilme(props) {
  console.log(props);
  return (
    <View>
      <Text style={{ fontWeight: 'bold' }}>Sinopse:</Text>
      <Text>{props.route.params.sinopse}</Text>
    </View>
  )
}

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Lista de filmes" component={ListaFilmes} />
        <Stack.Screen name="Detalhes do filme" component={DetalhesFilme} />
      </Stack.Navigator>
    </NavigationContainer>
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
