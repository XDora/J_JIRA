import React from 'react';
import { IUsers } from './SearchPanel';

interface IList {
    id: string;
    name: string;
    personId: string;
    organization: string;
    created: string;
    pin: boolean;
}

interface IListTable {
    list: IList[];
    users: IUsers[];
}

function ListTable({ list, users }: IListTable) {
    return (
        <table>
            <thead>
                <tr>
                    <th>名称</th>
                    <th>负责人</th>
                </tr>
            </thead>
            <tbody>
                {list?.map((project) => (
                    <tr key={project.id}>
                        <td>{project.name}</td>
                        {/* undefined.name */}
                        <td>
                            {users.find((user) => user.id === project.personId)
                                ?.name || '未知'}
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
}

export default ListTable;
