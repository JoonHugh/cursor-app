import React, { useState } from 'react';
import { Drawer, List, ListItem, ListItemIcon, ListItemText, Toolbar, IconButton} from '@mui/material';
import { IoMenu } from 'react-icons/io5';
import { GrGroup, GrDocumentText } from 'react-icons/gr';
import { LiaReadme } from 'react-icons/lia';
import { TbShieldLock } from 'react-icons/tb';
import { FiHome } from "react-icons/fi";
import { CgProfile } from "react-icons/cg";


import styles from './Navbar.module.css';

    function NavBar() {

    const [drawerOpen, setDrawerOpen] = useState(false);

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
            {/* <Toolbar className={styles["toolbar"]}> */}
                <IconButton onClick={toggleDrawer}>
                    <IoMenu />
                </IconButton>
            {/* </Toolbar> */}

            <Drawer
                className={styles["drawer"]}
                anchor="left"
                // variant="temporary"
                sx={{ width: 'auto', minWidth: 'unset'}}
                open={drawerOpen}
                onClose={toggleDrawer}
            >
                {/* <Toolbar className={styles["toolbar"]}> */}
                <div className={styles["menu-icon"]}>
                    <IconButton onClick={toggleDrawer}>
                        <IoMenu className={styles["icon"]} />
                    </IconButton>
                        <a className={styles["website-name"]} href="/">cursor</a>
                </div>
                {/* </Toolbar> */}
                <List className={styles["list-items"]}>
                    <p>Navigation</p>
                    {drawerItems.map(({text, icon, link}) => (
                        <ListItem button key={text} component="a" href={link} className={styles["list"]}>
                            <ListItemIcon className={styles["list-icons"]}>{icon}</ListItemIcon>
                            <ListItemText primary={text} className={styles["text"]}/>
                        </ListItem>
                    ))}
                    <p>Privacy Policy and Terms</p>
                    {legalItems.map(({text, icon, link}) => (
                        <ListItem button key={text} component="a" href={link} className={styles["list"]}>
                            <ListItemIcon className={styles["list-icons"]}>{icon}</ListItemIcon>
                            <ListItemText primary={text} className={styles["text"]}/>
                        </ListItem>
                    ))}
                    <p>Account</p>
                    {accountItems.map(({text, icon, link}) => (
                        <ListItem button key={text} component="a" href={link} className={styles["list"]}>
                            <ListItemIcon className={styles["list-icons"]}>{icon}</ListItemIcon>
                            <ListItemText primary={text} className={styles["text"]}/>
                        </ListItem>
                    ))}
                </List>
            </Drawer>
        </div>
    );
} // NavBar

export default NavBar