import React from "react";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import AutoSizer from "react-virtualized-auto-sizer";
import {FixedSizeList} from "react-window";
import IconButton from "@material-ui/core/IconButton";
import ListIcon from "@material-ui/icons/List";
import {Drawer} from "@material-ui/core";
import {eventEmitter} from "./Helper";

class DanmakuSideBar extends React.Component {
    constructor(props) {
        super(props);
        // this.classes = sidebarStyle();
        this.state = {
            videoName: props.value,
            display: false,
            danmakuList:null,
        }
    }

    componentDidMount(){
        this.eventEmitter = eventEmitter.addListener("danmakuFetched",(bvid)=>{
            chrome.storage.local.get([bvid],(result)=>{
                this.setState({danmakuList:result[bvid]})
            })
        });
    }

    componentWillUnmount(){
        eventEmitter.removeListener(this.eventEmitter);
    }

    toggleSidebar(open) {
        return (event) => {
            if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
                return;
            }
            this.setState({
                display: open
            });
        }
    }

    renderList() {
        let isNull = this.state.danmakuList==null;
        const renderRow = ({ index, style }) => (
            <div style={style}>{isNull?"no danmakulist info":this.state.danmakuList[index].content}</div>
        );
        return (
            <div
                className="danmaku-sidebar"
                role="presentation"
                onKeyDown={this.toggleSidebar(false)}
            >
                <Tabs className="tab-space-holder">

                </Tabs>
                <Tabs
                    variant="fullWidth"
                >
                    <Tab label="Danmaku List" />
                </Tabs>
                <AutoSizer>
                    {({ height, width }) => (
                        <FixedSizeList
                            className="danmakulist"
                            height={height-96}
                            itemCount={isNull?1:this.state.danmakuList.length}
                            itemSize={35}
                            width={width}
                            style={{paddingLeft: '2px'}}
                        >
                            {renderRow}
                        </FixedSizeList>
                    )}
                </AutoSizer>
            </div>
        )
    }

    render() {
        return (
            <div>
                <React.Fragment key={'right'}>
                    <IconButton onClick={this.toggleSidebar(true)} style={{padding: 10}}>
                        <ListIcon />
                    </IconButton>
                    <Drawer anchor={'right'} open={this.state.display} onClose={this.toggleSidebar(false)} className="sidedrawer">
                        {this.renderList()}
                    </Drawer>
                </React.Fragment>
            </div>
        )
    }
}

export default DanmakuSideBar