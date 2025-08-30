import { use } from 'react';
import { useState, useEffect } from 'react';

function CompanyCard(props) {
    const { contact } = props;

    // React use a different set of variables for UI states
    // Changes to these states triggers rebuild
    const [company, setCompany] = useState({});

    const [new_company_name, setNewCompanyName] = useState('');
    const [new_company_address, setNewCompanyAddress] = useState('');

    const [isSaveDisabled, setIsSaveDisabled] = useState(true);
    const [isDeleteDisabled, setIsDeleteDisabled] = useState(true);



    // initialise data for this component, runs only once
    useEffect(() => {
        fetch('http://localhost/api/contacts/' + contact.id + '/companies')
            .then(response => response.json())
            .then(data => {
                setCompany(data[0]);
   
                setNewCompanyName(data[0]?.company_name || '');
                setNewCompanyAddress(data[0]?.company_address || '');

                if (data[0]?.company_id) {
                    setIsDeleteDisabled(false);
                }
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    }, []);

    // Register changes whenever new values are received
    // If new values are empty, don't allow save
    useEffect(() => {
        const isModified = company?.company_name !== new_company_name || company?.company_address !== new_company_address;
        const isBlank = new_company_name === '' || new_company_address === '';

        setIsSaveDisabled(!isModified || isBlank);

    }, [new_company_name, new_company_address, company?.company_name, company?.company_address])


    // confirm success by reading back from database and reset company data
    async function confirmSuccess() {
        await fetch('http://localhost/api/contacts/' + contact.id + '/companies')
            .then(response => response.json())
            .then(data => {
                setCompany(data[0]);
   
                setNewCompanyName(data[0]?.company_name || '');
                setNewCompanyAddress(data[0]?.company_address || '');

                if (!data[0]?.company_id) {
                    setIsDeleteDisabled(true);
                } else {
                    setIsDeleteDisabled(false);
                };
                console.log(isDeleteDisabled)
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    }

    async function doDelete(e) {
        e.preventDefault();

        const res = await fetch('http://localhost/api/companies/' + company.company_id, {
            method: 'DELETE',
        }).catch((error) => {
            console.error('Error:', error);
        });
        confirmSuccess();
    };

    async function processCompanyInfo(e) {
        e.preventDefault();

        // If there is no data, then POST
        if (!company?.company_id) {
            const res = await fetch('http://localhost/api/contacts/' + contact.id + '/companies/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    company_name: new_company_name,
                    company_address: new_company_address
                })
            });

            confirmSuccess();
            //console.log("Posted")

        } else {
            // If there is data, then PUT
            const res = await fetch('http://localhost/api/companies/' + company.company_id, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    company_name: new_company_name,
                    company_address:new_company_address
                })
            });

            confirmSuccess();
            //console.log("Updated")
        }
    }

    // Remember that the VDOM is re-created, but not necessarily need re-render.
    return (
        <form className='company-card' onClick={(e) => e.stopPropagation()} onSubmit={processCompanyInfo}>
            <strong>Company Name</strong>
            <input type='text' placeholder='Company Name' onChange={(e) => setNewCompanyName(e.target.value)} value={new_company_name} />
            <strong>Company Address</strong>
            <input type='text' placeholder='Company Address' onChange={(e) => setNewCompanyAddress(e.target.value)} value={new_company_address} />
            <div className='button-container'>
                <button className='button green' type='submit' disabled={isSaveDisabled}>Save</button>
                <button className='button red' disabled={isDeleteDisabled} onClick={doDelete}>Delete</button>
            </div>

        </form>

    );
}

export default CompanyCard;
