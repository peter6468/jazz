import React, { Component } from 'react';
import './App.css';
import FriendCard from './Components/FriendCard';
import Nav from './Components/Nav';
import Title from './Components/Title';
import Wrapper from './Components/Wrapper';
import friends from './friends.json';
import Container from './Container';
import Column from './Column';
import Row from './Row';


function shuffleFriends(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

class App extends Component {
      state = {
        friends,
        currentScore: 0,
        topScore: 0,
        rightWrong: "",
        clicked: [],
      };
  
  handleClick = id => {
    if (this.state.clicked.indexOf(id) ===-1) {
      this.handleIncrement();
      this.setState({ clicked: this.state.clicked.concat(id) });
    } else {
      this.handleReset();
    }
  };

  handleIncrement = () => {
    const newScore =this.state.currentScore +1;
    this.setState({
      currentScore: newScore,
      rightWrong: ""
    });
    if (newScore >= this.state.topScore) {
      this.setState({ topScore: newScore});
    }
    else if (newScore === 12) {
      this.setState({ rightWrong: "You ROCK!!!"});
    }
    this.handleShuffle();
  };

  handleReset = () => {
    this.setState({
      currentScore:0,
      topScore: this.state.topScore,
      rightWrong: "Nope!:-(",
      clicked: []
    })
    this.handleShuffle();
  };

  handleShuffle = () => {
    let shuffledFriends =shuffleFriends(friends);
    this.setState({ friends: shuffledFriends });
  };

  
  render() {
    return (
      <Wrapper> 
        <Nav
          title="Giphy Clicky Game"
          rightWrong={this.state.rightWrong}
          score = {this.state.currentScore}
          topScore= {this.state.topScore}
          />

          <Title>Click on an image to earn points, but do not click on any more than once!!!</Title>
         
          <Container>
            <Row>
            {this.state.friends.map(friend => (
              <Column size ="md-3 sm-6">
                <FriendCard
                  key={friend.id}
                  id={friend.id}
                  image={friend.image}
                  handleClick={this.handleClick}
                  handleIncrement={this.handleIncrement}
                  handleReset={this.handleReset}
                  handleShuffle ={this.handleShuffle}
                />
              </Column>
              ))}
           </Row>
          </Container>
      </Wrapper> 
    );
  }
}

export default App;