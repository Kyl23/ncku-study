import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import { useRouter } from 'next/router';
import { FC, useContext } from 'react';

import { useMedia } from '@/utils/index';
import { GlobalLayoutContext } from '~/src/contexts/GlobalLayoutContext';
import SideBarItems from './SideBarItems';
import { DrawerContent, useStyle } from './style';
import useInitUserModeByRoute from './useInitUserModeByRoute';
import useSideBarClick from './useSideBarClick';

const drawerWidth = 110;

interface SideBarProps {
    open: boolean;
    onClose: () => void;
}

const SideBar: FC<SideBarProps> = ({ open, onClose: handleClose }) => {
    const styles = useStyle();
    const router = useRouter();
    const device = useMedia();
    const { isLoggedIn, mode, setMode } = useContext(GlobalLayoutContext);

    useInitUserModeByRoute(router, setMode);
    const { handleClick, handleToggle } = useSideBarClick({
        handleClose,
    });

    return (
        <Drawer
            anchor="left"
            className={styles.drawer}
            variant={device === 'PC' ? 'persistent' : 'temporary'}
            open={open}
            onClose={handleToggle}
            style={{ width: drawerWidth }}
            classes={{
                paper: styles.drawerPaper,
            }}
        >
            <DrawerContent>
                <List component="nav">
                    <SideBarItems
                        isLoggedIn={isLoggedIn}
                        mode={mode}
                        onClick={handleClick}
                    />
                </List>
            </DrawerContent>
        </Drawer>
    );
};

export default SideBar;
