import React, { Component } from 'react';
import { getFolders, removeFolders } from '../actions/FolderActions';
import { connect } from 'react-redux';
import Moment from 'react-moment';
import { Link } from 'react-router-dom';
import Loader from './Loader'
import folderimg from '../static/img/folder-flat.png';
import fileimg from '../static/img/document-file-icon.png';
import arrowimg from '../static/img/back.png';

import Cookies from 'universal-cookie';
const cookies = new Cookies();
const mapStateToProps = state => {
  return {
    items: state.folders.folders,
    loading: state.folders.loaded,
    token: state.login.token,
    loggedIn: state.login.loggedIn
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getFolders: (folder) => {
      dispatch(getFolders(folder))
    },
    removeFolders: () => {
      dispatch(removeFolders())
    }
  }
}

class Folders extends Component {
  constructor (props) {
    super(props);
    this.state = {needArrow: false, logged: true, route: ''};
  }

  componentDidMount () {
    let yatoken = cookies.get('yatoken');
    if(!yatoken) {
      this.setState({logged: false})
    }
    let f = this.props.match.params.uid || 'root';
    this.props.getFolders(f);
  }

  componentDidUpdate(prevProps) {
    if (this.props.location !== prevProps.location) {
      let f = this.props.match.params.uid || 'root';
      this.props.getFolders(f);
    }
  }

  getIcon (item) {
    return item.isDir
    ? folderimg
    : fileimg
  }

  onLogin (token) {
    cookies.set('yatoken', token, { path: '/' });
    this.setState({logged: true})
    let f = this.props.match.params.uid || 'root';
    this.props.getFolders(f);
  }

  render() {
    return (
      <main>
      {
        !this.props.loading
        ? <Loader/>
        : null
      }
      {
        !this.state.logged
        ? <Loader callback={this.onLogin.bind(this)} login/>
        : null
      }
      <div className="toolbar">
        {
          this.state.needArrow
          ? <span click="historyBack" className="arrow-back"><img src={arrowimg} alt="" /></span>
          : null
        }
      </div>
      <div className="folder-container">
        {this.props.items.map((row, rowkey) =>
            <div className="row" key={rowkey}>
              {row.map((group, groupkey) =>
                <div key={groupkey} className="col-md-4">
                  <div className="col-sm-12 row-item">
                    {group.map((item, itemkey) =>
                      <Link key={itemkey} to={item.href}>
                        <figure className="item-box">
                          <img className="item-img" src={this.getIcon(item)} alt="" />
                          <figcaption className="item-caption">
                            {item.displayName}
                            <span className="item-caption__date"><Moment locale="ru" fromNow>{item.creationDate}</Moment></span>
                          </figcaption>
                        </figure>
                      </Link>
                    )}
                  </div>
                </div>
              )}
            </div>
          )}
      </div>

      </main>
    );
  }
}

const FolderComp = connect(
  mapStateToProps,
  mapDispatchToProps
)(Folders)
export default FolderComp;
