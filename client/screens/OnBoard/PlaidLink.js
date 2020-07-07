import React, { Component } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { WebView } from 'react-native-webview';
const PLAID_PUBLIC_KEY = 'e192da42c496ba424b0a39f9cdb07a'
const PLAID_ENV = 'sandbox'
const PLAID_PRODUCT = 'auth,transactions'

export default class PlaidLink extends Component {
    constructor(props) {
        super(props)
        this.state = {
            authed: false,
            data: {}
        }
    }

    render() {
        return (
            this.state.data.action && this.state.data.action.indexOf('::connected') !== -1 ?
                this.renderDetails() : this.renderLogin()
        );
    }
    renderLogin() {
        return <WebView
            source={{ uri: `https://cdn.plaid.com/link/v2/stable/link.html?key=${PLAID_PUBLIC_KEY}&env=${PLAID_ENV}&product=${PLAID_PRODUCT}&clientName=CatalinMiron&isWebView=true&isMobile=true&webhook=http://google.com` }}
            onMessage={(e) => this.onMessage(e)}
        />
    }

    renderDetails() {
        return <View style={styles.container}>
            <Text>Institution: {this.state.data.metadata.institution.name}</Text>
            <Text>Institution ID: {this.state.data.metadata.institution.institution_id}</Text>
            <Text>Token: {this.state.data.metadata.public_token}</Text>
        </View>
    }

    onMessage(e) {
        this.setState({
            data: JSON.parse(e.nativeEvent.data)
        })
    }
}