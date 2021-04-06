import axios from './axios';
import qs from 'qs';
import {getJwtToken, setJwtToken} from './index';

export const fetchData = async (url, method, params = null) => {
    let config = {
        url,
        method,
        paramsSerializer: data => qs.stringify(data, { indices: false })  // 序列化 处理数组
    }
    config.headers = {
        'Content-type': 'application/json;charset=utf-8'
    };
    config.headers['jwt-token'] = getJwtToken() ? getJwtToken() : 'NULL';
    if(method === 'get'){
        config.params = params;
    }else{
        config.data = params;
    }
    try {
        let res = await axios(config);
        return res.data;
    } catch(err) {
        return err;
    }
}