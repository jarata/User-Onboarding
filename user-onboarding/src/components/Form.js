import React from 'react';
import {withFormik, Field, Form} from "formik";

const UserForm = () => {
	return (
		<div>
			Form
			<Form>
				<Field type="text" name="name" placeholder="Enter your name"/>
				<Field type="email" name="email" placeholder="Enter your eMail"/>
				<Field type="password" name="password" placeholder="Enter a password"/>
				<Field type="checkbox" name="terms"/>
				<button>Submit</button>
			</Form>
		</div>
	)
};
const UserFormikForm = withFormik(UserForm);
export default UserFormikForm;