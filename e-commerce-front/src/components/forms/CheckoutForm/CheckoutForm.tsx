import { TBillsData } from '@customTypes/checkout';
import actSaveCheckoutDetails from '@store/checkout/act/actSaveCheckoutDetails';
import { useAppDispatch } from '@store/hooks';
import React, { useState } from 'react'
import { Alert } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import { FaDiagramSuccessor } from 'react-icons/fa6';
import { GiDonerKebab } from 'react-icons/gi';
import { MdDone, MdDoneAll, MdDoneOutline, MdOutlineDone } from 'react-icons/md';



const CheckoutForm = ({ isSubmitting, setIsSubmitting }) => {

    const dispatch = useAppDispatch();

    const [formData, updateFormData] = useState<TBillsData>({
        firstName: '',
        lastName: '',
        address: '',
        city: '',
        zipCode: '',
        phone: '',
        email: '',
    });


    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        updateFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true); // Set isSubmitting to true when form is submitted

        // Dispatch an action to save checkout details to Redux store
        await dispatch(actSaveCheckoutDetails(formData));

        // Clear form fields after submission
        updateFormData({
            firstName: '',
            lastName: '',
            address: '',
            city: '',
            zipCode: '',
            phone: '',
            email: '',
        });

        // setIsSubmitting(false); // Reset isSubmitting after form submission
    };


    return (
        <div className='w-50 m-0 px-5'>
            <h2>Billing details</h2>

            <Form className='w-100 mt-5 pe-4' onSubmit={handleSubmit}>
                <Row className="mb-3">
                    <Form.Group className="w-50" controlId="formGridFirstName">
                        <Form.Label>First Name</Form.Label>
                        <Form.Control
                            type="text"
                            name="firstName"
                            value={formData.firstName}
                            onChange={handleChange}
                        />
                    </Form.Group>
                    <Form.Group className="w-50" controlId="formGridLastName">
                        <Form.Label>Last Name</Form.Label>
                        <Form.Control
                            type="text"
                            name="lastName"
                            value={formData.lastName}
                            onChange={handleChange}
                        />
                    </Form.Group>
                </Row>

                <Form.Group className="mb-3 w-100" controlId="formGridAddress">
                    <Form.Label>Address</Form.Label>
                    <Form.Control
                        type="text"
                        name="address"
                        value={formData.address}
                        onChange={handleChange}
                    />
                </Form.Group>

                <Row className="mb-3">
                    <Form.Group style={{ width: '60%' }} controlId="formGridCity">
                        <Form.Label>City</Form.Label>
                        <Form.Control
                            type="text"
                            name="city"
                            value={formData.city}
                            onChange={handleChange}
                        />
                    </Form.Group>

                    <Form.Group controlId="formGridZip" style={{ width: '40%' }}>
                        <Form.Label>ZIP code</Form.Label>
                        <Form.Control
                            type="text"
                            name="zipCode"
                            value={formData.zipCode}
                            onChange={handleChange}
                        />
                    </Form.Group>
                </Row>

                <Form.Group className="mb-3 w-100" controlId="formGridPhone">
                    <Form.Label>Phone</Form.Label>
                    <Form.Control
                        type="text"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                    />
                </Form.Group>

                <Form.Group as={Col} className="mb-3 w-100" controlId="formGridEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                    />
                </Form.Group>

                <Button
                 variant='dark' 
                type="submit" className='px-5 mt-3 py-2'
                    onClick={handleSubmit}
                >
                    {!isSubmitting ? 
                    <>
                    Submitting {' '} <MdDone /> 
                    </> 
                    : 'Submit'}                    
                </Button>
            </Form>
        </div>
    )
}

export default CheckoutForm
