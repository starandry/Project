import React from 'react';
import { MasterExperience } from './UI/MasterExperience';

type Props = {
    index?: number;
};

const MasterExperienceContainer: React.FC<Props> = () => {
    return <MasterExperience />;
};

export { MasterExperienceContainer };
