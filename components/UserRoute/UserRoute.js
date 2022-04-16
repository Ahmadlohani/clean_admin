import {useEffect, useState, useContext, Children} from 'react';
import {UserContext} from "../../context";
import axios from "axios";
import {useRouter} from "next/router";
import {SyncOutlined} from '@ant-design/icons';

const UserRoute = ({children}) => {

const route = useRouter();
const [ok, setOk] = useState(false);
const [state] = useContext(UserContext);
useEffect(() => {
    if(state && state.token) getCurrentUser();
}, [state && state.token]);

const getCurrentUser = async () => {

    try {
        const {data} = await axios.get(`/current-user`)
        if (data.ok) setOk(true);
    } catch (error) {
        route.push("/");
    }
}

process.browser && state === null && 
setTimeout(() => {
    getCurrentUser();
}, 1000);

return !ok ? (
    <SyncOutlined spin className="d-flex justify-content-center display-1 text-primary p-5" />
) : (
    <>
    {children}
    </>
)
}
export default UserRoute;