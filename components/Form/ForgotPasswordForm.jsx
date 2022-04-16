import Form from 'react-bootstrap/Form';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Button from 'react-bootstrap/Button';
import { SyncOutlined } from "@ant-design/icons";

const ForgotPasswordForm = ({
    handleSubmit,
    email,
    SetEmail,
    newPassword,
    SetNewPassword,
    security,
    SetSecurity,
    loading,
}) => {
    return (
        <div>
            <Form onSubmit={handleSubmit}>
            <FloatingLabel
                controlId="floatingInput"
                label="Email address"
                className="mb-3"
            >
                <Form.Control type="email" name="email" value={email} onChange={e => SetEmail(e.target.value)} placeholder="name@example.com" />
            </FloatingLabel>
            <FloatingLabel controlId="floatingPassword" className="mb-3" label="New Password">
                <Form.Control type="password" name="password" value={newPassword} onChange={e => SetNewPassword(e.target.value)} placeholder="Password" />
            </FloatingLabel>
            <>
            <FloatingLabel controlId="floatingSelect" label="Security Question">
            <Form.Select aria-label="Floating label select example">
                <option value="color">What is your Favourite Color?</option>
                <option value="color">What is your first pet?</option>
                <option value="color">Which city you were born?</option>
            </Form.Select>
            </FloatingLabel>
            <FloatingLabel controlId="floatingAnswer" className="my-3" label="Write Answer Here">
                <Form.Control type="text" name="security" value={security} onChange={e => SetSecurity(e.target.value)} placeholder="Answer" />
            </FloatingLabel>
            </>
            <Button type="submit" className="col-12"
                disabled={!email || !newPassword || !security || loading}
            >
            { loading ? <SyncOutlined spin className="py-1" /> : "Submit" }
            </Button>
            </Form>
        </div>
    )
}

export default ForgotPasswordForm;
