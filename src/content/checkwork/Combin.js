import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {Card,CardActionArea,CardActions,CardContent,CardMedia,Button,Typography} from '@material-ui/core';
import bg from '../../img/free.jpg';
const useStyles = makeStyles({
  root: {
    maxWidth: 380,
  },

});

const Combin = () => {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardActionArea>
        <CardMedia

          component="img"
          alt="Contemplative Reptile"
          height="200"
          image={bg}
          title="Contemplative Reptile"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
           ออกแบบโลโก้
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button size="small" color="primary">
         แก้ไข
        </Button>
        <Button size="small" color="primary">
          ดูตัวอย่าง
        </Button>
        <Typography variant="body2" color="textSecondary" component="p"  >
         สถานะ : รอผล
         </Typography>
      </CardActions>
    </Card>
  );
}
export default Combin;