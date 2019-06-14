import React, { Component } from 'react'

interface ContributorsState {
    key: number,
    photo: string,
    githubPage: string,
    githubName: string,
    commits: number
}

interface ContributorsArrayState {
    contributors: ContributorsState[] 
}

class Contributors extends Component<{}, ContributorsArrayState> {
    
    constructor(props: any) {
        super(props)
    
        this.state = {
            contributors: []
        }
    }

    componentDidMount() {
       fetch('https://api.github.com/repos/source-academy/cadet-frontend/contributors')
       .then(results => {
           return results.json();
       })
       .then(contributors => {
           let contributorList = contributors.map((contributor: any)=> {
                return ({
                    key: contributor.id,
                    photo: contributor.avatar_url,
                    githubPage: contributor.html_url,
                    githubName: contributor.login,
                    commits: contributor.contributions
                })
           })
           this.setState({
               contributors: contributorList
           })
       })

    }
    
    
    render() {
        const { contributors } = this.state;
        let contributorList = contributors.length ? (
            contributors.map(contributor => {
                return (
                    <div key={contributor.key}>
                        <img src={contributor.photo} alt="Image" height="200" width="200"/>
                        <p><a href={contributor.githubPage}>{contributor.githubName}</a></p>
                        <p>Number of commits: {contributor.commits}</p>
                    </div>
                )
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
