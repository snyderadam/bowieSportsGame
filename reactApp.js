
function ScoreBoard(props) {
    return(
        <div className = 'ScoreBoard'>
            <div className = 'teamStats'>
                <h3>VISITORS</h3>
                <h3>{props.visitingTeamStats.score}</h3>
            </div>
            
            
            <h3>SCOREBOARD</h3>


            <div className = 'teamStats'>
                <h3>HOME</h3>
                <h3>{props.homeTeamStats.score}</h3>
            </div>
        </div>
    )
}

class Game extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            resetCount: 0,
            homeTeamStats: {
                shots: 0,
                score: 0
            },
            visitingTeamStats: {
                shots: 0,
                score: 0
            }
        }
        this.shotSound = new Audio('https://www.pacdv.com/sounds/voices/pssst-2.wav')
        this.scoreSound = new Audio('https://www.pacdv.com/sounds/voices/nice-work.wav')
    }
    shoot = (team) => {
        const teamStatsKey = `${team}TeamStats`
        let score = this.state[teamStatsKey].score
        this.shotSound.play()
        if (Math.random() > 0.5) {
            score += 1
            this.scoreSound.play()
        }

        this.setState((state, props) => ({
            [teamStatsKey]: {
                shots: state[teamStatsKey].shots + 1,
                score
            }
        }))
    }
    resetGame = () => {
        this.setState((state, props) => ({
            resetCount: state.resetCount + 1,
            homeTeamStats: {
                shots: 0,
                score: 0
            },
            visitingTeamStats: {
                shots: 0,
                score: 0
            }
        }))


    }
    render() {
        return (
            <div className='Game'>
                <ScoreBoard 
                visitingTeamStats = {this.state.visitingTeamStats}
                homeTeamStats = {this.state.homeTeamStats}
                
                />
                <h1>Welcome to {this.props.venue}</h1>
                <div className='stats'>
                    <Team name={this.props.visitingTeam.name}
                        logo={this.props.visitingTeam.logo}
                        stats={this.state.visitingTeamStats}
                        shotHandler={() => this.shoot('visiting')} />
                    <div className='versus'>
                        <h1>VS</h1>
                        <div>
                            <strong>Resets:</strong>{this.state.resetCount}
                        </div>
                        <button onClick = {this.resetGame}>Reset Game</button>
                    </div>
                    <Team name={this.props.homeTeam.name}
                        logo={this.props.homeTeam.logo}
                        stats={this.state.homeTeamStats}
                        shotHandler={() => this.shoot('home')} />
                </div>
            </div>
        )
    }
}

function Team(props) {




    let shotPercentageDiv
    if (props.stats.shots) {
        const shotPercentage = Math.round((props.stats.score / props.stats.shots) * 100)
        shotPercentageDiv = (
            <div>
                <strong>Shooting %:{shotPercentage} </strong>
            </div>
        )
    }
    return (
        <div className='Team'>
            <h2>{props.name}</h2>
            <div>
                <img src={props.logo} />
            </div>
            <div>
                <strong>Shots Taken:</strong>{props.stats.shots}
            </div>
            <div>
                <strong>SCORE:</strong>{props.stats.score}
            </div>
            {shotPercentageDiv}
            <button onClick={props.shotHandler}>Shoot!</button>

        </div>


    )
}




function App(props) {
    const youngAmericans = {
        name: 'Young Americans',
        logo: 'https://whythebeatlesarestillrelevant.files.wordpress.com/2019/06/young-americans.jpg'
    }
    const dogs = {
        name: 'Diamond Dogs',
        logo: 'https://i.ytimg.com/vi/eHTj8jBZWo8/maxresdefault.jpg'
    }
    const star = {
        name: 'Star Men',
        logo: 'https://i2.wp.com/auralcrave.com/wp-content/uploads/2018/02/bowie.jpg?fit=915%2C515&ssl=1'
    }
    const hunky = {
        name: 'Hunky Dories',
        logo: 'https://cdn1.i-scmp.com/sites/default/files/styles/768x768/public/2015/01/02/cd601ca851418bfbccd35bea91496a8f.jpg?itok=GJHnPLz0'
    }
    return (
        <div className='App'>
            <Game
                homeTeam={youngAmericans}
                visitingTeam={dogs}
                venue='Outer Space' />
            <Game
                homeTeam={star}
                visitingTeam={hunky}
                venue='Subterranea' />
        </div>
    )
}



// Render the App
ReactDOM.render(
    <App />,
    document.getElementById('root')
)