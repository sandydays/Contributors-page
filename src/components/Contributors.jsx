import React, { Component } from 'react'
// import axios from 'axios'

class Contributors extends Component {
    
    constructor(props) {
        super(props)
    
        this.state = {
            contributors: []
        }
    }

    componentDidMount() {
        /*
        axios.get('https://github.com/source-academy/cadet-frontend/graphs/contributors')
            .then(contributors => {
                this.setState({
                    contributors
                })
            })
        */
       fetch('https://api.github.com/repos/source-academy/cadet-frontend/contributors')
       .then(results => {
           return results.json();
       })
       .then(contributors => {
           let contributorList = contributors.map(contributor => {
                return ({
                    key: contributor.id,
                    photo: contributor.avatar_url,
                    githubPage: contributor.html_url,
                    githubName: contributor.login,
                    commits: contributor.contributions
                }
                    /*
                    <div key={contributor.id}>
                        <img src={contributor.avatar_url} />
                        <a href={contributor.html_url}>{contributor.login}</a>
                        <p>{contributor.contributions}</p>
                    </div>
                    */
                )
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
