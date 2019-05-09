import React, {Component} from 'react';
import axios from 'axios';

export default class Users extends Component {
    state = {
        users: []
    }
    componentDidMount() {
        axios
            .get('http://localhost:5001/api/users')
            .then(res => {
                this.setState({users: res.data});
            })
            .catch(err => {
                alert(err);
                this
                    .props
                    .history
                    .push('/');
            });
    }
    render() {
        const allUsers = this.state.users && this
            .state
            .users
            .map(usr => {
                return <div
                    style={{
                    marginTop: '10px'
                }}
                    key={usr.id}>{usr.username}</div>
            });
        return (
            <div>
                <h2>Users</h2>
                {allUsers}
            </div>
        )
    }
}
