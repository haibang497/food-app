import React, { Component } from "react";
import { Text } from "react-native";
import { Card, Button, Icon } from "react-native-elements";
import * as Animatable from "react-native-animatable";
import * as MailComposer from "expo-mail-composer";

class Contact extends Component {
  render() {
    return (
      <Animatable.View animation="fadeInDown" duration={2000} delay={1000}>
        <Card>
          <Card.Title>Quán Số 68 - Cơm Tấm Sài Gòn</Card.Title>
          <Card.Divider />
          <Text style={{ margin: 10 }}>12A/3 Đường Song Hành</Text>
          <Text style={{ margin: 10 }}>Phường Trung Mỹ Tây</Text>
          <Text style={{ margin: 10 }}>Quận 12 TPHCM</Text>
          <Text style={{ margin: 10 }}>Sdt: 034924343</Text>
          <Text style={{ margin: 10 }}>Facebook: Quán 68 - Cơm Tấm Sài Gòn</Text>
          <Text style={{ margin: 10 }}>Now/Grabfood: Quán 68 - Cơm Tấm Sài Gòn</Text>
          <Button
            title=" Phản Hồi"
            buttonStyle={{ backgroundColor: "#00802b" }}
            icon={<Icon name="envelope-o" type="font-awesome" color="white" />}
            onPress={this.sendMail}
          />
        </Card>
      </Animatable.View>
    );
  }
  sendMail() {
    MailComposer.composeAsync({
      recipients: ['phanngockimcuong1111@gmail.com'],
      subject: 'Đặt Cơm Tấm',
      body: 'Xin chào, tôi muốn đặt cơm:'
    });
  }
}
export default Contact;
