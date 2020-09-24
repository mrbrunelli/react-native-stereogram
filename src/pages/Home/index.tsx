import React from 'react'
import { View, Text, StyleSheet, ActivityIndicator, ScrollView } from 'react-native'
import Icon from 'react-native-vector-icons/Feather'
import { useNavigation } from '@react-navigation/native'
import axios from 'axios'

interface Estereograma {
  cod: string
  nome: string
  img: string
}

const Home = (): React.ReactElement => {
  const navigation = useNavigation()
  const [estereogramas, setEstereogramas] = React.useState<Estereograma[]>([])
  const [isLoading, setIsLoading] = React.useState<boolean>(false)
  const goToDetail = (img: string, nome: string): void => {
    navigation.navigate('Detail', {
      img: img,
      nome: nome
    })
  }
  React.useEffect(() => {
    setIsLoading(true)
    axios.get<Estereograma[]>('http://www.marcosdiasvendramini.com.br/Get/Estereogramas.aspx')
      .then(res => setEstereogramas(res.data))
      .then(() => setIsLoading(false))
      .catch(() => null)
  },[])
  return (
    <View style={styles.container}>
      {isLoading
        ? <ActivityIndicator color="blue" size="large"/>
        : (
          <ScrollView>
            <View style={styles.box}>
              {estereogramas.map(e => (
                <View
                  key={String(e.cod)}
                  style={styles.boxItem}
                >
                  <Text>{e.nome}</Text>
                  <View style={styles.icon}>
                    <Text>Detalhes</Text>
                    <Icon
                      onPress={() => goToDetail(e.img, e.nome)}
                      name="arrow-right"
                      size={22}
                      color="blue"
                    />
                  </View>
                </View>
              ))}
            </View>
          </ScrollView>
        )
      }
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  box: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    alignItems: 'center',
    margin: 20
  },
  boxItem: {
    width: 300,
    height: 100,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 5,
    padding: 10,
    borderRadius: 5,
    backgroundColor: '#fff'
  },
  icon: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 5
  }
})

export default Home
