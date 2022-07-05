import React, { useEffect, useState } from 'react';
export interface IUsers {
    id: string;
    name: string;
    email: string;
    organization: string;
    title: string;
}

interface ISearchPanel {
    param: {
        name: string;
        personId: string;
    };
    setParam: (param: ISearchPanel['param']) => void;
    users: IUsers[];
}

function SearchPanel({ param, setParam, users }: ISearchPanel) {
    return (
        <form>
            <div>
                {/* setParam(Object.assign({},param,{name:e.target.value})) */}
                <input
                    type="text"
                    value={param.name}
                    onChange={(e) => {
                        setParam({ ...param, name: e.target.value });
                    }}
                />
                <select
                    value={param.personId}
                    onChange={(e) =>
                        setParam({ ...param, personId: e.target.value })
                    }
                >
                    <option value="">负责人</option>
                    {users.map((user) => (
                        <option value={user.id} key={user.id}>
                            {user.name}
                        </option>
                    ))}
                </select>
            </div>
        </form>
    );
}

export default SearchPanel;
