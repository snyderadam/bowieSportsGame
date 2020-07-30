
class Team extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            shots: 0,
            score: 0
        }
        this.shotSound = new Audio('http://www.orangefreesounds.com/sparkle-sound-effect/')
        this.scoreSound = new Audio('')

    }
    shotHandler = (event) => {
        let score = this.state.score
        this.shotSound.play()
        if (Math.random() > 0.5) {
            score += 1
            this.scoreSound.play()
        }

        this.setState((state, props) => ({
            shots: state.shots + 1,
            score
        }))
    }
    render() {
        let shotPercentageDiv
        if (this.state.shots) {
            const shotPercentage = Math.round((this.state.score / this.state.shots) * 100)
            shotPercentageDiv = (
                <div>
                    <strong>Shooting %:{shotPercentage} </strong>
                </div>
            )
        }
        return (
            <div className='Team'>
                <h2>{this.props.name}</h2>
                <div>
                    <img src={this.props.logo} />
                </div>
                <div>
                    <strong>Shots Taken:</strong>{this.state.shots}
                </div>
                <div>
                    <strong>SCORE:</strong>{this.state.score}
                </div>
                {shotPercentageDiv}
                <button onClick={this.shotHandler}>Shoot!</button>

            </div>


        )
    }
}

function Game(props) {
    return (
        <div className='Game'>
            <h1>Welcome to {props.venue}</h1>
            <div className='stats'>
                <Team name={props.visitingTeam.name} logo= {props.visitingTeam.logo} />

                <div className='versus'>
                    <h1>VS</h1>
                </div>
                <Team name={props.homeTeam.name} logo= {props.homeTeam.logo} /></div>
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