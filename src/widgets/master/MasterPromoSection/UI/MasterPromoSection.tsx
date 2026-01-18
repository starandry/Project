import { Picture } from '@/shared/ui';
import { MasterClientIntro } from '../../MasterClientIntro';
import { masterIntroContent } from '../../MasterClientIntro/model/masterClientIntroContent';
import styles from './index.module.scss';

const MasterPromoSection = () => {
    return (
        <section className={`flex-between ${styles.section}`}>
            <Picture src={'/images/masterPromo.png'} alt={'мастер'} />
            <MasterClientIntro {...masterIntroContent} />
        </section>
    );
};

export { MasterPromoSection };
