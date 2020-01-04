import React from 'react';
import {withFormik, Field, Form, ErrorMessage} from "formik";
import * as Yup from 'yup';

const UserForm = ({values}) => {
	console.log("UserForm", values);
	return (
		<div>
			Form
			<Form>
				<label htmlFor="name">
					Name:
					<Field id="name" type="text" name="name" placeholder="Enter your name"/>
					<ErrorMessage name="name"/>
				</label>
				<label>
					eMail:
					<Field id="email" type="email" name="email" placeholder="Enter your eMail"/>
					<ErrorMessage name="email"/>
				</label>
				<label>
					Password:
					<Field id="password" type="password" name="password" placeholder="Enter a password"/>
					<ErrorMessage name="password"/>
				</label>
				<label>
					Terms of Service:
					<Field id="terms" type="checkbox" name="terms" id="terms"/>
					<ErrorMessage name="terms"/>
				</label>
				<button type="submit">Submit</button>
			</Form>
		</div>
	)
};

const UserFormikForm = withFormik({
	mapPropsToValues({
		                 name,
		                 email,
		                 password,
		                 terms
	}){
		return {
			name: name || "",
			email: "",
			password: "",
			terms: false,
		}
	},
	validationSchema: Yup.object().shape({
		name: Yup.string().required().min(1),
		email: Yup.string().required().email(),
		password: Yup.string().required().min(6),
		terms: Yup.boolean().oneOf([true], 'Must Accept Terms of Service')
	}),
	handleSubmit(values, formikBag) {
		console.log("submitting!", values)
	}
})(
	UserForm
);
export default UserFormikForm;