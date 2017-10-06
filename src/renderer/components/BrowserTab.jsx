import React from "react";
import { Tabs, Tab, TabList, TabPanel } from 'react-tabs';
import css from 'react-tabs/style/react-tabs.css';
import { ipcRenderer } from "electron";

export default class BrowserTab extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedIndex: 0
        }
        this.changeDirectory = this.changeDirectory.bind(this);
        this.onSelectExplorer = this.onSelectExplorer.bind(this);
    }
    changeDirectory(path) {
        this.props.onChange(path);
    }
    onSelectExplorer(index, lastIndex, event) {
        if (index == 0 && this.props.path)
        {
            this.listFiles(this.props.path);
        }
        this.setState({ selectedIndex: index });
    }
    render () {
        return (
            <div
                id="browser-tab"
                className={'${props.className}'}
            >
                <Tabs
                    selectedIndex={this.state.selectedIndex}
                    onSelect={this.onSelectExplorer}
                    forceRenderTabPanel={true}
                >
                    <TabList>
                        <Tab>Title 1</Tab>
                        <Tab>Title 2</Tab>
                        <Tab>Title 3</Tab>
                    </TabList>

                    <TabPanel id="explorer">
                        <ul id="test"></ul>
                    </TabPanel>
                    <TabPanel>
                        <p>This is the second tab's content</p>
                    </TabPanel>
                    <TabPanel>
                        <p>This is the 3 tab's content</p>
                    </TabPanel>
                </Tabs>
            </div>
        );
    }

    listFiles(path) {
        document.getElementById("test").innerHTML = "";
        const newUl = document.createElement("ul");

        for (var i = 0; i < path.length; i++) {
            const newPath = document.createElement("li");
                newPath.innerText = path[i];
                newUl.appendChild(newPath);
            }
        document.getElementById("test").appendChild(newUl);
    }
    componentDidMount() {
        ipcRenderer.on("SEND_PATH", (_e, path) => {
            this.changeDirectory(path);
            this.listFiles(this.props.path);
        });
    }
}