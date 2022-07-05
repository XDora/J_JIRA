import { useEffect, useState } from 'react';

export const isFalsy = (value: string): boolean =>
    value === '0' ? false : !value;

// 获取一个value值不为空的对象
export const cleanObject = (object: object) => {
    // 在函数中，改变原对象是不可取的
    const result = { ...object };
    Object.keys(object).forEach((key) => {
        // @ts-ignore
        const value = object[key];
        // 如果value值为0，这是我们把他排除在外，但是我们时需要它的，这是就需要使用isFalsy函数，保留0这个值
        // if (!value) {
        if (isFalsy(value)) {
            // @ts-ignore
            delete result[key];
        }
    });
    return result;
};

//  自定义hooks：
//     只能以use开头命名,否则会报错
//     因为自定义hook和react自带hook不能在普通函数中运行，他只能在其他hooks和函数组件中运行，
//     所以自定义hook必须以use开头，react才知道他是自定义hooks。

// 实现在函数组件只执行一次
export const useEffectOnce = (callback: () => void) => {
    useEffect(callback, []);
};

// const debounce = (func: () => void, delay: number) => {
//     // 闭包
//     let timeout: NodeJS.Timeout;
//     return () => {
//         if (timeout) {
//             clearTimeout(timeout);
//         }
//         timeout = setTimeout(() => {
//             func();
//         }, delay);
//     };
// };

// const log = debounce(() => console.log('call'), 5000);

// debounce 原理
// 一定要理解：这三个函数都是同步操作，所以她们都是在 0~1s 这个时间段内瞬间完成的
// 三个log() 执行之后，只剩下第三个log的timeout在独自等待了

export const useDebounce = <V>(value: V, delay?: number) => {
    const [debouncefValue, setDebounceValue] = useState(value);

    useEffect(() => {
        // 每次在value变化以后，设置一个定时器
        const timeout = setTimeout(() => setDebounceValue(value), delay);
        // 每次在上一个useEffect处理完以后运行
        return () => clearTimeout(timeout);
    }, [value]);

    return debouncefValue;
};
