import React, { useCallback, useEffect, useRef, useState } from 'react'
import { DataTable } from 'primereact/datatable'
import { Column } from 'primereact/column'
import { headerFormatter } from '../util/CommonUtils'
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext'
import { getAllEmployees, updateEmployeeData, deleteEmployee } from '../util/axiosUtil';
import { Toast } from 'primereact/toast';

export default function EmployeeDatatable() {

    const fields = ['id', 'fullname', 'email', 'phone_number', 'address', 'job_title', 'department', 'start_date', 'salary', 'payment_method', 'bank_account_details']

    const [employeeData, setEmployeeData] = useState([]);

    const toast = useRef(null);

    const show = (severity, summary, detail) => {
        toast.current.show({ severity, summary, detail});
    };

    const textEditor = (options) => {
        return <InputText type="text" value={options.value} onChange={(e) => options.editorCallback(e.target.value)} />;
    }

    const columns = fields.map((field, index) => <Column field={field} key={index} editor={textEditor} header={headerFormatter(field)} />)

    useEffect(() => {
        async function fetchData() {
            const data = await getAllEmployees();
            setEmployeeData(data)
        }

        fetchData();
    }, [])

   
    const updateEmployee = useCallback((id, newEmployeeData, updatedEmployeeData) => {
        const updated = updateEmployeeData(id, updatedEmployeeData);
        if (updated) {
            setEmployeeData(newEmployeeData);
            show("success", "Updated Employee", `Employee id - ${id} updated successfully`)
        } else {
            show("error", "Failed to update", `Employee id - ${id} upation failed`)
        }
    }, [])

    const onRowEditComplete = ({ newData, index }) => {
        let newEmployeeData = [...employeeData];
        newEmployeeData[index] = newData;
        updateEmployee(newData.id, newEmployeeData, newData);
    }

    const handleEmployeeDelete = rowData => {
        const employeeId = rowData.id;
        const deleted = deleteEmployee(employeeId);
        if (deleted) {
            const newEmployeeData = employeeData.filter(employee => employee.id !== employeeId);
            setEmployeeData(newEmployeeData);
            show("success", "Deleted Employee", `Employee id - ${employeeId} deleted successfully`)
        } else {
            show("error", "Failed to Delete", `Employee id - ${employeeId} deletion failed`)
        }
    }

    const deleteBody = rowData => {
        return <Button label={"Delete"} severity='danger' onClick={() => handleEmployeeDelete(rowData)}/>
    }



    return (
        <div className='Employee-Datatable'>
            <Toast ref={toast} />
            <DataTable value={employeeData} editMode='row' stripedRows onRowEditComplete={onRowEditComplete} height={"500px"}>
                {columns}
                <Column rowEditor header="Edit" bodyStyle={{ textAlign: 'center' }}></Column>
                <Column header="Delete" body={deleteBody}  />
            </DataTable>
        </div>
    )
}
