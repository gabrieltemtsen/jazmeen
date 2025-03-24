import { TokenContext, TokenContextType } from '@/app/context/token';
import { useContext } from 'react';
import { useMounted } from '../useMounted';

export const useTokens = (): TokenContextType => {
    useMounted();
    const context = useContext(TokenContext);
    if (!context) {
        throw new Error('useTokens must be used within a TokenProvider');
    }
    return context;
};
