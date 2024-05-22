package io.javabrain.ipldashboard.repository;

import io.javabrain.ipldashboard.model.Match;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.repository.CrudRepository;

import java.time.LocalDate;
import java.util.List;

public interface MatchRepository extends CrudRepository<Match, Long> {

    List<Match> getByTeam1OrTeam2OrderByDateDesc(String teamName1, String teamName2, Pageable pageable);

    List<Match> getByTeam1AndDateBetweenOrTeam2AndDateBetweenOrderByDateDesc(String teamName1, LocalDate startYear1, LocalDate endYear1,
                                                                             String teamName2, LocalDate startYear2, LocalDate endYear2);

    default List<Match> findLatestMatchesbyTeam(String teamName, int count) {
        Pageable pageable = PageRequest.of(0, 4);
        return getByTeam1OrTeam2OrderByDateDesc(teamName, teamName, pageable);
    }
}
