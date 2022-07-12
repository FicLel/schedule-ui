import {useReducer} from 'react';

export const useValidation = (formData) => {
  
  const textValidation = (value) => {
    if (value && value.trim().length > 0) return {state: false, value};
    return {state: true, value};
  };
  const confirmPassword = (password, {value}) => {
    if (password === value) {
      return {state: false, value};
    }
    return {state: true, value};
  };
  const confirmEmail = (value) => {
    const reg = new RegExp(/^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/);
    return {state: !reg.test(value), value};
  };
  const confirmNumber = (value) => {
    return {state: isNaN(value), value};
  };
  const finalValidation = (value) => {
    for (let key in value) {
      if (key !== 'submit')
        if (value[key].state || !value[key].value.trim().length)
          return {state: true};
    }
    return {state: false};
  };

  const validation = (state, type, value, field, optionalData) => {
    switch (type) {
      case 'TEXT':
        state[field] = textValidation(value);
        state.submit = finalValidation({...state});
        return {...state};
      case 'CONFIRMPASSWORD':
        state[field] = confirmPassword(value, optionalData);
        state.submit = finalValidation({...state});
        return {...state};
      case 'EMAIL':
        state[field] = confirmEmail(value);
        state.submit = finalValidation({...state});
        return {...state};
      case 'NUMBER':
        state[field] = confirmNumber(value);
        state.submit = finalValidation({...state});
        return {...state};
      default:
        return {...state};
    }
  };
  const initialStateModifier = (value) => {
    const tempValue = {...value};
    for (let key in tempValue) {
      tempValue[key] = {state: value[key], value: ''};
    }
    return tempValue;
  };

  const reducer = (state, {type, value, field, optionalData}) => {
    return {...validation(state, type, value, field, optionalData)};
  };
  const [state, dispatch] = useReducer(
    reducer,
    initialStateModifier({...formData, submit: true}),
  );

  const handleValidation = (type, value, field, optionalData) =>
    dispatch({type, value, field, optionalData});
  return {...state, handleValidation};
};

export default useValidation;
