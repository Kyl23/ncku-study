import type { FC, PropsWithChildren } from 'react';

import Icon from './LoaingIcon';
import { LoadingContainer } from './style';

interface LoadingFrameProps extends PropsWithChildren {
    isFinishRequest: boolean;
}

const LoadingFrame: FC<LoadingFrameProps> = ({ isFinishRequest, children }) => {
    if (!isFinishRequest) {
        return (
            <LoadingContainer>
                <Icon style={{ marginTop: '0' }} />
            </LoadingContainer>
        );
    }

    return <>{children}</>;
};

export default LoadingFrame;
