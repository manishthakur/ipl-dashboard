package io.javabrain.ipldashboard.controller;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import io.javabrain.ipldashboard.model.Team;
import io.javabrain.ipldashboard.repository.MatchRepository;
import io.javabrain.ipldashboard.repository.TeamRepository;

@RestController
@CrossOrigin
public class TeamController {

    private final TeamRepository teamRepository;

    private final MatchRepository matchRepository;

    public TeamController(TeamRepository teamRepository, MatchRepository matchRepository) {
        this.teamRepository = teamRepository;
        this.matchRepository = matchRepository;
    }

    @GetMapping("/team/{teamName}")
    public Team getTeam(@PathVariable String teamName) {
        Team team = this.teamRepository.findByTeamName(teamName);
        team.setMatches(this.matchRepository.findLatestMatchesbyTeam(teamName, 0));
        return team;
    }
}
