import React from 'react';
import PlaidAuthenticator from 'react-native-plaid-link';
import { connect } from 'react-redux';

import { sendToken } from '../../store/token';

class PlaidLink extends React.Component {
    state = {
        data: {},
        status: ''
    };

    render() {
        switch (this.state.status) {
            case 'CONNECTED':
                return this.renderDetails();
            default:
                return this.renderLogin();
        }
    }

    renderLogin() {
        return (
            <PlaidAuthenticator
                onMessage={this.onMessage}
                publicKey="e192da42c496ba424b0a39f9cdb07a"
                env="sandbox"
                product="auth,transactions"
                clientName="MoneyMentor"
            />
        );
    }

    renderDetails() {
        this.props.sendToken(this.state.data.metadata.public_token);

        return (
            <View >
                <Text >THIS SHOWS UP AFTER LINK IS COMPLETED</Text>
            </View>
        );
    }

    onMessage = data => {
        this.setState({
            data,
            status: data.action.substr(data.action.lastIndexOf(':') + 1).toUpperCase()
        });
    };
}

const mapDispatch = dispatch => {
    return {
        sendToken: token => dispatch(sendToken(token))
    };
};

export default connect(
    null,
    mapDispatch
)(PlaidLink);