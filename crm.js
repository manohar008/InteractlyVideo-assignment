const express = require('express')

const axios = require('axios')
const { json } = require('express')



const apiKey = "RuNL_NSODNvGRhMfGOrsgw"
let baseurl = "https://interactlyvideo-team.myfreshworks.com/crm/sales"


const createContactWithCrm = async (req, res) => {


    const { first_name, last_name, email, mobile_number } = req.body;
    try {
        const response = await axios.post(
            baseurl,
            {
                first_name,
                last_name,
                email,
                mobile_number,
            },
            {
                headers: {
                    Authorization: `Token token=${apiKey}`,
                },
            }
        );
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}




// Get Contact endpoint
const getContactWithCRM = async (req, res) => {
    try {
        const data = req.body
        console.log(req.body)
        const { contact_id } = data

        let outData = await axios.get(
            `https://interactlyvideo-team.myfreshworks.com/crm/sales${contact_id}`,

            {
                headers: {
                    Authorization: `Token token=${apiKey}`,
                },
            }
        )
        res.json(outData.data)
    }
    catch (error) {
        res.status(500).send({ status: false, message: error.message })
    }
}


// Update Contact endpoint
const updateContactWithCRM = async (req, res) => {
    const { contact_id, new_email, new_mobile_number } = req.body;


    try {
        const outData = await axios.put(
            `${baseurl}/${contact_id}`,
            {
                email: new_email,
                mobile_number: new_mobile_number,
            },
            {
                headers: {
                    Authorization: `Token token=${apiKey}`,
                },
            }
        );

        res.json(outData.data);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }

}

const deleteContactWithCMR = async (req, res) => {
    try {
        const { contact_id } = req.body
        const deleteData = await axios.delete(
            `${baseurl}/${contact_id}`,
            {
                headers: {
                    Authorization: `Token token=${apiKey}`,
                }
            }
        )
  res.status(200).json({
    status:true,
    message:deleteData.data
  })
    }
    catch (error) {
        res.status(500).send({
            status: false,
            message: error.message
        })
    }
}

module.exports = { createContactWithCrm, getContactWithCRM, updateContactWithCRM ,deleteContactWithCMR}