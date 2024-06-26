import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { changeAuthStatus } from '../state/reducers/AuthReducer';
import { retrieveData } from '../utils/Storage';
import AuthStack from './AuthStack';
import PostAuthStack from './PostAuthStack';

const Route = () => {

    const disPatch = useDispatch();

    React.useEffect(()=>{
        retrieveToken();
    },[]);

    const retrieveToken = async()=> {
        let data = await retrieveData('userdetails');
        if(data && data.token){
            disPatch(changeAuthStatus(true))
        }else{
            disPatch(changeAuthStatus(false))
        }
    }

    const { isAuth } = useSelector((state) => state.authreducer);

    return (
        <>
            {isAuth ?  <PostAuthStack/>:<AuthStack /> }
        </>
    )
}

export default Route