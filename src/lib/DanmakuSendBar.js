import React from "react";
import Paper from "@material-ui/core/Paper";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import Popper from "@material-ui/core/Popper";
import Grow from "@material-ui/core/Grow";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import MenuList from "@material-ui/core/MenuList";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Radio from "@material-ui/core/Radio";
import {Typography} from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import Slider from "@material-ui/core/Slider";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import InputBase from "@material-ui/core/InputBase";
import Divider from "@material-ui/core/Divider";
import ArrowUpwardRoundedIcon from "@material-ui/icons/ArrowUpward";
import {StyledMenuItem,eventEmitter} from "./Helper";

class DanmakuSendBar extends React.Component {

    constructor(props) {
        super(props);
        this.state={
            msg:null,
            anchorEl:null,
            open:false,
            sizeValue:"normal",
            colorValue:"#FFFFFF",
        }
        this.anchorRef = React.createRef();
    }

    handleChange=(event)=> {
        this.setState({msg: event.target.value});
    }

    handleClick=(event)=> {
        this.setState({anthorEl:event.currentTarget});
    };

    handleToggle=()=> {
        this.setState({open:!this.state.open})
    };

    handleSizeChange=(event)=> {
        this.setState({sizeValue:event.target.value})
    };

    handleClose=(event)=> {
        if (this.anchorRef.current && this.anchorRef.current.contains(event.target)) {
            return;
        }

        this.setState({open:false});
    };

    handleListKeyDown=(event)=> {
        if (event.key === 'Tab') {
            event.preventDefault();
            this.setState({open:false});
        }
    }

    handleColorChange=(event)=>{
        this.setState({colorValue:event.target.value})
    }

    render() {
        const sendDanmaku = (msg) => {
            return () => {
                // 触发自定义事件

                eventEmitter.emit("sendDanmaku",msg,this.state.colorValue,this.state.sizeValue)
            }
        }
        return (
            <Paper component="form" className="danmaku-sendbar-root">
                <IconButton className="danmaku-sendbar-iconButton"
                            aria-label="menu"
                            ref={this.anchorRef}
                            aria-controls={this.state.open ? 'menu-list-grow' : undefined}
                            aria-haspopup="true"
                            onClick={this.handleToggle}>
                    <MenuIcon fontsize="small"/>
                </IconButton>
                <Popper open={this.state.open} anchorEl={this.anchorRef.current} role={undefined} transition disablePortal style={{zIndex:100}}>
                    {({ TransitionProps, placement }) => (
                        <Grow
                            {...TransitionProps}
                            style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}
                        >
                            <Paper>
                                <ClickAwayListener onClickAway={this.handleClose}>
                                    <MenuList autoFocusItem={this.state.open}
                                              id="menu-list-grow"
                                              onKeyDown={this.handleListKeyDown}
                                              dense={true}>
                                        <StyledMenuItem>
                                            <FormControl component="fieldset">
                                                <FormLabel component="legend">FontSize</FormLabel>
                                                <RadioGroup aria-label="gender"
                                                            name="gender1"
                                                            value={this.state.sizeValue}
                                                            row
                                                            onChange={this.handleSizeChange}>
                                                    <FormControlLabel value="small"
                                                                      control={<Radio />}
                                                                      label="Small" />
                                                    <FormControlLabel value="normal"
                                                                      control={<Radio />}
                                                                      label="Normal" />
                                                </RadioGroup>
                                            </FormControl>
                                        </StyledMenuItem>
                                        <StyledMenuItem>
                                            <FormControl>
                                                <InputLabel >Color</InputLabel>
                                                <Select
                                                    native
                                                    value={this.state.colorValue}
                                                    onChange={this.handleColorChange}
                                                >
                                                    <option value={"#FFFFFF"} style={{color:"#FFFFFF"}}>White</option>
                                                    <option value={"#323338"} style={{color:"#323338"}}>Dark</option>
                                                    <option value={"#00C875"} style={{color:"#00C875"}}>Green</option>
                                                    <option value={"#E2445C"} style={{color:"#E2445C"}}>Red</option>
                                                    <option value={"#579BFC"} style={{color:"#579BFC"}}>LightBlue</option>
                                                    <option value={"#FFCB00"} style={{color:"#FFCB00"}}>EggYolk</option>
                                                </Select>
                                            </FormControl>
                                        </StyledMenuItem>
                                    </MenuList>
                                </ClickAwayListener>
                            </Paper>
                        </Grow>
                    )}
                </Popper>
                <InputBase
                    id={"sendbar-input-id"}
                    className="danmaku-sendbar-input"
                    placeholder="Send a friendly danmaku"
                    inputProps={{ 'aria-label': 'Send a friendly danmaku'}}
                    onChange={this.handleChange}
                    onKeyPress={(event) => {
                        if (event.key === 'Enter') {
                            document.getElementById("sendbar-input-id").value=""
                            this.setState({msg:""})
                            event.preventDefault()
                            sendDanmaku(this.state.msg)();
                        }
                    }}
                />
                <Divider className="danmaku-sendbar-divider" orientation="vertical" />
                <IconButton color="primary"
                            className="danmaku-sendbar-iconButton"
                            aria-label="arrowupward"
                            onClick={(event)=>{
                                document.getElementById("sendbar-input-id").value=""
                                this.setState({msg:""})
                                sendDanmaku(this.state.msg)()
                            }}>
                    <ArrowUpwardRoundedIcon fontSize="small"/>
                </IconButton>
            </Paper>
        );
    }
}

export default DanmakuSendBar