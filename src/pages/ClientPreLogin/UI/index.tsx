import { AppLayout, Main, ClientPromoSection } from '@/widgets';

const ClientPreLogin = () => {
    return (
        <AppLayout>
            <Main>
                <div className="bg-white">
                    <div className="container">
                        <ClientPromoSection />
                    </div>
                </div>
            </Main>
        </AppLayout>
    );
};

export { ClientPreLogin };
