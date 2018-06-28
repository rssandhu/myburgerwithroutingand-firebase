import React , { Component } from 'react';
import  { connect } from 'react-redux'; 
import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import classes from '../Auth/Auth.css';
import { Spiner }  from '../../components/UI/Spinner/Spinner';
import * as actions from '../../store/actions/index';



class Auth extends Component{

    state = {
        controls:{
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Your Email'
                },
                value: '',
                validation: {
                    required: true,
                    isEmail : true
                },
                valid: false,
                touched: false
            },
            password: {
                elementType: 'input',
                elementConfig: {
                    type: 'password',
                    placeholder: 'Your Password'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 6
                },
                valid: false,
                touched: false
            }
        },
        isSignup : true
       
    }
    checkValidity(value, rules) {
        let isValid = true;
        if (!rules) {
            return true;
        }
        
        if (rules.required) {
            isValid = value.trim() !== '' && isValid;
        }

        if (rules.minLength) {
            isValid = value.length >= rules.minLength && isValid
        }

        if (rules.maxLength) {
            isValid = value.length <= rules.maxLength && isValid
        }

        if (rules.isEmail) {
            const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
            isValid = pattern.test(value) && isValid
        }

        if (rules.isNumeric) {
            const pattern = /^\d+$/;
            isValid = pattern.test(value) && isValid
        }

        return isValid;
    }
    inputChangedHandler = (event, controlsName) => {
       const updatedControlrs = {
            ...this.state.controls,
            [controlsName] :{
                ...this.state.controls[controlsName],
                value : event.target.value,
                valid : this.checkValidity(event.target.value ,this.state.controls[controlsName].validation),
                touched : true
            }
       }
       this.setState({controls : updatedControlrs});
    }
    submitHandler = (event) => {
        event.preventDefault();
        this.props.onAuth(this.state.controls.email.value,this.state.controls.password.value , this.state.isSignup);
    }
    switchAuthmodeHandler = () => {
        this.setState(prevState => {
            return {isSignup : !prevState.isSignup}
        })
    }

    render(){
        const formElementsArray = [];
        for (let key in this.state.controls) {
            formElementsArray.push({
                id: key,
                config: this.state.controls[key]
            });
        }
        
        let form = formElementsArray.map(formElement => (   //looping form elements
            <Input   //adding propertys to input 
                key={formElement.id}
                elementType={formElement.config.elementType}
                elementConfig={formElement.config.elementConfig}
                value={formElement.config.value}
                invalid={!formElement.config.valid}
                shouldValidate={formElement.config.validation}
                touched={formElement.config.touched}
                changed={(event) => this.inputChangedHandler(event, formElement.id)} />
                
        ));
        if(this.props.loading){
            form = <Spiner />
        }
        return ( 
                <div className ={classes.Auth}>
                <h3>{this.state.isSignup ? "Signup" : "Signin"} To Proceed</h3>
                    <form onSubmit = {this.submitHandler}>  
                        {/* rendring dynamic form */}
                        {form}   
                        <Button btnType ="Success">Submit</Button>
                    </form>
                    <Button
                    clicked = {this.switchAuthmodeHandler}
                    btnType = "Danger">Switch To {this.state.isSignup ? "Signin" : "Signup"}</Button>
                </div>
        );
    }

  
}
const mapStatetoProps =state => {
    return {
        loading : state.auth.loading
    }
   
}

const  mapDispatchtoProps = dispatch => {
    return {
        onAuth : (email,password , isSignup) => dispatch(actions.auth(email, password ,isSignup))
    } 
};
export default connect (mapStatetoProps,mapDispatchtoProps)(Auth) ;