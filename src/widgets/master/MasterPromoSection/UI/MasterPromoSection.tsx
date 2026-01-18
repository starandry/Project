import { Picture } from '@/shared/ui';
import { MasterClientIntro } from '@/widgets';
import { masterIntroContent } from '../../MasterClientIntro/model/masterClientIntroContent';
import styles from './index.module.scss';
import masterPromo from '@/shared/assets/images/masterPromo.png';

const MasterPromoSection = () => {
    return (
        <section className={`flex-between ${styles.section}`}>
            <Picture src={masterPromo} alt={'мастер'} />
            <MasterClientIntro {...masterIntroContent} />
        </section>
    );
};

export { MasterPromoSection };
