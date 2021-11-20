import React, { useState } from 'react'
import { Form, Button } from 'react-bootstrap'

function Checkbox({ handleFilters, categories }) {

    const [checked, setChecked] = useState([])

    const handleToggle = (value) => {
        const currentIndex = checked.indexOf(value)
        const newChecked = [...checked]

        if (currentIndex === -1) {
            newChecked.push(value)
        } else {
            newChecked.splice(currentIndex, 1)
        }

        setChecked(newChecked)
        // handleFilters(newChecked)
    }

    const handleClearFilter = () => {
        const newChecked = []
        setChecked(newChecked)
        // handleFilters(newChecked)
    }
    
    return (
        
        <div>
            {console.log('categories:', categories)}
            <div className='d-flex mt-5 mb-3'>
                <h2 style={{display: 'inline', marginRight: '12px'}}>Filters</h2>
                <Button 
                    style={{
                        color: '#666666', 
                        backgroundColor: 'transparent', 
                        textTransform: 'none', 
                        textDecoration: 'underline', 
                        fontSize: '12px', 
                        padding: '0px', 
                        margin: '0px',
                        outline: 'none'
                    }}
                    onClick={() => handleClearFilter()}
                >Clear filters
                </Button>
            </div>
            <h4 className='mb-3'>Categories</h4>
            <Form style={{fontSize: '14px'}}>
                {categories ? (
                    <div>
                    {categories.map((category, index) => (
                        <Form.Check
                            key={index} 
                            onChange={() => handleToggle(category)}
                            type='checkbox'
                            label={category}
                            checked={checked.indexOf(category) !== -1}
                        />
                    ))}
                    </div>
                ) : (<div></div>)}

                {/* <Form.Check 
                    onChange={() => handleToggle('Clothing')}
                    type='checkbox'
                    label={`Clothing`}
                    checked={checked.indexOf('Clothing') !== -1}
                />
                <Form.Check 
                    onChange={() => handleToggle('Gaming')}
                    type='checkbox'
                    label={`Gaming`}
                    checked={checked.indexOf('Gaming') !== -1}
                />
                <Form.Check 
                    onChange={() => handleToggle('Music')}
                    type='checkbox'
                    label={`Music`}
                    checked={checked.indexOf('Music') !== -1}
                /> */}
            </Form>
        </div>
    )
}


export default Checkbox
