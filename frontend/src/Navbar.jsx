import React, { useState } from 'react';
import { Drawer, List, ListItem, ListItemIcon, ListItemText, Toolbar, IconButton} from '@mui/material';
import { IoMenu } from 'react-icons/io5';
import { GrGroup, GrDocumentText } from 'react-icons/gr';
import { LiaReadme } from 'react-icons/lia';
import { TbShieldLock } from 'react-icons/tb';
import { FiHome } from "react-icons/fi";
import { CgProfile } from "react-icons/cg";
import { IoCloseOutline } from "react-icons/io5";
import { LuDoorClosed } from "react-icons/lu";
import { CiLogin } from "react-icons/ci";
import { MdOutlineSpaceDashboard } from "react-icons/md";
import { FaUser } from "react-icons/fa";
import { useMediaQuery } from '@mui/material';
import styles from './Navbar.module.css';

    function NavBar({ user, onLogout}) {

    const [drawerOpen, setDrawerOpen] = useState(false);
    const isMobile = useMediaQuery('(max-width:768px)');

    const toggleDrawer = () => {
        setDrawerOpen(!drawerOpen);
    }

    const drawerItems = [
        { text: 'Home', icon: <FiHome />, link :'/'},
        { text: 'About Us', icon: <GrGroup />, link: '/about' },
        { text: 'Read Me', icon: <LiaReadme />, link: '/readme' },
    ]

    const legalItems = [
        { text: 'Privacy Policy', icon: <TbShieldLock />, link: '/privacy' },
        { text: 'Terms and Conditions', icon: <GrDocumentText />, link: '/tos' },
    ]

    const accountItems = [
        { text: 'Profile', icon: <CgProfile />, link: '/users/me' },
    ]

    return(
        <div className={styles["navbar-container"]}>
            <IconButton onClick={toggleDrawer}>
                <IoMenu />
            </IconButton>

            <Drawer
                className={styles["drawer"]}
                anchor={isMobile ? 'top' : 'left'}
                // variant="temporary"
                sx={{ width: 'auto', minWidth: 'unset'}}
                open={drawerOpen}
                onClose={toggleDrawer}
            >
                <div className={styles["menu-icon"]}>
                    <IconButton onClick={toggleDrawer} className={styles["icon-button"]}>
                        <IoCloseOutline className={styles["icon"]} />
                    </IconButton>
                        <a className={styles["website-name"]} href="/">cursor</a>
                </div>
                <List className={styles["list-items"]}>
                    <p>Navigation</p>
                    {drawerItems.map(({text, icon, link}) => (
                        <ListItem key={text} component="a" href={link} className={styles["list"]}>
                            <ListItemIcon className={styles["list-icons"]}>{icon}</ListItemIcon>
                            <ListItemText primary={text} className={styles["text"]}/>
                        </ListItem>
                    ))}
                    <p>Privacy Policy and Terms</p>
                    {legalItems.map(({text, icon, link}) => (
                        <ListItem key={text} component="a" href={link} className={styles["list"]}>
                            <ListItemIcon className={styles["list-icons"]}>{icon}</ListItemIcon>
                            <ListItemText primary={text} className={styles["text"]}/>
                        </ListItem>
                    ))}
                    <p>Account</p>
                    {user ? (
                        <>
                            {accountItems.map(({text, icon, link}) => (
                                <ListItem key={text} component="a" href={link} className={styles["list"]}>
                                    <ListItemIcon className={styles["list-icons"]}>{icon}</ListItemIcon>
                                    <ListItemText primary={text} className={styles["text"]}/>
                                </ListItem>
                            ))}
                            <ListItem component="a" href="/dashboard" className={styles["list"]}>
                                <ListItemIcon className={styles["list-icons"]}><MdOutlineSpaceDashboard /></ListItemIcon>
                                <ListItemText primary="My Blogs" className={styles["text"]} />
                            </ListItem>
                            <ListItem component="a" onClick={onLogout} className={styles["list"]}>
                                <ListItemIcon className={styles["list-icons"]}><LuDoorClosed /></ListItemIcon>
                                <ListItemText primary="Logout" className={styles["text"]} />
                            </ListItem>
                        </>
                    ) : (
                        <>
                            <ListItem component="a" href="/login" className={styles["list"]}>
                                <ListItemIcon className={styles["list-icons"]}><CiLogin /></ListItemIcon>
                                <ListItemText primary="Login" className={styles["text"]} />
                            </ListItem>
                            <ListItem component="a" href="/register" className={styles["list"]}>
                                <ListItemIcon className={styles["list-icons"]}><FaUser /></ListItemIcon>
                                <ListItemText primary="Register" className={styles["text"]} />
                            </ListItem>
                        </>
                    )}
                </List>
            </Drawer>
        </div>
    );
} // NavBar

export default NavBar