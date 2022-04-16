import {useState} from "react";
import axios from "axios";
import { toast } from 'react-toastify';
import { Modal } from 'antd';
import Link from "next/link";
import ForgotPasswordForm from '../components/Form/ForgotPasswordForm';
import { useRouter } from "next/router";
import { useContext } from "react";
import { UserContext } from "../context";
const ForgotPassword = () => {
    const [email, SetEmail] = useState("");
    const [newPassword, SetNewPassword] = useState("");
    const [security, SetSecurity] = useState("");
    const [loading, SetLoading] = useState(false);
    const [ok, SetOk] = useState(false);
    const [state, setState] = useContext(UserContext);
    const route = useRouter();
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            SetLoading(true);
            const {data} = await axios.post(`/forgot-password`, {
                email,
                newPassword,
                security
            });
            if(data.error){
                toast.error(data.error);
                SetLoading(false);
            } else {
                SetEmail("");
                SetNewPassword("");
                SetSecurity("");
                SetOk(true);
                SetLoading(false);
            }
        } catch (err) {
            toast.error(err.response.data);
            SetLoading(false);
        }
    }
    if (state && state.token) route.push("/"); 
    return (
        <div className="container">
            <div className="row">
                <div className="col text-center">
                    <h3 className="my-5">Forgot Password</h3>
                </div>
            </div>
            <div className="row">
                <div className="col-md-6 offset-md-3">
                <ForgotPasswordForm
                    handleSubmit={handleSubmit}
                    email={email}
                    SetEmail={SetEmail}
                    newPassword={newPassword}
                    SetNewPassword={SetNewPassword}
                    security={security}
                    SetSecurity={SetSecurity}
                    loading={loading}
                />
                </div>
            </div>
            <div className="row">
                <div className="col">
                    <Modal
                        title="Congratulations!"
                        visible={ok}
                        onCancel={() => SetOk(false)}
                        footer={null}
                    >
                    <p>Congrats! You can login now with new Password</p>
                    <Link href="/login">
                    <a className="btn btn-primary btn-sm">Login</a>
                    </Link>
                    </Modal>
                </div>
            </div>
        </div>
    )
}

export default ForgotPassword;
