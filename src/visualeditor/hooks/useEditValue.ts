import {useCallback, useEffect, useState} from 'react';

export const useEditValue = <T = any>(
    value: T,
    onChange: (val: T) => void
): [T, (val: T) => void, () => void, () => void] => {
    const [innerValue, setInnerValue] = useState<T>(value);

    useEffect(() => {
        setInnerValue(value);
    }, [value]);

    const submit = useCallback(() => {
        onChange(innerValue);
    }, [innerValue, onChange]);

    const reset = useCallback(() => {
        setInnerValue(value);
    }, [value]);

    return [innerValue, setInnerValue, submit, reset];
};
