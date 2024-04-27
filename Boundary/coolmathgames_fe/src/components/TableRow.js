import React from 'react';
import { Table } from 'flowbite-react';


function TableRow({account, onClick, statusColor}) {

    return (
        <Table.Row 
            className="bg-white dark:border-gray-700 dark:bg-gray-800"
            onClick={() =>onClick(account)}>
            <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white p-6">
                {account.fullName}
            </Table.Cell>
            <Table.Cell>
                {account.username}
            </Table.Cell>
            <Table.Cell>
                {account.email}
            </Table.Cell>
            <Table.Cell>
                {account.type}
            </Table.Cell>
            <Table.Cell>
                <span className={`${statusColor}`}>
                    {account.status}
                </span>
            </Table.Cell>
        </Table.Row>
    );
}

export default TableRow;