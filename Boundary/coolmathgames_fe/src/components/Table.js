import React from 'react';
import { Table } from 'flowbite-react';

function CustomTable({ headers, rows, onCellClick, statusColor}) {
  return (
    <div className="w-full overflow-x-auto">
      <Table hoverable>
        <Table.Head className='hover:cursor-default'>
          {headers.map((header, index) => (
            <Table.HeadCell key={index} className="bg-gray-300">{header}</Table.HeadCell>
          ))}
        </Table.Head>
        <Table.Body className="divide-y hover:cursor-pointer">
          {rows.map((row , rowIndex) => (
            <Table.Row key={rowIndex} className="bg-white dark:border-gray-700 dark:bg-gray-800">
              {row.map((cell, cellIndex) => (
                <Table.Cell
                  key={cellIndex}
                  className={`whitespace-nowrap font-medium ${cellIndex === 0 ? 'text-gray-900 dark:text-white' : ''}
                  ${cellIndex === 4 ? statusColor(cell) : ''}`}
                  onClick={() => onCellClick && onCellClick(rowIndex, cellIndex)}
                >
                  {cell}
                </Table.Cell>
              ))}
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    </div>
  );
}

export default CustomTable;
