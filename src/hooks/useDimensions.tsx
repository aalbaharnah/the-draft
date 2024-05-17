import { useLayoutEffect, useState } from 'react';
import { Dimensions, ScaledSize } from 'react-native';

interface Params {
    window: ScaledSize;
    screen: ScaledSize;
}

export default function useDimensions(dim: 'window' | 'screen') {
    const [dimensions, setDimensions] = useState(Dimensions.get(dim));

    useLayoutEffect(() => {
        const dimensionsChange = (params: Params) => {
            setDimensions(params[dim]);
        };
        const listener = Dimensions.addEventListener('change', dimensionsChange);
        return () => listener.remove();
    }, []);

    return dimensions;
}