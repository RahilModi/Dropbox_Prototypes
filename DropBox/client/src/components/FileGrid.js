import React, { Component } from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import starred from './../public/starred.svg';
import star from './../public/star_white.svg';
import file from './../public/file.svg';
import folder from './../public/folder.svg';
import deleteicon from './../public/delete.svg';
import {HandleStar,UpdateParent,LoadFolder, UpdateShared, LoadFiles} from '../actions/index';
import * as updateFileAPI from '../api/UpdateFileAPI';
import * as FilesAPI from '../api/GetFilesAPI';
import * as DownloadAPI from '../api/DownloadFileAPI';
import * as RemoveAPI from '../api/deleteFileAPI';
import fileDownload from 'react-file-download';
import Axios from 'axios';
import RightMenu from './RightMenu';

class FileGrid extends Component {

    handleClick(fileitem){
        if(fileitem.Type == 0)
        {
            DownloadAPI.downloadFile(fileitem)
                .then((res) => {
                    Axios.get(res.url)
                        .then((response) => {
                            fileDownload(response.data, fileitem.Name);
                        });
                });
        }
        else{
            Promise.resolve(this.props.UpdateParent(fileitem))
                .then(() =>{
                    var userId = fileitem.UserId;
                    var parentId = this.props.files.parentId;
                    console.log(`parent id is: ${parentId}`);
                    FilesAPI.getFiles({userId, parentId})
                        .then((obj) => {
                            this.props.LoadFolder(obj);
                        });
                });
        }
    }

    setParent(){
        var userId = localStorage.UserId;
        var parentId = this.props.files.parentId;
        FilesAPI.getFiles({userId,parentId})
            .then((obj) => {
                this.props.LoadFolder(obj);
            });
    }

    updateStarred(fileitem){
        updateFileAPI.updateFile(fileitem)
            .then((status) => {
                if(status == 201){
                    this.props.HandleStar(fileitem);
                }
                else{
                    console.log("Error Occured while updating file.");
                }
            });

    }

    renderIcon(fileitem){
        if(fileitem.Type == 0){
            return(
                <img type="image/svg+xml" src={file} height="30px" alt='logo'/>
            )}
        else{
            return(
                <img type="image/svg+xml" src={folder} height="30px" alt='logo'/>
            )}
    }

    renderStarButton(fileitem){
        if(fileitem.IsStarred == 1){
            return(
                <button type="button" className="c-btn c-btn--tertiary--2"
                        onClick={() => this.updateStarred(fileitem)}>
                    <img type="image/svg+xml" src={starred} height="15px" alt='logo'/>
                </button>
            )}
        else{
            return(
                <button type="button" className="c-btn c-btn--tertiary--2"
                        onClick={() => this.updateStarred(fileitem)}>
                    <img type="image/svg+xml" src={star} height="15px" alt='logo'/>
                </button>
            )}
    }

    openShare(fileitem){
        var sharediv = document.getElementById("divShare");
        var sharefilelbl = document.getElementById("lblSharefile");
        if((sharefilelbl.innerHTML != "Share "+fileitem.Name+" with:") || sharediv.hidden){
            sharefilelbl.innerHTML = "Share "+fileitem.Name+" with:";
            sharediv.hidden = false;
        }
        else{
            sharediv.hidden = true;
        }
        this.props.UpdateShared(fileitem);
    }

    removefile(fileitem){
        if(fileitem.Type == 0)
        {
            RemoveAPI.deleteFile(fileitem.Id)
                .then((res) => {
                    console.log(res.message);
                    var userId = localStorage.UserId;
                    var parentId = this.props.files.parentId;
                    FilesAPI.getFiles({userId, parentId})
                        .then((obj) => {
                            this.props.LoadFiles(obj);
                        });
                });
        }
    }

    createItemsList(){
        if(this.props.files.files != undefined) {
            return this.props.files.files.map((fileitem) => {
                return (
                    <tr>
                        <td width="30">
                            {this.renderIcon(fileitem)}
                        </td>
                        <td>
                            <button
                                className="c-btn c-btn--tertiary--3"
                                type="button"
                                onClick={() => this.handleClick(fileitem)}>
                                {fileitem.Name}
                            </button>
                        </td>
                        <td width="40">
                            {this.renderStarButton(fileitem)}
                        </td>
                        <td width="40">
                            <button className="c-btn c-btn--tertiary" onClick={() => this.openShare(fileitem)}>
                                SHARE
                            </button>
                        </td>
                        <td width="40">
                            <button className="c-btn c-btn--tertiary--2" onClick={() => this.removefile(fileitem)}>
                                <img type="image/svg+xml" src={deleteicon} height="17px" alt='logo'/>
                            </button>
                        </td>
                    </tr>
                );
            });
        }else{
            return(
                <div className="c-banner c-banner--unpinned f4">
                No files has been added by you..
                </div>
            )
        }
    }

    createSharedList(){
        if((this.props.shared.sharedfiles && this.props.shared.sharedfiles.length == 0 )||( this.props.shared.sharedfiles == undefined))
        {
            return(
                <tr>
                    <td>
                        <div className="c-banner c-banner--unpinned f4">
                            Nothing has been shared with you for now.
                        </div>
                    </td>
                </tr>
            );
        }
        else{
            return this.props.shared.sharedfiles.map((fileitem) => {
                return(
                    <tr>
                        <td width = "30">
                            {this.renderIcon(fileitem)}
                        </td>
                        <td>
                            <button
                                className="c-btn c-btn--tertiary--3"
                                type="button"
                                onClick={() => this.handleClick(fileitem)}>
                                {fileitem.Name}
                            </button>
                        </td>
                    </tr>
                );
            });
        }
    }

    createStarredList() {
        var count = 0;
        console.log(this.props.files.files);
        if (this.props.files.files != undefined) {
            this.props.files.files.map((fileitem) => {
                if (fileitem.IsStarred === 1) count++;
            });
        }
        if(count == 0)
        {
            return(
                <tr>
                    <td>
                        <div className="c-banner c-banner--unpinned f4">
                            When you star items, they’ll show up here for easy access.
                        </div>
                    </td>
                </tr>
            );
        }
        else{
            return this.props.files.files.map((fileitem) => {
                if(fileitem.IsStarred === 1){
                    return(
                        <tr>
                            <td width = "30">
                                {this.renderIcon(fileitem)}
                            </td>
                            <td>
                                <button
                                    className="c-btn c-btn--tertiary--3"
                                    type="button"
                                    onClick={() => this.handleClick(fileitem)}>
                                    {fileitem.Name}
                                </button>
                            </td>
                            <td width = "40">
                                {this.renderStarButton(fileitem)}
                            </td>
                        </tr>
                    );}
            });
        }
    }

    render() {
        return (
            <div>
                <p className="f4">Starred</p>
                <hr className="hr"/>
                <table className="c-table">
                    <tbody>
                    {this.createStarredList()}
                    </tbody>
                </table>

                <p className="f4">Shared with me</p>
                <hr className="hr"/>
                <table className="c-table">
                    <tbody>
                    {this.createSharedList()}
                    </tbody>
                </table>

                <p className="f4">My Files</p>
                <hr className="hr"/>
                <table className="c-table">
                    <tbody>
                    {this.createItemsList()}
                    </tbody>
                </table>
            </div>
        );
    }
}

function mapStateToProps(state){
    return {
        userdetail: state.userdetail,
        files: state.directory,
        shared: state.shared
    }
}

function mapDispatchToProps(dispatch){
    return bindActionCreators({HandleStar : HandleStar,
            UpdateParent: UpdateParent,
            LoadFolder: LoadFolder,
            UpdateShared: UpdateShared},
        dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(FileGrid);