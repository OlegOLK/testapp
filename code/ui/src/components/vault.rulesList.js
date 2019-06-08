import React from 'reactn';
import { getConfig } from 'radiks';
import { Grid, Card, Avatar, IconButton, Fab, Badge, CardHeader } from '@material-ui/core';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import AddIcon from '@material-ui/icons/Add';
import { BasicRule } from '../../src/models/basicRule';
import { Fragment } from 'react';

const styles = {
    text: {
        fontSize: '1em'
    },
    icon: {
        fontSize: '1em'
    },
    margin: {
        //padding: theme.spacing(0, 2),
        //margin: theme.spacing(-5),
    },
    container: {
        flexGrow: 1,
        // textAlign: "center"
    },
    card: {
        // minWidth: 275,
        minHeight: '300px',
        maxWidth: '300px',
        textAlign: "center",
        margin: 10,
    },
    extendedIcon: {
        //marginRight: theme.spacing(1),
    },
    fab: {
        marginTop: 10,
        marginBottom: 10
        //margin: theme.spacing(1),
    },
};

export class RulesList extends React.Component {
    constructor(props) {
        super(props);

        this.state = { loading: true, rules: [] }
    }

    componentDidMount() {
        const items = [];
        const { userSession } = getConfig();
        if (!userSession.isUserSignedIn()) {
            return items;
        }
        BasicRule.fetchList()
            .then(rules => {
                rules.forEach(r => {
                    BasicRule.findById(r._id)
                        .then(rule => {
                            console.log(rule);
                            items.push(rule);
                        })
                        .then(() => {
                            const { rules } = this.state;
                            rules.push(items.pop());
                            this.setState({ rules: rules })
                        });
                });

                this.setState({ loading: false });
            });
    }

    renderList = data => {
        let list = [];
        
        for(let i = 0; i < data.length; i++){
            list.push(
            <Grid item xs={12} md={3} key={data[i]._id}>
                <Card key={data[i]._id} style={styles.card}>
                <CardHeader
                    avatar={
                        <Avatar aria-label="Recipe" >
                            R
                    </Avatar>
                    }
                    action={
                        <IconButton>
                            <MoreVertIcon />
                        </IconButton>
                    }
                    title={data[i].attrs.title}
                />


                <Fab
                    variant="extended"
                    size="small"
                    color="primary"
                    aria-label="Add"
                    style={styles.fab}
                >
                    <AddIcon style={styles.extendedIcon} />
                    <Badge color="secondary" style={styles.margin} badgeContent={data[i].conditions.length} >
                        Conditions
                </Badge>
                </Fab>
<br/>

                <Fab
                    variant="extended"
                    size="small"
                    color="primary"
                    aria-label="Add"
                >
                    <AddIcon />
                    <Badge color="secondary" badgeContent={data[i].actions.length}>
                        Add actions
                </Badge>
                </Fab>
            </Card>
            </Grid>
            )
        }

        return list
    }

    render() {
        const { loading, rules } = this.state;
                
        return (
            <Fragment>
                {loading ? "Loading..." : this.renderList(rules)}
            </Fragment>
        )
    }
}