import React, {useEffect, useState} from 'react';
import {withFormik, Field, Form, ErrorMessage} from "formik";
import axios from 'axios';
import * as Yup from 'yup';
import '../App.css';

const UserForm = ({values, isSubmitting, status}) => {
	const [users, setUsers] = useState([]);
	useEffect(() => {
		console.log("status has changed", status);
		status && setUsers(users => [...users, status])
	}, [status]);
	console.log("users:", users);
	return (
		<div>
			<Form validationSchema={UserFormikForm.validationSchema}>
				<label htmlFor="name">Name:</label>
				<Field id="name" type="text" name="name" placeholder="Enter your name"/>
				<ErrorMessage component="div" className="error" name="name"/>
				<br/>
				<label htmlFor="email">eMail:</label>
				<Field id="email" type="email" name="email" placeholder="Enter your eMail"/>
				<ErrorMessage component="div" className="error" name="email"/>
				<br/>
				<label htmlFor="password">Password:</label>
				<Field id="password" type="password" name="password" placeholder="Enter a password"/>
				<ErrorMessage component="div" className="error" name="password"/>
				<br/>
				<label htmlFor="terms">Terms of Service:</label>
				<Field id="terms" type="checkbox" name="terms" id="terms"/>
				<ErrorMessage component="div" className="error" name="terms"/>
				<br/>
				<button type="submit" disabled={isSubmitting}>
					{isSubmitting ? 'Submitting' : 'Submit'}
				</button>
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
		name: Yup.string().required("Please enter a name").matches(/^[a-zA-Z]+$/, { message: "Invalid name", excludeEmptyString: true }),
		email: Yup.string().required("Please enter an email").email("Invalid email"),
		password: Yup.string().required("Please enter a password").min(6, "Minimum 6 characters long"),
		terms: Yup.boolean().oneOf([true], 'Must Accept Terms of Service')
	}),
	handleSubmit(values, {setStatus, resetForm, setSubmitting}) {
		console.log("submitting!", setSubmitting());
		axios
			.post('https://reqres.in/api/users/', values)
			.then(res => {
				console.log("success", res);
				setStatus(res.data);
				resetForm();
			})
			.catch(err => console.log('error:', err.response))
			.finally(() => {setSubmitting(false)})
	}
})(
	UserForm
);
export default UserFormikForm;
