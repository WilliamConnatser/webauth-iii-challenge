import React, {Component} from 'react';
import axios from 'axios';

export default class Form extends Component {
    constructor(props) {
        super(props);

        if (props.register) {
            this.state = {
                username: '',
                password: '',
                department: ''
            }
        } else {
            this.state = {
                username: '',
                password: '',
                department: ''
            }
        }
    }
    changeHandler = event => {
        this.setState({
            [event.target.id]: event.target.value
        });
    }
    submitHandler = event => {
        event.preventDefault();

        if (this.props.register) {
            this.registerUser();
        } else {
            this.loginUser();
        }
    }
    registerUser() {
        axios
            .put('http://localhost:5001/api/register', this.state)
            .then(res => {
                localStorage.setItem(res.data.token);
            })
            .catch(err => {
                alert(err.message);
            });
    }
    loginUser() {
        axios
            .put('http://localhost:5001/api/login', this.state)
            .then(res => {
                localStorage.setItem(res.data.token);
            })
            .catch(err => {
                alert(err.message);
            });
    }
    render() {
        return (
            <div>
                <h1>{this.props.register
                        ? 'Register'
                        : 'Login'}</h1>
                <form onSubmit={this.submitHandler}>
                    <div>
                        <label htmlFor="username">Username</label><br/>
                        <input id="username" type="text" onChange={this.changeHandler} value={this.state.username}/>
                    </div>

                    <div>
                        <label htmlFor="password">Password</label><br/>
                        <input id="password" type="password" onChange={this.changeHandler} value={this.state.password}/>
                    </div>
                    {this.props.register
                        ? <div>
                                <label htmlFor="department">Department</label><br/>
                                <input
                                    id="department"
                                    type="text"
                                    onChange={this.changeHandler}
                                    value={this.state.department}/>
                            </div>
                        : null}

                    <button type="submit">Submit</button>
                </form>
            </div>
        )
    }
}
