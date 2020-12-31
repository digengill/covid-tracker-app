import React from 'react'
import {Card, CardContent, Typography} from "@material-ui/core"
import './InfoBox.css'
function InfoBox({title, cases, total, ...props}) {
    return (
        <Card onClick={props.onClick} className="app__infobox">
            <CardContent>
                <Typography color="textSecondary">{title}</Typography>
                <h1 className="infobox__cases" color="textSecondary">{cases}</h1>
                <Typography className="infobox__total" color="textSecondary">{total} Total</Typography>
            </CardContent>
        </Card>
    )
}

export default InfoBox
