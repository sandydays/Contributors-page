import React, { Component } from 'react'

interface ContributorsState {
    key: number,
    photo: string,
    githubPage: string,
    githubName: string,
    commits: number
}

interface ContributorsArrayState {
    contributors: ContributorsState[][]
}

class Contributors extends Component<{}, ContributorsArrayState> {
    
    constructor(props: any) {
        super(props)
    
        this.state = {
            contributors: []
        }
    }

    componentDidMount() {

        fetch('https://api.github.com/orgs/source-academy/repos')
        .then(results => {
            return results.json();
        })
        .then(repos => {
            const contributorLinks = repos.map((repo: any) => {
                return repo.contributors_url;
            })
            return contributorLinks;
        })
        .then(endpoints => {
            Promise.all(
                endpoints.map((endpoint: string) => {
                    return fetch(endpoint);
                })
            )
            .then(responses => {
                return Promise.all( 
                    responses.map((res: any) => {
                        return res.json();
                    }) 
                )
            })
            .then(contributorsByRepo => {
                return Promise.all(
                    contributorsByRepo.map((contributors: any) => {
                        const contributorList = contributors.map((contributor: any) => {
                            return ({
                                key: contributor.id,
                                photo: contributor.avatar_url,
                                githubPage: contributor.html_url,
                                githubName: contributor.login,
                                commits: contributor.contributions
                            });
                        });
                        this.setState({
                            contributors: [...this.state.contributors, contributorList]
                        })
                    })
                )
            });
            
        });
    }
      
    render() {
        console.log(this.state)
        const { contributors: repos } = this.state;
        let contributorList = repos.length ? (
            repos.map((repo: any) => {
                return repo.map((contributor: ContributorsState) => {
                    return (
                        <div key={contributor.key}>
                            <img src={contributor.photo} alt="Image" height="200" width="200"/>
                            <p><a href={contributor.githubPage}>{contributor.githubName}</a></p>
                            <p>Number of commits: {contributor.commits}</p>
                        </div>
                    );
                });        
            })
        ) : (
            <h2>No contributors to the Source Academy yet!</h2>
        )
        return (
            <div>
                <h1>You committed!</h1>
                <p>Kudos to all our contributors to the Source Academy so far!</p>
                <div>{contributorList}</div>
            </div>
        )
    }
}

export default Contributors
