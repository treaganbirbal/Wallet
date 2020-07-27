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
import SpendingChart from "./Chart";
import SpendingCard from "./SpendingCard";
import { LineChart } from "react-native-chart-kit";
import { Dimensions, ScrollView } from "react-native";

import { connect } from "react-redux";
import { fetchTransactions } from "../../store/spending";
import { fetchAccounts } from "../../store/accounts";
import { ThemeConsumer } from "react-native-elements";

export class SpendingScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedAccount: this.props.accounts.data[0].name,
      loaded: false,
      currentAccount: "",
    };
    this.calculateNetTotal = this.calculateNetTotal.bind(this);
    this.calculateAccountTotal = this.calculateAccountTotal.bind(this);
    this.onHandleChange = this.onHandleChange.bind(this);
  }

  componentDidMount() {
    this.props.fetchAccounts(this.props.user.id);
    this.props.fetchTransactions(this.props.user.id);
    this.setState({ loaded: true });
  }

  onHandleChange(value) {
    this.setState({
      selectedAccount: value,
    });
  }

  calculateNetTotal(items) {
    let total = 0;
    items.forEach((item) => {
      total += item.available_balance;
    });
    return total;
  }

  calculateAccountTotal(item) {
    return item.available_balance;
  }

  render() {
    const accounts = this.props.accounts.data;
    const transactions = this.props.transactions;
    const acctInfo = accounts.filter((el) => {
      return el.name === this.state.selectedAccount;
    });
    let id = "";
    for (let i = 0; i < acctInfo.length; i++) {
      id = acctInfo[i].account_id;
    }
    const info = transactions
      .filter((account) => {
        return account.accountId === id;
      })
      .splice(0, 7);
    return (
      <Container>
        <Header
          iosBarStyle
          androidStatusBarColor
          style={{ backgroundColor: "#222831", height: 125 }}
        >
          <Body>
            <Text
              style={{
                color: "#D75452",
                alignSelf: "center",
                fontSize: 25,
                fontWeight: "bold",
              }}
            >
              {this.state.selectedAccount}
            </Text>
            <Text style={{ alignSelf: "center" }}>
              <Text style={{ fontSize: 20, color: "white" }}>
                Available Balance:{" "}
              </Text>
              <Text
                style={{ color: "#d3dbff", fontSize: 20, fontWeight: "bold" }}
              >
                ${this.calculateNetTotal(accounts)}
              </Text>
            </Text>
            <Form style={{ alignSelf: "center" }}>
              <Picker
                mode="dropdown"
                iosIcon={<Icon style={{ color: "white" }} name="arrow-down" />}
                placeholder="Check transactions for other accounts"
                onValueChange={this.onHandleChange}
              >
                {this.props.accounts.data.length
                  ? this.props.accounts.data.map((account) => {
                      return (
                        <Picker.Item
                          key={account.id}
                          label={account.name}
                          value={account.name}
                        />
                      );
                    })
                  : null}
              </Picker>
            </Form>
          </Body>
        </Header>

        <Content style={{ padding: 20 }}>
          <SpendingChart info={info} />
          <Text
            style={{
              alignSelf: "center",
              fontSize: 25,
              marginTop: 20,
              marginBottom: 10,
            }}
          >
            Latest Transactions
          </Text>
          {info.length ? (
            info.map((item, index) => {
              return <SpendingCard info={info} item={item} index={index} />;
            })
          ) : (
            <Text>There are no transactions for this account</Text>
          )}
        </Content>
      </Container>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    transactions: state.transactions,
    accounts: state.accounts,
    user: state.user,
  };
};

const mapDispatchToProps = (dispatch) => ({
  fetchTransactions: (id) => dispatch(fetchTransactions(id)),
  fetchAccounts: (id) => dispatch(fetchAccounts(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(SpendingScreen);
