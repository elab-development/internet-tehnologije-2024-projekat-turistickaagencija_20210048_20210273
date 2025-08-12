import React from 'react';

const useFormValues = (initialValues) => {
    const [formData, setFormData] = React.useState(initialValues);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    }

    return {
        formData,
        handleInputChange
    };
}

export default useFormValues;
