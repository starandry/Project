import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/app/providers';
import { setUserType } from '@/features/user-type';
import { UserType } from '../model/bannerTypes';

export const useBanner = () => {
    const dispatch = useDispatch();
    const userType = useSelector((state: RootState) => state.userType.userType);

    const handleUserTypeChange = (type: UserType) => {
        dispatch(setUserType(type));
    };

    return {
        userType,
        handleUserTypeChange,
    };
};
