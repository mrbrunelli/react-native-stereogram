import React from 'react'
import { View, Text, StyleSheet, ActivityIndicator, Image } from 'react-native'
import { useRoute } from '@react-navigation/native'
import axios from 'axios'

interface Params {
  img: string
  nome: string
}

const Detail = (): React.ReactElement => {
  const route = useRoute()
  const { img, nome } = route.params as Params
  const [isLoading, setIsLoading] = React.useState<boolean>(true)
  React.useEffect(() => {
    setTimeout(() => setIsLoading(false), 1000)
  },[])
  return (
    <View style={styles.container}>
      {isLoading
        ? <ActivityIndicator color="blue" size="large"/>
        : (
          <View style={styles.image}>
            <Text>{nome}</Text>
            <Image
              source={{
                uri: `http://www.marcosdiasvendramini.com.br/imgEstereograma/${img}`,
                width: 300,
                height: 300
              }}
              borderRadius={10}
            />
            <Text>{img}</Text>
          </View>
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
  image: {
    justifyContent: 'center',
    alignItems: 'center'
  }
})

export default Detail
