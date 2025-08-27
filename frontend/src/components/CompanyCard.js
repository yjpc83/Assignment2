//import { useState, useEffect } from 'react';

function CompanyCard(props) {



    async function processCompanyInfo(e) {
        e.preventDefault();
        //
    }

    return (
        <form className='company-card' onClick={(e) => e.stopPropagation()} onSubmit={processCompanyInfo}>
            <strong>Company Name</strong>
            <input type='text' placeholder='Company Name' />
            <strong>Company Address</strong>
            <input type='text' placeholder='Company Address' />
            <div className='button-container'>
                <button className='button green' type='submit'>Save</button>
                <button className='button red'>Delete</button>
            </div>
            
        </form>

    );
}



export default CompanyCard;
