import { AppLayout, Main, MasterBenefits, MasterPromoSection } from '@/widgets';

const MasterPreLogin = () => {
    return (
        <AppLayout showAuthButtons={true}>
            <Main>
                <div className="bg-white">
                    <div className="container">
                        <MasterPromoSection />
                        <MasterBenefits />
                    </div>
                </div>
            </Main>
        </AppLayout>
    );
};

export { MasterPreLogin };
