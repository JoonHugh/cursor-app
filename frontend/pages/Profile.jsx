import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';


function Profile() {

    const userURL = '/users/me'
    const { user } = useSelector((state) => state.auth);



    return(
        <div>
            <h5>Profile</h5>
            <p>{user.name}</p>
            <p>{user.email}</p>
            <p>{new Date(user.createdAt).toLocaleString('en-US', {month: 'short', day: 'numeric', year: 'numeric'})}</p>

        </div>
    );
}

export default Profile