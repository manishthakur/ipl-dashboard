import { React, useEffect, useState } from 'react'
import { MatchDetailCard } from '../components/MatchDetailCard';
import { useParams } from 'react-router-dom';
import './MatchPage.scss'
import { YearSelector } from '../components/YearSelector';
export const MatchPage = () => {

    const [matches, setMatches] = useState([]);
    const { teamName, year } = useParams();

    useEffect(
        () => {
            const fetchMatches = async () => {
                const response = await fetch('http://localhost:8080/team/' + teamName + '/matches?year=' + year);
                const matchData = await response.json();
                console.log('http://localhost:8080/team/' + teamName + '/matches?year=' + year);
                setMatches(matchData);
            };
            fetchMatches();
        }, [teamName, year]
    );

    return (
        <div className="MatchPage">
            <div className='years-selector'>
                <h3>Select Year</h3>
                <YearSelector teamName={teamName} />
            </div>
            <div>
                <h1 className='page-heading'>{teamName} matches in {year}</h1>
                {
                    matches.map(match => <MatchDetailCard teamName={teamName} match={match} key={match.id} />)
                }
            </div>
        </div>
    );
}
