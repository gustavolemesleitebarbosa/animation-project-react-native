import React from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {Animated} from 'react-native';
import {PanGestureHandler, state, State} from 'react-native-gesture-handler';

import Header from '~/components/Header';
import Tabs from '~/components/Tabs';
import Menu from '~/components/Menu';

import {
  Container,
  Content,
  Card,
  CardHeader,
  Title,
  Description,
  CardFooter,
  CardContent,
  Annotation,
} from './styles';

const Main = () => {
  let offset = 0;

  const translateY = new Animated.Value(0);

  const animatedEvent = Animated.event(
    [
      {
        nativeEvent: {
          translationY: translateY,
        },
      },
    ],
    {useNativeDriver: true},
  );

  function onHandlerStateChange(event) {
    let opened = false;

    const {translationY} = event.nativeEvent;
    if (event.nativeEvent.oldState === State.ACTIVE) {
      offset += translationY;

      translateY.setOffset(offset);
      translateY.setValue(0);
    }

    if (translationY >= 100) {
      opened = true;
    } else {
      translateY.setValue(offset);
      translateY.setOffset(0);
      offset = 0;
    }

    Animated.timing(translateY, {
      toValue: opened ? 380 : 0,
      duration: 200,
      useNativeDriver: true,
    }).start(() => {
      offset = opened ? 380 : 0;
      translateY.setOffset(offset);
      translateY.setValue(0);
    });
  }
  return (
    <Container>
      <Header />
      <Content>
        <Menu translateY={translateY} />

        <PanGestureHandler
          onGestureEvent={animatedEvent}
          onHandlerStateChange={onHandlerStateChange}>
          <Card
            style={{
              transform: [
                {
                  translateY: translateY.interpolate({
                    inputRange: [-350, 0, 380],
                    outputRange: [-50, 0, 380],
                    extrapolate: 'clamp',
                  }),
                },
              ],
            }}>
            <CardHeader>
              <Icon name="attach-money" size={28} color="#667" />
              <Icon name="visibility-off" size={28} color="#667" />
            </CardHeader>
            <CardContent>
              <Title>Saldo disponível </Title>
              <Description> R$ 197.611,65 </Description>
            </CardContent>
            <CardFooter>
              <Annotation>
                Transferência recebida de Gustavo Lemes Leite Barbosa
              </Annotation>
            </CardFooter>
          </Card>
        </PanGestureHandler>
      </Content>
      <Tabs translateY={translateY} />
    </Container>
  );
};

export default Main;
