import React, { useEffect, useState } from 'react';
import List from './ListTable';
import SearchPanel from './SearchPanel';
import qs from 'qs';
import { cleanObject, useEffectOnce, useDebounce } from '../utils';
const apiUrl = process.env.REACT_APP_API_URL;

function ProjectList() {
    const [list, setList] = useState([]);
    const [users, setUsers] = useState([]);
    const [param, setParam] = useState({
        name: '',
        personId: '',
    });
    const debounceParam = useDebounce(param, 200);

    // 实现在函数组件只执行一次
    useEffectOnce(() => {
        fetch(`${apiUrl}/users`).then(async (responce) => {
            if (responce.ok) {
                setUsers(await responce.json());
            }
        });
    });

    // useEffect(() => {
    //     fetch(`${apiUrl}/users`).then(async (responce) => {
    //         if (responce.ok) {
    //             setUsers(await responce.json());
    //         }
    //     });
    // }, []);

    useEffect(() => {
        fetch(
            `${apiUrl}/projects?${qs.stringify(cleanObject(debounceParam))}`
        ).then(async (responce) => {
            if (responce.ok) {
                setList(await responce.json());
            }
        });
    }, [debounceParam]);

    return (
        <div>
            <SearchPanel param={param} setParam={setParam} users={users} />
            <List list={list} users={users} />
        </div>
    );
}

export default ProjectList;
