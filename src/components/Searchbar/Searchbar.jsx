import { Component } from "react";
import { BsSearch } from 'react-icons/bs'
import { Formik, Form, Field, ErrorMessage } from "formik";
import css from "./Searchbar.module.css"
import * as yup from "yup";
import PropTypes from 'prop-types';

export class Searchbar extends Component {

    static propTypes = {
        onFormSubmit: PropTypes.func.isRequired,
    }

    initialValues = {
        query: '',
    }

    schema = yup.object().shape({
        query: yup.string().required(),
    })
        
    handleSubmit = async (values, actions) => {
        const {resetForm, setSubmitting} = actions;
        const {onFormSubmit} = this.props
      
        if (values.query.trim() === '') return;


        await onFormSubmit(values.query);

        setSubmitting(); // --- to make submit btn disabled during submitting
        resetForm();
    };

    render() {

        return (
            <header className={css.searchbar}>
                <Formik 
                initialValues = {this.initialValues} 
                onSubmit = {this.handleSubmit}
                validationSchema={this.schema}
                >

                {(props) => {
                    return (
                        <Form className={css.searchForm}>

                        <button type="submit" 
                        className={css['searchForm-button']}
                        disabled={props.isSubmitting} // --- to make submit btn disabled during submitting
                        >
                            <span 
                            className={css['searchForm-button-label']}
                            >Search</span>   
                            <BsSearch/> 
                        </button>

                        <label className={css['searchForm-button-label']} htmlFor="query">   Search query</label>
                        
                        <Field
                        id="query"
                        name="query"
                        className={css['searchForm-input']}
                        type="text"
                        autoComplete="off"
                        autoFocus
                        placeholder="Search images and photos"
                        ></Field>
                        <ErrorMessage name="query" />

                    </Form>
                    )
                }}


                </Formik>
            </header>
        )
    }
}