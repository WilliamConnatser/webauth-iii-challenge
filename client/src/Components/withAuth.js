import React from 'react';
import axios from 'axios';

axios
    .interceptors
    .request
    .use(requestConfig => {
        requestConfig.headers.authorization = localStorage.getItem('token');
        return requestConfig;
    }, error => {
        return Promise.reject(error);
    })

export default Component => class withAuth extends React.Component {
    render() {
        const token = localStorage.getItem('token');
        return (
            <div>
                {token
                    ? <Component {...this.props}/>
                    : <h3>Log In First</h3>}
            </div>
        )
    }
}
