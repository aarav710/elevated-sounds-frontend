import React, { useEffect } from 'react';
import { useForm } from "react-hook-form";
import './FormRegSign.css';
import { useHistory, Link } from 'react-router-dom';
import Footer from './components/Footer';

const FormRegSign = ({ updateUser, method }) => {
    useEffect(() => window.scrollTo(0, 0), []);
    const { register, handleSubmit, errors, reset } = useForm();
    const history = useHistory();
    const onSubmit = data => {
        fetch(`https://infinite-crag-03585.herokuapp.com/${method}`, {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ IDofuser: data.emailid, password: data.password }),
        }
        ).then(response => response.json())
            .then(userID => {
                if (userID !== null) {
                    updateUser({ type: "SIGN IN", ID: userID });
                    history.push("/");
                }
            });
        reset();
    }
    return (
        <div>
            <div className='signinbody'>
                <div className='brandDisplay' style={{ backgroundImage:'(https://infinite-crag-03585.herokuapp.com/laptop-2.jpg)'}}>
                    <div className='brandname'>Elevated Sounds.</div>
                </div>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className='signin'>{method === 'register' ? 'Register' : 'Sign In'}</div>
                    <div className='emailid'>Email ID</div>
                    <input type='text' name='emailid' placeholder='Email ID' className='inputforms' ref={register({ required: true })}></input>
                    {errors.emailid && <span>*Email ID is required</span>}
                    <div className='emailid'>Password</div>
                    <input type='password' name='password' placeholder='Password' className='inputforms' ref={register({ required: true })}></input>
                    {errors.password && <span>*Password is required</span>}
                    <div className='buttonholder'>
                        <input type='submit' value={method === 'register' ? 'Register' : 'Sign In'} className='buttonstyling' />
                        {method === 'register' ?
                            <Link to='/signin'>
                                <a className='alternative-option' href='#'>Sign In</a>
                            </Link>
                            :
                            <Link to='/register'>
                                <a className='alternative-option'>Create an account</a>
                            </Link>
                        }
                    </div>
                </form>
            </div>
            <Footer />
        </div>
    );
};

export default FormRegSign;