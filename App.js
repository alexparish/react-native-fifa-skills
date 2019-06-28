/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import { Alert, Platform, StyleSheet, Text, TextInput, View, Button, Image} from 'react-native';
import AwesomeButton from 'react-native-really-awesome-button';
import * as Progress from 'react-native-progress';

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
  android:
    'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

const fetchPlayer = async (name) => {
  return await fetch(`https://www.easports.com/fifa/ultimate-team/api/fut/item?name=${name}`)
    .then((response) => response.json())
    .then((responseJson) => {
      return responseJson.items[0];
    })
    .catch((error) => {
      console.error(error);
    })
}


const PlayerCard = ({ player }) => {
  return (
    <View>
      <View style={{flexDirection:"row", justifyContent: 'center'}}>
        {player.headshot && 
          <Image
                style={{width: 50, height: 50}}
                source={{uri: player.headshot.imgUrl}}
          />
        }
        {player.club.imageUrls.light.large && 
          <Image
                style={{width: 50, height: 50}}
                source={{uri: player.club.imageUrls.light.large}}
          />
        }
        {player.nation.imageUrls.large && 
          <Image
                style={{width: 50, height: 50}}
                source={{uri: player.nation.imageUrls.large}}
          />
        }
      </View>
      {player.name && 
        <Text>{player.name}</Text>
      }
      {player.rating &&
        <View> 
          <Text>Rating: {player.rating}</Text>
          <Progress.Bar progress={player.rating / 100} width={200} />
        </View>
      }
    </View>
  )
};

type Props = {};
export default class App extends Component<Props> {
  constructor(props) {
    super(props);
    this.state = {
      player: null,
      nameInput: ''
    }
  }
  render() {
    return (
      <View style={{ flex: 1, alignItems: "center", marginTop: 100 }}>
        <Text style={{ fontSize: 40 }}>FIFA Player Ratings</Text>

        <Text>Enter player name:</Text>
        <TextInput
        style={{height: 40, width: 200, borderColor: 'gray', borderWidth: 1, textAlign: 'center'}}
        autoCorrect={false}
        onChangeText={async (text) => { 
          this.setState({nameInput: text});
          if (text) {
            const player = await fetchPlayer(this.state.nameInput);
            console.log(player);
            this.setState({
              player
            });
          } else {
            this.setState({
              player: null
            })
          }
        }}
        value={this.state.nameInput}
        />
        {this.state.player &&
          <PlayerCard player={this.state.player} />
        }
        {/* <View style={{width: 100, height: 100, backgroundColor: 'skyblue'}} />
        <View style={{width: 150, height: 150, backgroundColor: 'steelblue'}} /> */}

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
