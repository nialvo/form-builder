
import React, { useState, useEffect } from "react";
import { queries, mutations, Auth, parseProps } from "../utils"
import { useParams } from "react-router-dom"

import * as uuid from "uuid";



import {
    Fab,
    Container,
    CssBaseline,
    Paper,
    Typography,
    Box,
    Link,
    Avatar,
    Skeleton,
    Modal,
    TextField,
    Button,
    Divider,
    Card
    
} from "@mui/material";


import AddIcon from '@mui/icons-material/Add';
import MoreHorizFilled from '@mui/icons-material/MoreHoriz';
import EditIcon from '@mui/icons-material/Edit';
import TitleRounded from '@mui/icons-material/TitleRounded';

import FormGroup from '@mui/material/FormGroup';
import Checkbox from '@mui/material/Checkbox';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';


const gray = {
    color: "rgba(0,0,0,0.5)"
}

const editiconsx = {

    opacity:".9",
    position: "absolute",
    top: "0px",
    right: "0px",
    fontSize:"30px",
    opacity: ".25",
    "&:hover": { opacity: ".85" }
} 

const iconboxsx = {
    position: "absolute",
    top: "0px",
    left: "0px",
    width: "100%",
    height: "100%",
    opacity: ".0",
    "&:hover": { 
        opacity: "1.0",
        cursor: "pointer" }    
}

const boxsx = {
    
    position:"relative", 
    width:"100%",
}

const formsx = {
    /* Auto layout */
    
    padding: "63px 61px 63px 61px",
    overflow: "auto",

    position: "absolute",
    width: "800px",
    height: "1040px",
    left: "382px",
    top: "83px",

    /* Light/Background/Paper */
    background: "#FFFFFF",

    /* Elevation/1 */
    boxShadow: "0px 2px 1px -1px rgba(0, 0, 0, 0.2), 0px 1px 1px rgba(0, 0, 0, 0.14), 0px 1px 3px rgba(0, 0, 0, 0.12)",
    borderRadius: "4px"
}

const toolssx = {

    width: "673px",
    height: "40px",
    display: "flex",
    margin: "auto",
    display:"flex",
    alignItems: "center"
}

const toolboxsx = {
    display:"flex",
    marginRight: "25px",
    "&:hover": { 
        boxShadow: 15,
        cursor: "pointer" },
}

const fontsx = {
    fontFamily: 'Roboto',
    fontStyle: "normal",
    fontWeight: "400",
    //display: flex;
    //align-items: center;
}

const titlesx = {
    fontSize: "34px",
    lineHeight: "123.5%",
    letterSpacing: "0.25px"

}

const headsx = {
    fontSize: "24px",
    lineHeight: "123.5%",
    letterSpacing: "0.25px"

}

const normsx = {
    fontSize: "16px",
    lineHeight: "150%",
    letterSpacing: "0.15px"

}

const subsx = {
    fontSize: "12px",
    lineHeight: "166%",
    letterSpacing: "0.4px"

}

const centered = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
}
const plussx = {
    width: "20px"
}
const hoversx = {
    "&:hover": { cursor: "pointer" }
}


const editingRender = ( piece ) => {

    if(piece._type == "header")

  return (
    <div >
      Yoo
    </div>
  );
};

const NormalRender = ( {piece} ) => {
    let parsed= parseProps(piece.props);
    if(piece._type == "header"){
        return (
            <>
                <Typography sx={{...fontsx,...headsx}}>{parsed.htext}</Typography>
                {parsed.hsubtext && <Typography sx={{...fontsx,...normsx}}>{parsed.hsubtext}</Typography>}
               
            </>
        )
    }else if (piece._type == "break"){
        return (
            <>
                <br/>
                <Divider variant="middle" />
                
            </>    
        )
    }else if (piece._type == "question"){

        if(parsed.qtype == "text"){
            //if text box height is given use box, else line
            if(parsed.inSize && parsed.inSize!=1){
                let r = parsed.inSize;
                return (
                    <>
                    <Typography sx={{...fontsx,...normsx}}>{parsed.qtext}</Typography>
                    {parsed.qsubtext  && <Typography sx={{...fontsx,...subsx}}>{parsed.qsubtext}</Typography>}<br/>
                    <TextField
                        id="outlined-multiline-static"
                        //label="Multiline" 
                        //maybe put the title here idk
                        multiline
                        rows={r}
                        placeholder="Maybe add a placeholder prop idk"
                    />

                    </>
                )
            } else{
                return (
                    <>
                    <Typography sx={{...fontsx,...normsx}}>{parsed.qtext}</Typography>
                    {parsed.qsubtext  && <Typography sx={{...fontsx,...subsx}}>{parsed.qsubtext}</Typography>}
                    <TextField id="standard-basic" label="This should be a prop" variant="standard" />

                    </>
                )

            }
            
        }else if (parsed.qtype == "check"){
            var renoc = [];
            for (var i = 0; i < parsed.qoptions.length; i++) {renoc.push(<FormControlLabel control={<Checkbox />} label={parsed.qoptions[i]} />)}
            return (
                <>
                    <Typography sx={{...fontsx,...normsx}}>{parsed.qtext}</Typography>
                    <FormLabel >{parsed.qsubtext}</FormLabel>
                    <FormGroup>
                        {renoc}
                    </FormGroup>

                </>
            )
        }else if (parsed.qtype == "radio"){
            //if text box height is given, set it, else 1 line
            var renor = [];
            for (var i = 0; i < parsed.qoptions.length; i++) {renor.push( <FormControlLabel  control={<Radio />} value={parsed.qoptions[i]} label={parsed.qoptions[i]}/>)}
                ////okok the component below has to be a unique identifier, right?
            return (
                <>
                    <Typography sx={{...fontsx,...normsx}}>{parsed.qtext}</Typography>
                    <FormControl>
                        <FormLabel >{parsed.qsubtext}</FormLabel>
                        <RadioGroup aria-labelledby="demo-radio-buttons-group-label"  name="radio-buttons-group">
                            {renor}
                        </RadioGroup>
                    </FormControl>

                    

                   


              
  
                </>
            )
        }else {
            return (
                <div>
                    <h4> A qtypeless question appeared in the wild</h4>
                </div>
                
            )
    
        }
    }else {
        return (
            <div>
                <h4> A typeless piece appeared in the wild</h4>
            </div>
            
        )
    } 
};

const Titler = ({form}) => {

    

    return (
        <>
            <Typography sx={{...fontsx,...titlesx}}>{form.title}</Typography>
            {form.description && <Typography sx={{...fontsx,...normsx}}>{form.description}</Typography>}
            <br/>
            <Divider variant="middle" />
            <br/>
        </>
    
    )
};

function Editor ({pieces}) {

    //prob add key below
    //this is where we check which piece is in editing mode, now we only have non editing mode 
    var renP = [];
    for (var i = 0; i < pieces.length; i++) {
        //if not currently being edited then normal render
        renP.push( 
            <>
            <Box sx={boxsx}  > 
                <Box sx={iconboxsx}>
                    <EditIcon sx={editiconsx}/>
                </Box>
                <NormalRender sx={{backgroundColor:"blue"}} piece={pieces[i]} Key={i} />
                <br/><br/> 
            </Box>
            </>
        );
    }
    return (
        <>{renP}</>
    )

}



function ALTEditForm() {


    

    ////////////////////////scratch/function area/////////////////////////////////////////////////////////////////////

    const [pieces, setPieces] = useState([]);
    const [aPiece, setAPiece] = useState({});
    const [titledesc, setTitleDesc] = useState({});

    useEffect(() => {

        ///dummy data///////////////////////////////////////////////////////////////

        let form1 = {
            _id : 1999,
            title : "Ye Examplar",
            published: true,
            description : "'tis to prove the encoded instructions",
            pieces:[ 
            {_id: "89", _type:"question", props:[{key:"qtype",value:"text"},{ key:"qtext",value:"Why?"},{ key:"qsubtext", value: "srsly?"},{key:"inSize", value:"5" }]},
            {_id: "89", _type:"question", props:[{key:"qtype",value:"text"},{ key:"qtext",value:"Why?"},{ key:"qsubtext", value: "srsly?"}]},
            {_id: "89", _type:"question", props:[{key:"qtype", value:"radio"},{ key:"qtext", value:"Choose wisely?"},{ key:"qoptions", value:"7"},{ key:"qoptions", value: "a goat"},{ key:"qoptions", value:"a chicken"}]},
            {_id: "89", _type:"break", props:[]},
            {_id: "89", _type:"header", props:[{key:"htext", value:"Now listen"},{ key:"hsubtext", value: "very carefully"}]},
            {_id: "89", _type:"header", props:[{key:"htext", value:"Keep listening"}]},
            {_id: "89", _type:"question", props:[{key:"qtype", value:"check"},{ key:"qtext", value:"Choose recklessly"}, {key:"qsubtext", value:"dooo it, doo it"},{ key:"qoptions", value:"7"},{ key:"qoptions", value: "a goat"},{ key:"qoptions", value:"a chicken"}]},
            {_id: "89", _type:"question", props:[{key:"qtype", value:"radio"},{ key:"qtext", value:"Choose recklessly"}, {key:"qsubtext", value:"dooo it, doo it"},{ key:"qoptions", value:"7"},{ key:"qoptions", value: "a goat"},{ key:"qoptions", value:"a chicken"}]}
            ]
    
        }

        let piece1 = { _type:"question", props:[{key:"qtype", value:"check"},{ key:"qtext", value:"Choose recklessly"}, {key:"qsubtext", value:"dooo it, doo it"},{ key:"qoptions", value:"7"},{ key:"qoptions", value: "a goat"},{ key:"qoptions", value:"a chicken"}]}


        ///end dummy data////////////////////////////////////////////////////////////////////




        setTitleDesc({title: form1.title, description: form1.description})

        //setPieces(form1.pieces);//replace this line with setPieces(<get pieces of this form>)/SEE AT BOTTOM /////////////////////////******************
        //console.log(pieces);
        setPieces(form1.pieces.map((piece)=>{
                let z = {
                    _id: piece._id,
                    piid: uuid.v4(), 
                    _type: piece._type, 
                    props: piece.props
                }
                return z;   
            }));
        
        
    }, [])

    function removeIds(){
        setPieces(pieces.map(  (piece)=>{
            if(piece._id){
                let z = {
                    _id: piece._id,
                    _type: piece._type, 
                    props: piece.props
                };
                return z;
            }else{
                let z = { 
                    type: piece.type, 
                    props: piece.props
                };
                return z;
            }   
        }));
    }



    function saveToDb(){
        removeIds();
        console.log(pieces);//replace this line with a mutation to save pieces to form!!!!!!!!!!********************************************
    }


    
    
    function logPieces(){
        console.log(pieces);
    }

    function addAPiece(){
        
        console.log(pieces);
    }

    


    
    ////////////////////////end scratch/function area/////////////////////////////////////////////////////////////////////


    return(
        <Card sx={formsx}>
            <Titler form={titledesc}/>
            <Editor pieces={pieces}/>
            <Card sx={toolssx}>
                <Box sx={toolboxsx} >
                    <AddIcon sx={{...plussx,...gray}} fontSize={"medium"} />
                    <Typography sx={{...fontsx,...normsx,...gray}}>Add Question</Typography>
                </Box>
                <Box sx={toolboxsx}>
                    <TitleRounded sx={{...plussx,...gray}} fontSize={"medium"} />
                    <Typography sx={{...fontsx,...normsx,...gray}}>Add Header</Typography>  
                </Box>
                <Box sx={toolboxsx}>
                    <MoreHorizFilled sx={{...plussx,...gray}} fontSize={"medium"} />
                    <Typography sx={{...fontsx,...normsx,...gray}}>Add Divider</Typography>  
                </Box>
                <Box sx={toolboxsx} onClick={()=>{logPieces()}}>
                    <AddIcon sx={{...plussx,...gray}} fontSize={"medium"} />
                    <Typography sx={{...fontsx,...normsx,...gray}}>log pieces</Typography>
                </Box>
                <Box sx={toolboxsx} onClick={()=>{addAPiece()}}>
                    <AddIcon sx={{...plussx,...gray}} fontSize={"medium"} />
                    <Typography sx={{...fontsx,...normsx,...gray}}>add piece </Typography>
                </Box>
                <Box sx={toolboxsx} onClick={()=>{removeIds()}}>
                    <AddIcon sx={{...plussx,...gray}} fontSize={"medium"} />
                    <Typography sx={{...fontsx,...normsx,...gray}}>remove ids </Typography>
                </Box>

            </Card>
        </Card>
        
    )


    

    
}

export default ALTEditForm;



/*
let { id } = useParams()

    let [loading, setLoading] = useState(true)
    let [pieces, setPieces] = useState([])

    // same logic as Dashboard.js
    useEffect(() => {
        async function req() {
            let loggedIn = Auth.loggedIn()
            if (!loggedIn) {
                window.location.replace(window.location.origin + "/login")
                return
            }
            let reqPieces = (await queries.getPiecesByID(id)).result ?? []
            if (!reqPieces) {
                window.location.replace(window.location.origin + "/dashboard")
            }
            else {
                setPieces(reqPieces)
                setLoading(false)
            }
        }
        req()
    }, [])
*/