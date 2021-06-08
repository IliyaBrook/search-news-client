import {Form} from "react-bootstrap";


const SearchingForm = (placeholder , submitNewsForm , value , ref) => {


    return (
        <div>
            <div>
                <div className='container-fluid m-5'>
                    <Form onSubmit={submitNewsForm}>
                        <div className="form-content">
                            <Form.Group>
                                <Form.Control ref={ref} onChange={value} placeholder={placeholder}/>
                                <button className="btn btn-info m-1">Search</button>
                            </Form.Group>
                        </div>
                    </Form>
                </div>
            </div>
        </div>
    )
}
export default SearchingForm;
