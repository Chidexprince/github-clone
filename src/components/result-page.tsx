import React, { Component } from 'react';
import SideBar from "./tags/sidebar";
import Header from "./tags/header";
import { ApolloClient, InMemoryCache, createHttpLink } from "@apollo/client";
import { setContext } from '@apollo/client/link/context';
import { getRepositories, getUsers } from './constant/graphql-query';
import { nFormatter, getTimeInHours } from './constant/util';
const httpLink = createHttpLink({
    uri: 'https://api.github.com/graphql',
});

const authLink = setContext((_, { headers }) => {
    // get the authentication token from local storage if it exists
    const token = localStorage.getItem('access_token');
    // return the headers to the context so httpLink can read them
    return {
        headers: {
            ...headers,
            authorization: token ? `Bearer ${token}` : "",
        }
    }
});

const client = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache()
});



type Props = { match: { params: { q } } };

class ResultPage extends Component<Props>{
    state = {
        repoResults: [],
        userResults: [],
        searchTerm: this.props.match.params.q,
        totalRepo: 0,
        totalUsers: 0,
        details: 'repo'
    }

    componentDidMount() {
        // Update the document title using the browser API
        this.getRepoDetails()
        this.getUserDetails() 
    }

    getUserDetails() {
        client
        .query({
            query: getUsers,
            variables: {
                "queryString": this.state.searchTerm
            }
        })
        .then(result => {
            this.setState({
                userResults: result.data.search.edges,
                totalUsers: result.data.search.userCount
            })

        });
    }

    getRepoDetails() {
        client
            .query({
                query: getRepositories,
                variables: {
                    "queryString": this.state.searchTerm
                }
            })
            .then(result => {
                this.setState({
                    repoResults: result.data.search.edges,
                    totalRepo: result.data.search.repositoryCount,
                    
                })
            });
    }


    render() {
        const totalRepo = nFormatter(this.state.totalRepo, 1);
        const totalUsers = nFormatter(this.state.totalUsers, 1);
        let searchResults = this.state.repoResults.length > 0 ? this.state.repoResults.map(({ node }: any) => {
            return (
                <div className="card remove-border mb-4">
                    <div className="card-body" key={node.id}>
                        <h5>{node.name}</h5>
                        <div className="font-color ft-md size-width">{node.description}</div>
                        <div className="ft-md font-color">
                            <span className="mr-2">
                                <svg aria-label="star" fill="#b9b9c1" role="img" viewBox="0 0 16 16" version="1.1" data-view-component="true" height="16" width="16" className="octicon octicon-star">
                                    <path fill-rule="evenodd" d="M8 .25a.75.75 0 01.673.418l1.882 3.815 4.21.612a.75.75 0 01.416 1.279l-3.046 2.97.719 4.192a.75.75 0 01-1.088.791L8 12.347l-3.766 1.98a.75.75 0 01-1.088-.79l.72-4.194L.818 6.374a.75.75 0 01.416-1.28l4.21-.611L7.327.668A.75.75 0 018 .25zm0 2.445L6.615 5.5a.75.75 0 01-.564.41l-3.097.45 2.24 2.184a.75.75 0 01.216.664l-.528 3.084 2.769-1.456a.75.75 0 01.698 0l2.77 1.456-.53-3.084a.75.75 0 01.216-.664l2.24-2.183-3.096-.45a.75.75 0 01-.564-.41L8 2.694v.001z"></path>
                                </svg> {nFormatter(node.stargazerCount, 1)}
                            </span> |
                            <span className="mr-2"> {node.languages.nodes.map(a => a.name)}</span> |
                            <span className="mr-2"> {node.licenseInfo ? node.licenseInfo.key : ''}</span> |
                            <span className="mr-2"> Updated {getTimeInHours(node.updatedAt)} hours</span>
                        </div>
                    </div>
                </div>
            )
        }) : 'Loading...';

        let searchResult = this.state.userResults.length > 0 && this.state.details === 'user' ? this.state.userResults.map(({ node }: any) => {
            return (
                <div className="card remove-border mb-4">
                    <div className="card-body" key={node.id}>
                        <h5>{node.name}</h5>
                        <div className="font-color ft-md size-width">{node.bio}</div>
                        <div className="ft-md font-color">
                            {node.location}
                        </div>
                    </div>
                </div>
            )
        }) : 'Loading..';

        return (

            <div className="bg-land container-fluid">
                <Header></Header>
                <div className="row mt-4">
                    <div className="col-md-3"></div>
                    <div className="col-md-3 mt-2">
                        <div className="p-4">
                            <div className="list-group">
                                <a className="list-group-item list-group-item-action d-flex justify-content-between remove-border cursor" onClick={() => { this.setState({details: 'repo'}) }}>Repositories
                                    <span className="badge badge-secondary badge-pill badge-style" >{ totalRepo}</span></a>
                                <a className="list-group-item list-group-item-action d-flex justify-content-between remove-border cursor" onClick={() => { this.setState({details: 'user'}) }}>Users
                                    <span className="badge badge-secondary badge-pill badge-style">{ totalUsers }</span>
                                </a>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-6 mt-2">
                        <h4>result</h4>
                        {searchResults ? searchResults : searchResult}
                    </div>
                </div>
                <div>

                </div>
            </div>


        )
    }

}

export default ResultPage;

