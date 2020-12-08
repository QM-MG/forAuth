import axiosIns from '../axiosConfig';
import * as url from '../url';
export function searchData(param) {
    return axiosIns.post(url.PAGE1); 
}