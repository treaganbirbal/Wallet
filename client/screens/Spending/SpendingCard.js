import React from "react";
import {
  Container,
  Header,
  Content,
  Icon,
  Button,
  Text,
  Body,
  Form,
  Picker,
  Card,
  CardItem,
} from "native-base";

function SpendingCard(props) {
  const { index, item } = props;
  return (
    <Card key={index} style={{ borderRadius: 8 }}>
      <CardItem style={{ borderRadius: 8 }}>
        <Body>
          <Text style={{ fontWeight: "500", borderRadius: 20 }}>
            {item.name}
          </Text>
          <Text style={{ alignSelf: "flex-end" }}>
            <Text>{item.date}</Text>
          </Text>
          {item.amount < 0 ? (
            <Text style={{ color: "green", fontWeight: "bold" }}>
              ${item.amount * -1}
            </Text>
          ) : (
            <Text style={{ color: "#D75452", fontWeight: "bold" }}>
              -${"" + item.amount}
            </Text>
          )}
        </Body>
      </CardItem>
    </Card>
  );
}

export default SpendingCard;
