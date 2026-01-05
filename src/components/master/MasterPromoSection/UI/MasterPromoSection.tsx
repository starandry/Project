import { Picture } from '@/components';
import { MasterClientIntro } from '@/components/master/MasterClientIntro';
import { masterIntroContent } from '@/components/master/MasterClientIntro/model/masterClientIntroContent.tsx';
import styles from './index.module.scss';

const MasterPromoSection = () => {
    return (
        <section className={styles.section}>
            <Picture src={'/images/masterPromo.png'} alt={'мастер'} />
            <MasterClientIntro {...masterIntroContent} />
        </section>
    );
};

export { MasterPromoSection };
