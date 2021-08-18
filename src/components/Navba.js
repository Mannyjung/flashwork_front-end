import React, { useState } from 'react'
import {
  Form, Input
} from 'reactstrap';
import '../css/cardhome.css';


import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ManageProfile from '../page/Manageuser';
// import HomeIcon from '@material-ui/icons/Use'
import Combinework from '../page/Combinework';
import Checkwork from '../page/Checkwork';
import Upstatus from '../page/Upstatus';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import EmpFl from '../page/EmploymentFl';
import EmpUser from '../page/EmploymentEpy';
import HisEmp from '../page/HisworkEmp';
// page
import Home from '../page/Home';
import Login2 from '../page/LoginV2';
import Register from '../page/Register';
import Work from '../page/Work.js';
import Post from '../page/Post';
import RePassword from '../page/RePassword';
import Category from '../page/Category/Category';
import ReportFree from '../page/ReportFree';
import ReportAdmin from "../page/ShowReport";
import SelectPost from '../page/SelectPost';
import Comment from '../page/Comment';
import Review from '../page/Review';
import Chat from '../page/Chat';
import PersonalFree from '../page/PersonalFree';
import PersonalEmp from '../page/PersonalEmp';
import HisFree from '../page/HisworkFree';
import Managemain from '../page/Category/managemaincate';
import SubByMain from '../page/Category/SubByMain';
import Maincategory from '../page/Category/Maincate';
import Subcategory from '../page/Category/Subcate';
import Mypost from '../page/Mypost';
import Editpost from '../page/EditPost';
import ShowPackage from '../page/ShowPackage';
import PhohosMypost from '../page/PhotosMypost';
import Showsearchwork from '../page/Search';
import Useraccount from '../page/Useraccount';
import ProfileFreeforadmin from '../page/ProfileFreeforadmin';
import ProfileEmpforadmin from '../page/ProfileEmpforadmin';
import Nextpage from '../page/Nextpage';
// components
import Barstep from '../content/Barstep/MainBar';
// import Prof from './Profile';
// import Footer from './Footer';
//css
import '../css/nav.css';
// content
import FL from '../content/regfl/MainFl';
import EMP from '../content/regemp/MainEmp';
const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
  },
  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerClose: {
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: theme.spacing(7) + 1,
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9) + 1,
    },
  },
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
  },
  content: {
    flexGrow: 1,
    paddingTop: theme.spacing(5)

  },
  palette: {
    primary: '#ff5722',
    secondary: '#bf360c',
  },
}));

export default function MiniDrawer() {
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const [searchwork, setSearchwork] = useState([]);


  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // const url = "http://localhost/flashwork_api/public/search/" + searchwork;
    // axios.get(url)
    //   .then((response) => {
    //     setResult(response.data);
    //   }) 
      // .then(() => {
        window.location.assign("/search/" + searchwork);
      // })
    console.log(searchwork);
  }

  return (
    <div className={classes.root} >
      <CssBaseline />
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}

      >
        <Toolbar style={{ backgroundColor: '#ff5722' }} >
          <IconButton

            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            className={clsx(classes.menuButton, {
              [classes.hide]: open,
            })}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap>
            FLASH WORK
          </Typography>

          <Form className="input-search" onSubmit={handleSubmit}>

            <Input
              onChange={(e) => setSearchwork(e.target.value)}
              type="text"
              name="search-work"
              id=""
              placeholder="search"
            />

          </Form>

        </Toolbar>
      </AppBar>

      <Drawer

        variant="permanent"
        className={clsx(classes.drawer, {
          [classes.drawerOpen]: open,
          [classes.drawerClose]: !open,
        })}
        classes={{
          paper: clsx({
            [classes.drawerOpen]: open,
            [classes.drawerClose]: !open,
          }),
        }}
      >
        <div className={classes.toolbar} style={{ fontSize: '18px' }}>
          โปรไฟล์ & เมนู
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          </IconButton>
        </div>
        <Divider />
        <Barstep />
        {/* <Nest/> */}
      </Drawer>
      <main className={classes.content}>

        <Router>
          <Switch>
            <Route exact path="/" component={Home} />,
            <Route path="/home" component={Home} />,
            <Route path="/repassword/:us/:id" component={RePassword} />,
            <Route path="/login2" component={Login2} />,
            <Route path="/register" component={Register} />,
            <Route path="/work" component={Work} />,
            <Route path="/post" component={Post} />,
            <Route path="/fl" component={FL} />,
            <Route path="/emp" component={EMP} />
            <Route path="/combin" component={Combinework} />,
            <Route path="/checkwork" component={Checkwork} />,
            <Route path="/upstatus/:id" component={Upstatus} />,
            <Route path="/category" component={Category} />,
            {/* <Route path="/editcate/:id" component={Editcate} />, */}
            <Route path="/freeReport" component={ReportFree} />,
            <Route path="/reportAdmin" component={ReportAdmin} />,
            <Route path="/SelectPost/:id" component={SelectPost} />,
            <Route path="/Comment/:id" component={Comment} />,
            <Route path="/review" component={Review} />,
            <Route path="/chat" component={Chat} />,
            <Route path="/profile/:id" component={PersonalFree} />,
            <Route path="/profileEmp/:id" component={PersonalEmp} />,
            <Route path="/history" component={HisFree} />,
            <Route path="/managemaincate" component={Managemain} />,
            {/* <Route path="/editmaincate/:id" component={Editmain} />, */}
            <Route path="/subbymain/:id" component={SubByMain} />,
            <Route path="/manageprofile" component={ManageProfile} />,
            <Route path="/employmentFl" component={EmpFl} />,
            <Route path="/employmentEpy" component={EmpUser} />,
            <Route path="/historyEmp" component={HisEmp} />,
            <Route path="/maincate/:id" component={Maincategory} />,
            <Route path="/subcate/:id" component={Subcategory} />,
            <Route path="/mypost" component={Mypost} />,
            <Route path="/editMypost/:id" component={Editpost} />,
            <Route path="/mypackage/:id" component={ShowPackage} />,
            <Route path="/myphotos/:id" component={PhohosMypost} />,
            <Route path="/search/:id" component={Showsearchwork} />,
            <Route path="/Useraccount/:id" component={Useraccount} />,

            <Route path="/ProfileFreeforadmin/:id" component={ProfileFreeforadmin} />,
            <Route path="/ProfileEmpforadmin/:id" component={ProfileEmpforadmin} />,
            <Route path="/nextpage" component={Nextpage} />,
          </Switch>
          {/* <Footer /> */}
        </Router>
      </main>
    </div>
  );
}
