import { useState } from 'react';

function NewPhone(props) {
    const {contact, phones, setPhones} = props;
    const [number, setNumber] = useState('');
    const [name, setName] = useState('Home');

    async function createPhone(e) {
        e.preventDefault();

        const response = await fetch('http://localhost/api/contacts/' + contact.id + '/phones', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                number,
                name
            })
        });

        const data = await response.json();

        if (data.id) {
            setPhones([...phones, data]);
        }

        setNumber('');
        //setName('');
    }

	return (
        <form onSubmit={createPhone} onClick={(e) => e.stopPropagation()} className='new-phone'>
            <select name='category' id='category' onChange={(e) => setName(e.target.value)}>
                
                <option value='home'>Home</option>
                <option value='work'>Work</option>
                <option value='mobile'>Mobile</option>
                <option value='main'>Others</option>
            </select>
            <input type='text' placeholder='Phone Number' onChange={(e) => setNumber(e.target.value)} value={number}/>
            <button className='button green' type='submit'>Add {contact.name}'s contact</button>
        </form>
	);
}

export default NewPhone;