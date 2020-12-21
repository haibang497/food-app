// redux
import { connect } from "react-redux";
import { postFavorite, postComment, postCart } from "../redux/ActionCreator";

const mapStateToProps = (state) => {
  return {
    dishes: state.dishes,
    comments: state.comments,
    favorites: state.favorites,
    carts: state.carts,
  };
};

const mapDispatchToProps = (dispatch) => ({
  postFavorite: (dishId) => dispatch(postFavorite(dishId)),
  postComment: (dishId, rating, author, comment) =>
    dispatch(postComment(dishId, rating, author, comment)),
  postCart: (dishId) => dispatch(postCart(dishId)),
});

import React, { Component } from "react";
import {
  View,
  Text,
  ScrollView,
  FlatList,
  StyleSheet,
  Modal,
  Button,
  LogBox,
  PanResponder,
  Alert,
} from "react-native";
import { Card, Image, Icon, Input, Rating } from "react-native-elements";
import * as Animatable from "react-native-animatable";
import { baseUrl } from "../shared/baseUrl";
import { dishes } from "../redux/dishes";

function RenderDish(props) {
  const recognizeDrag = ({ moveX, moveY, dx, dy }) => {
    if (dx < -200) return true; // right to left
    return false;
  };

  const recognizeComment = ({ dx }) => {
    if (dx > 200) return true; // Left to right
    return false;
  };

  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: (e, gestureState) => {
      return true;
    },
    onPanResponderEnd: (e, gestureState) => {
      if (recognizeDrag(gestureState)) {
        Alert.alert(
          "Thêm vào yêu thích",
          "Bạn có muố thêm món  " + dish.name + " vào danh sách món yêu thích?",
          [
            {
              text: "Cancel",
              onPress: () => {
                /* nothing */
              },
            },
            {
              text: "OK",
              onPress: () =>
                props.favorite ? alert("Đã thêm món này vào yêu thích") : props.onPress(),
            },
          ],
          { cancelable: false }
        );
      } else if (recognizeComment(gestureState)) {
        props.onPressAddComment();
      }
      return true;
    },
  });

  const dish = props.dish;
  if (dish != null) {
    return (
      <Card {...panResponder.panHandlers}>
        <Image
          source={{ uri: baseUrl + dish.image }}
          style={{
            width: "100%",
            height: 100,
            flexGrow: 1,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Card.FeaturedTitle>{dish.name}</Card.FeaturedTitle>
        </Image>
        <Text style={{ margin: 10 }}>{dish.description}</Text>
        <View style={{ flexDirection: "row", justifyContent: "center" }}>
          <Icon
            raised
            reverse
            name={props.favorite ? "heart" : "heart-o"}
            type="font-awesome"
            color="#f50"
            onPress={() =>
              props.favorite ? alert("Đã thêm món này vào yêu thích") : props.onPress()
            }
          />
          <Icon
            raised
            reverse
            name="pencil"
            type="font-awesome"
            color="#f50"
            onPress={props.onPressAddComment}
          />
          <Icon
            raised
            reverse
            name={props.cart ? "shopping-cart" : "shopping-cart"}
            type="font-awesome"
            color="#f50"
            onPress={() =>
              props.cart ? alert("Món này đã nằm trong giỏ hàng của bạn") : props.onPressAddToCart()
            }
          />
        </View>
      </Card>
    );
  }
  return <View />;
}

function RenderComments(props) {
  const comments = props.comments;
  return (
    <Card>
      <Card.Title>Comments</Card.Title>
      <FlatList
        data={comments}
        renderItem={renderCommentItem}
        keyExtractor={(item) => item.id.toString()}
      />
    </Card>
  );
}

const renderCommentItem = ({ item, index }) => {
  return (
    <View key={index} style={{ margin: 10 }}>
      <Text style={{ fontSize: 14 }}>{item.comment}</Text>
      <Rating
        imageSize={15}
        readonly
        startingValue={item.rating}
        style={{ alignItems: "flex-start" }}
      />
      <Text style={{ fontSize: 12 }}>
        {"-- " + item.author + ", " + item.date}{" "}
      </Text>
    </View>
  );
};

class Dishdetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rating: null,
      author: "",
      comment: "",
      showModal: false,
    };
    LogBox.ignoreLogs(["VirtualizedLists should never be nested"]);
  }
  static navigationOptions = {
    title: "Dish Details",
  };

  render() {
    const dishId = parseInt(this.props.route.params.dishId);
    return (
      <ScrollView>
        <Animatable.View animation="fadeInDown" duration={2000} delay={1000}>
          <RenderDish
            dish={this.props.dishes.dishes[dishId]}
            favorite={this.props.favorites.some((el) => el === dishId)}
            onPress={() => this.markFavorite(dishId)}
            onPressAddComment={this.toggleModal}
            cart={this.props.carts.some((el) => el === dishId)}
            onPressAddToCart={()=>this.addToCart(dishId)}
          />
        </Animatable.View>
        <Animatable.View animation="fadeInUp" duration={2000} delay={1000}>
          <RenderComments
            comments={this.props.comments.comments.filter(
              (comment) => comment.dishId === dishId
            )}
          />
        </Animatable.View>
        <Modal
          animationType={"slide"}
          transparent={false}
          visible={this.state.showModal}
          onDismiss={() => this.toggleModal()}
          onRequestClose={() => this.toggleModal()}
        >
          <View style={styles.modal}>
            <Rating
              imageSize={30}
              startingValue={5}
              showRating
              onFinishRating={this.ratingCompleted}
              style={{ paddingVertical: 10 }}
            />
            <Input
              placeholder="Author"
              onChangeText={this.handleAuthorInput}
              leftIcon={{ type: "font-awesome", name: "user-o" }}
            />
            <Input
              placeholder="Comment"
              onChangeText={this.handleCommentInput}
              leftIcon={{ type: "font-awesome", name: "comment-o" }}
            />
            <View style={{ margin: 10 }}>
              <Button
                onPress={() => {
                  this.handleComment();
                  this.resetForm();
                }}
                color="#00802b"
                title="Submit"
              />
            </View>
            <View style={{ margin: 10 }}>
              <Button
                onPress={() => {
                  this.toggleModal();
                  this.resetForm();
                }}
                color="gray"
                title="Cancel"
              />
            </View>
          </View>
        </Modal>
      </ScrollView>
    );
  }

  toggleModal = () => {
    this.setState({ showModal: !this.state.showModal });
  };

  handleReservation() {
    console.log(JSON.stringify(this.state));
    this.toggleModal();
  }

  ratingCompleted = (rating) => {
    this.setState({ rating });
  };

  handleAuthorInput = (author) => {
    this.setState({ author });
  };

  handleCommentInput = (comment) => {
    this.setState({ comment });
  };

  resetForm() {
    this.setState({
      rating: null,
      author: "",
      comment: "",
    });
  }

  handleComment() {
    const { rating, author, comment } = this.state;
    const dishId = parseInt(this.props.route.params.dishId);

    this.toggleModal();
    this.props.postComment(dishId, rating, author, comment);
  }

  markFavorite(dishId) {
    this.props.postFavorite(dishId);
  }

  addToCart(dishId) {
    this.props.postCart(dishId);
  }
}

const styles = StyleSheet.create({
  icons: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
    flexDirection: "row",
  },
  formRow: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
    flexDirection: "row",
    margin: 20,
  },
  formLabel: {
    fontSize: 18,
    flex: 2,
  },
  formItem: {
    flex: 1,
  },
  modal: {
    justifyContent: "center",
    margin: 20,
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: "bold",
    backgroundColor: "#00802b",
    textAlign: "center",
    color: "white",
    marginBottom: 20,
  },
  modalText: {
    fontSize: 18,
    margin: 10,
  },
});
export default connect(mapStateToProps, mapDispatchToProps)(Dishdetail);
