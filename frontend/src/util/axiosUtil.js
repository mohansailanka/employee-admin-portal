import axios from "axios";
import environmentProperties from "../config/environmentProperties";

{/*This function makes an HTTP GET request to the URL specified in environmentProperties.baseUrl to retrieve a list of all employees. It uses the Axios library, which is commonly used for making HTTP requests in JavaScript.*/}

export async function getAllEmployees() {
    try {
        let response = await axios.get(`${environmentProperties.baseUrl}`);
        return response.data;
    } catch (error) {
        console.log(error);
        return [];
    }
}
{/*This function is used to update the data of a specific employee with the given id. It makes an HTTP PUT request to the URL constructed by appending the id to environmentProperties.baseUrl*/}

export async function updateEmployeeData(id, body) {

    try {
        let response = await axios.put(`${environmentProperties.baseUrl}/${id}`, body);
        if (response.status > 200 && response.status < 300) {
            return true;
        }
    } catch (error) {
        console.log(error);
    }
    return false;
}
{/*This function is used to delete an employee with the specified id. It makes an HTTP DELETE request to the URL constructed by appending the id to environmentProperties.baseUrl*/}

export async function deleteEmployee(id) {
    try {
        let response = await axios.delete(`${environmentProperties.baseUrl}/${id}`);
        if (response.status > 200 && response.status < 300) {
            return true;
        }
    } catch (error) {
        console.log(error);
    }
    return false;
}
{/*This function is used to add a new employee by sending a POST request to environmentProperties.baseUrl with the provided data as the payload.*/}

export async function addEmployee(data) {
    try {
        let response = await axios.post(`${environmentProperties.baseUrl}/`,data);
        if (response.status > 200 && response.status < 300) {
            return true;
        }
    } catch (error) {
        console.log(error);
    }
    return false;
}