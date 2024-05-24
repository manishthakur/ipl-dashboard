import './TeamPage.scss';
import { React, useEffect, useState } from 'react'
import { MatchDetailCard } from '../components/MatchDetailCard';
import { MatchSmallCard } from '../components/MatchSmallCard';
import { useParams } from 'react-router-dom';
import { PieChart } from 'react-minimal-pie-chart';
import { Link } from 'react-router-dom'

export const TeamPage = () => {

    const [team, setTeam] = useState({ matches: [] });
    const { teamName } = useParams();

    useEffect(
        () => {
            const fetchMatches = async () => {
                const response = await fetch(process.env.REACT_APP_API_ROOT_URL + '/team/' + teamName);
                const data = await response.json();
                setTeam(data);
            };
            fetchMatches();
        }, [teamName]
    );

    if (!team || !team.teamName) {
        return <h1>{teamName} Team Not Found</h1>
    }

    return (
        <div className="TeamPage">
            <div className="team-name-section">
                <h1 className='team-name'>{team.teamName}</h1>
            </div>
            <div className="win-loss-section">
                Wins / Losses
                <PieChart
                    data={[
                        { title: 'Wins', value: team.totalWins, color: '#4da375' },
                        { title: 'Losses', value: team.totalMatches - team.totalWins, color: '#a34d5d' },
                    ]}

                />
            </div>
            <div className="match-detail-section">
                <h3>Latest Matches</h3>
                <MatchDetailCard teamName={team.teamName} match={team.matches[0]} />
            </div>
            {team.matches.slice(1).map(match => <MatchSmallCard key={match.id} match={match} teamName={teamName} />)}
            <Link to={'/teams/' + teamName + '/matches/' + process.env.REACT_APP_DATA_END_YEAR}>
                <div className='more-link'><a href='#'>More</a></div>
            </Link>
        </div >
    );

}
